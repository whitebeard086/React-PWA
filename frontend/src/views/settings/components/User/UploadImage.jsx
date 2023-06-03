import { Button, CropImage, FormContainer, FormItem, Notification, Upload, toast } from "components/ui";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/auth/userSlice";
import { setUploadStatus, uploadImage } from "views/settings/store/dataSlice";

const UploadImage = () => {
    const dispatch = useDispatch();

    const [openCrop, setOpenCrop] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);
    const [file, setFile] = useState(null)
    console.log(file);

    const { profile, gettingUser } = useSelector((state) => state.auth.user)
    const { uploading, uploadStatus } = useSelector((state) => state.settings.data)

    const onCropImage = useCallback(() => {
        dispatch(uploadImage({ image: file }))
        dispatch(getUser())
    }, [dispatch, file])

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]));
        setPhotoURL(URL.createObjectURL(file[0]))
        setOpenCrop(true);
    };

    useEffect(() => {
        if (file !== null) {
            onCropImage()
        }
    }, [file, onCropImage])

    useEffect(() => {
        const popNotification = (keyword) => {
            toast.push(
                <Notification
                    title={`${uploadStatus === "success" ? "Success" : "Error"}`}
                    type={`${uploadStatus === "success" ? "success" : "danger"}`}
                    duration={5000}
                >
                    {uploadStatus === "success" ? "Image uploaded successfully!" : "Looks like something went wrong, please try again."}
                </Notification>,
                {
                    placement: "top-center",
                }
            );
        };

        if (uploadStatus !== "idle") {
            popNotification()
        }

        if (uploadStatus === "success") {
            dispatch(getUser())
        }

        if (uploadStatus === "success" || uploadStatus === "error") {
            dispatch(setUploadStatus('idle'))
        }

    }, [dispatch, uploadStatus])

    return (
        <Formik
            initialValues={{ image: "" }}
            onSubmit={onCropImage}
        >
            {() => {
                return (
                    <Form className="absolute top-[45%] right-[23%]">
                        <FormContainer>
                            <FormItem>
                                <Field name="banner">
                                    {({ field, form }) => (
                                        <Upload 
                                            showList={false}
                                            uploadLimit={1}
                                            onChange={(files) => onSetFormFile(form, field, files)}
                                            onFileRemove={(files) => onSetFormFile(form, field, files)}
                                        >
                                            <Button type="button" size="xs" className="" variant="solid" icon={<HiOutlineCloudUpload />}>
                                                Upload
                                            </Button>
                                        </Upload>
                                    )}
                                </Field>
                            </FormItem>
                        </FormContainer>
                        <CropImage {...{photoURL, setOpenCrop, openCrop, aspect: 1/1, setPhotoURL, setFile, onCropImage, maxSizeMB: 0.05 }} />
                    </Form>
                )
            }}
        </Formik>
    )
}
export default UploadImage