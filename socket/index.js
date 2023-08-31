require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { json } = require('body-parser');
const secret = process.env.SECRET_KEY;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		// origin: "https://app0101.taskitly.com"
		origin: ['http://localhost:5174', 'http://localhost:5173']
	},
});

app.use(json());

let activeUsers = [];

io.on('connection', (socket) => {
	app.get('/', (req, res) => {
		res.send({ response: 'Server is up and running.' }).status(200);
	});

	app.post('/paystack/webhook', function (req, res) {
		//validate event
		const hash = crypto
			.createHmac('sha512', secret)
			.update(JSON.stringify(req.body))
			.digest('hex');

		if (hash == req.headers['x-paystack-signature']) {
			// Retrieve the request's body
			const event = req.body;
			// Do something with event
			if (event && event.event === 'charge.success') {
				const user = activeUsers.find(
					(user) => user.email === event?.data?.customer?.email
				);
				if (user) {
					io.to(user.socketId).emit('chargeSuccess', event);
				} else {
					io.emit('chargeSuccessGeneral', event);
				}
				return res
					.sendStatus(200)
					.json({ message: 'Charge successful', data: event });
			}
		}

		res.sendStatus(200);
	});

	// Add new users
	socket.on('addNewUser', (profile) => {
		// Check that the user has not already been added
		if (!activeUsers.some((user) => user.userId === profile?.id)) {
			activeUsers.push({
				userId: profile?.id,
				email: profile?.email,
				socketId: socket.id,
			});
		}

		console.log('Connected Users', activeUsers);
		io.emit('getUsers', activeUsers);
	});

	// Send notification
	socket.on('sendNotification', (data) => {
		const receiverId = data[1];
		const user = activeUsers.find((user) => user.userId === receiverId);
		console.log('Sending from socket to: ', receiverId);
		console.log('Data: ', data);

		if (user) {
			io.to(user.socketId).emit('receiveNotification', data[0]);
		}
	});

	// Send message
	socket.on('sendMessage', (data) => {
		const receiverId = data[1];
		const user = activeUsers.find((user) => user.userId === receiverId);
		console.log('Sending from socket to: ', receiverId);
		console.log('Data: ', data);

		if (user) {
			io.to(user.socketId).emit('receiveMessage', data[0]);
		}
	});

	// Send Invoice
	socket.on('sendInvoice', (data) => {
		const receiverId = data;
		const user = activeUsers.find((user) => user.userId === receiverId);
		console.log('sending invoice to user: ', receiverId);

		if (user) {
			io.to(user.socketId).emit('receiveInvoice', data);
			console.log('Invoice Received: ', receiverId);
		}
	});

	// Book service
	socket.on('bookedService', (data) => {
		const providerId = data;
		const user = activeUsers.find((user) => user.userId === providerId);
		console.log('service booked');

		if (user) {
			io.to(user.socketId).emit('serviceBooked', data);
			console.log('Service provider', providerId);
		}
	});

	// Start Service
	socket.on('startedService', (data) => {
		const receiverId = data;
		const user = activeUsers.find((user) => user.userId === receiverId);

		if (user) {
			io.to(user.socketId).emit('serviceStarted', data);
			console.log('Service Started: ', receiverId);
		}
	});

	// Cancel Service
	socket.on('cancelledService', (data) => {
		const receiverId = data;
		const user = activeUsers.find((user) => user.userId === receiverId);

		if (user) {
			io.to(user.socketId).emit('serviceCancelled', data);
			console.log('Service Cancelled: ', receiverId);
		}
	});

	// Complete Service
	socket.on('completedService', (data) => {
		const receiverId = data;
		const user = activeUsers.find((user) => user.userId === receiverId);

		if (user) {
			io.to(user.socketId).emit('serviceCompleted', data);
			console.log('Service Completed: ', receiverId);
		}
	});

	// Confirm Service
	socket.on('confirmedService', (data) => {
		const providerId = data;
		const user = activeUsers.find((user) => user.userId === providerId);

		if (user) {
			io.to(user.socketId).emit('serviceConfirmed', data);
		}
	});

	socket.on('disconnect', () => {
		activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
		console.log('User disconnected', activeUsers);
		io.emit('getUsers', activeUsers);
	});
});

httpServer.listen(5000, () => console.log(`Server has started.`));
