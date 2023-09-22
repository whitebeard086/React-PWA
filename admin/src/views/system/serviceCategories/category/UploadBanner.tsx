import { Button, FormContainer, FormItem, Upload } from '@/components/ui';
import CropImage from '@/components/ui/CropImage';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useUpdateCategory } from '../../utils/hooks';

type Props = {
    slug: string
}

type BannerModel = {
    banner: string
}

type FieldProps = {
    field: FieldInputProps<BannerModel>
    form: FormikProps<BannerModel>
}

const UploadBanner = ({ slug }: Props) => {
    const [openCrop, setOpenCrop] = useState(false);
    const [photoURL, setPhotoURL] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const { mutate: updateBanner, isSuccess, isError, isLoading } = useUpdateCategory()

    const onSetFormFile = (
        form: FormikProps<BannerModel>, 
        field: FieldInputProps<BannerModel>, 
        file:File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]));
        setPhotoURL(URL.createObjectURL(file[0]));
        setOpenCrop(true);
    };

    const onUpload = () => {
        updateBanner({ slug, banner: file })
    }

    useEffect(() => {
        if (file !== null) {
            onUpload()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    useEffect(() => {
        if(isError || isSuccess) {
            setFile(null)
        }
    }, [isError, isSuccess])

    return (
        <Formik
            initialValues={{ banner: '' }}
            onSubmit={onUpload}
        >
            <Form>
                <FormContainer>
                    <FormItem>
                        <Field name="banner">
                            {({ field, form }: FieldProps) => (
                                <Upload
                                    showList={false}
                                    uploadLimit={1}
                                    accept='image/*'
                                    onChange={(files) =>
                                        onSetFormFile(
                                            form,
                                            field,
                                            files
                                        )
                                    }
                                    onFileRemove={(files) =>
                                        onSetFormFile(
                                            form,
                                            field,
                                            files
                                        )
                                    }
                                >
                                    <Button
                                        size='xs'
                                        variant='twoTone'
                                        type='button'
                                        icon={<RiImageEditFill className='text-xl' />}
                                        loading={isLoading}
                                    >
                                        Edit
                                    </Button>
                                </Upload>
                            )}
                        </Field>
                    </FormItem>
                </FormContainer>
                <CropImage
                    {...{
                        photoURL,
                        setOpenCrop,
                        openCrop,
                        aspect: 16 / 9,
                        setPhotoURL,
                        setFile,
                        maxSizeMB: 0.25,
                    }}
                />
            </Form>
        </Formik>
    )
}
export default UploadBanner