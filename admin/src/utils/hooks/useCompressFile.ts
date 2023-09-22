import { useState } from "react"
import imageCompression from 'browser-image-compression';

const useCompressFile = () => {
    const [compressedFile, setCompressedFile] = useState<File | null>(null)
    const [compressedFileError , setCompressedFileError] = useState(null)
    
    const compressFile = async (file: File, maxSizeMB = 0.1) => {
        const options = {
            maxSizeMB: maxSizeMB,
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

    const resetCompressedFile = () => {
        setCompressedFile(null)
        setCompressedFileError(null)
    }

    return {
        compressFile,
        compressedFile,
        compressedFileError,
        resetCompressedFile
    }
}

export default useCompressFile