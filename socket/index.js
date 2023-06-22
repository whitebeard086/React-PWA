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

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("User disconnected", activeUsers);
        io.emit('getUsers', activeUsers)
    })
})