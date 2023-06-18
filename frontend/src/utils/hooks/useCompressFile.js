import { useState } from "react"
import imageCompression from 'browser-image-compression';

const useCompressFile = () => {
    const [compressedFile, setCompressedFile] = useState(null)
    const [compressedFileError , setCompressedFileError ] = useState(null)
    
    const compressFile = async (file, maxSizeMB) => {
        const options = {
            maxSizeMB: maxSizeMB || 0.1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        }

        try {
            const rawFile = await imageCompression(file, options);
            setCompressedFile(rawFile)
        } catch (error) {
            setCompressedFileError(error)
        }
    }

    return {
        compressFile,
        compressedFile,
        compressedFileError,
    }
}

export default useCompressFile