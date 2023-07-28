// import { socket } from "index";
import { useEffect } from "react";
import { socket } from "utils/socket";

export function useSocket(events) {
    useEffect(() => {
        for (const event of events) {
            socket.on(event.name, event.handler);
        }

        return function () {
            for (const event of events) {
                socket.off(event.name)
            }
        }
    }, [])
}