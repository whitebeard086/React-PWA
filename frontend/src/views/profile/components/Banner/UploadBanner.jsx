import { Button, CropImage, FormContainer, FormItem, Notification, Upload, toast } from "components/ui"
import { Field, Form, Formik } from "formik";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/auth/userSlice";
import { setUploadStatus, uploadBanner } from "views/profile/store/dataSlice";

const UploadBanner = () => {
    const dispatch = useDispatch();

    const [openCrop, setOpenCrop] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);
    const [file, setFile] = useState(null)
    console.log(file);

    const { profile } = useSelector((state) => state.auth.user)
    const { uploadStatus } = useSelector((state) => state.profile.data)
 
    const onCropImage = useCallback(() => {
        dispatch(uploadBanner({ service_id: profile.service?.id, banner: file }))
        dispatch(getUser())
    }, [dispatch, file, profile.service?.id])

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
                    {uploadStatus === "success" ? "Banner uploaded successfully!" : "Looks like something went wrong, please try again."}
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
            initialValues={{ banner: "" }}
            onSubmit={onCropImage}
        >
            {({ touched, errors, values }) => {
                return (
                    <Form className="absolute top-4 right-4">
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
                                            <Button type="button" size="xs" className="!bg-blue-500 hover:!bg-blue-600" variant="solid" icon={<HiOutlineCloudUpload />}>
                                                Replace Photo
                                            </Button>
                                        </Upload>
                                    )}
                                </Field>
                            </FormItem>
                        </FormContainer>
                        <CropImage {...{photoURL, setOpenCrop, openCrop, aspect: 16/9, setPhotoURL, setFile, onCropImage, maxSizeMB: 0.15 }} />
                    </Form>
                )
            }}
        </Formik>
    )
}
export default UploadBanner