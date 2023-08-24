import { useEffect } from "react"

const useAutosizeTextArea = (textAreaRef, value) => {
    useEffect(() => {
        if (textAreaRef) {
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;

            textAreaRef.style.height = scrollHeight + "px";
        }
    }, [textAreaRef, value])
    useEffect(() => {
        if (textAreaRef) { 
            textAreaRef.style.height = textAreaRef.scrollHeight;
            const scrollHeight = textAreaRef.scrollHeight;

            textAreaRef.style.height = scrollHeight + "px";
        }
    }, [])
}
export default useAutosizeTextArea