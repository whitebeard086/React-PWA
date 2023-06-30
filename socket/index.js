const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection", (socket) => {
    // Add new users
    socket.on('addNewUser', (newUserId) => {
        // Check that the user has not already been added
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }

        console.log("Connected Users", activeUsers);
        io.emit('getUsers', activeUsers)
    })

    // Send message
    socket.on("sendMessage", (data) => {
        const receiverId = data[1];
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("Sending from socket to: ", receiverId);
        console.log("Data: ", data);

        if (user) {
            io.to(user.socketId).emit("receiveMessage", data[0]);
        }
    })

    // Send Invoice
    socket.on("sendInvoice", (data) => {
        const receiverId = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("sending invoice to user: ", receiverId);

        if (user) {
            io.to(user.socketId).emit("receiveInvoice", data)
            console.log("Invoice Received: ", receiverId);
        }
    })

    // Book service
    socket.on("bookedService", (data) => {
        const providerId = data
        const user = activeUsers.find((user) => user.userId === providerId);
        console.log("service booked");

        if (user) {
            io.to(user.socketId).emit("serviceBooked", data)
            console.log("Service provider", providerId);
        }
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("User disconnected", activeUsers);
        io.emit('getUsers', activeUsers)
    })
})