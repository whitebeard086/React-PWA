import { io } from "socket.io-client";

const socketURL = process.env.REACT_APP_SOCKET_URL
export const socket = io(socketURL);