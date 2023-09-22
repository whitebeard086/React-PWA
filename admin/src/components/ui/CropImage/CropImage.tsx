import Cropper, { Area, Point } from "react-easy-crop"
import Dialog from "../Dialog"
import { useCallback, useState } from "react"
// import Button from "../Buttons"
import { MdCancel } from "react-icons/md"
import { BiCrop } from "react-icons/bi"
import getCroppedImg from "./utils/cropImage"
// import { Point, Area } from "react-easy-crop/types";
import imageCompression from 'browser-image-compression';
import ReactSlider from 'react-slider'
import Button from '../Button'

type Props = {
    photoURL: string
    openCrop: boolean
    setOpenCrop: (value: boolean) => void
    aspect: number
    setPhotoURL: (value: string) => void
    setFile: (value: File | null) => void
    maxSizeMB: number
}

const CropImage = ({ photoURL, openCrop, setOpenCrop, aspect, setPhotoURL, setFile, maxSizeMB }: Props) => {
    const [crop, setCrop] = useState<Point>({ x:0, y:0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({ height: 0, width: 0, x: 0, y: 0})

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    // console.log(croppedAreaPixels);
    const options = {
        maxSizeMB: maxSizeMB || 0.1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
    }

    const cropImage = async () => {
        setLoading(true)

        try {
            const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels, rotation)
            const compressedFile = await imageCompression(file, options);
            setPhotoURL(url)
            setFile(compressedFile)
            setOpenCrop(false)
        } catch (error) {
            setError(error)
            console.log(error);
        }

        setLoading(false)
    }

    const onCancel = () => {
        setOpenCrop(false)
    }

    const zoomPercent = (value: number) => {
        return `${Math.round(value * 100)}%`
    }

    return (
        <Dialog
            isOpen={openCrop}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            // width={500}
            className="p-0"
            onClose={onCancel}
            onRequestClose={onCancel}
        >
            <div className="flex flex-col gap-4 mt-8 w-full max-h-[80vh]">
                <Cropper 
                    image={photoURL}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect || 4/3}
                    rotation={rotation}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                />

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm">Zoom: {zoomPercent(zoom)}</h4>
                    <ReactSlider
                        className="custom_slider" 
                        thumbClassName={`custom_slider_thumb bg-primary-500`}
                        trackClassName={`custom_slider_track bg-primary-500 custom_slider_track`}
                        defaultValue={1}
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        renderThumb={(props) => <div {...props}></div>}
                        onChange={(value) => setZoom(value)}
                    />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <h4 className="text-sm">Rotation: {rotation}°</h4>
                    <ReactSlider
                        className="custom_slider" 
                        thumbClassName={`custom_slider_thumb bg-primary-500`}
                        trackClassName={`custom_slider_track bg-primary-500 custom_slider_track`}
                        min={0}
                        max={360}
                        value={rotation}
                        renderThumb={(props) => <div {...props}></div>}
                        onChange={(value) => setRotation(value)}
                    />
                </div>

                <div className="w-full flex gap-4 mt-4 justify-center">
                    <Button
                        size="sm"
                        icon={<MdCancel />}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="solid"
                        size="sm"
                        type="button"
                        icon={<BiCrop />}
                        loading={loading}
                        onClick={cropImage}
                    >
                        Crop
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}
export default CropImage