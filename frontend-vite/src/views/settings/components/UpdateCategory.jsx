import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup";
import { Button, CropImage, FormContainer, FormItem, Input, Select, Upload } from "components/ui";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import { getCategory, updateCategory } from "../store/dataSlice";
import { Loading } from "components/shared";

const UpdateCategory = () => {
    const dispatch = useDispatch()
    const [openCrop, setOpenCrop] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);
    const [file, setFile] = useState(null)
    console.log(openCrop);
    console.log(photoURL);
    console.log(file);

    const { categories, gettingCategories, gettingCategory, updatingCategory } = useSelector((state) => state.settings.data)

    const categoryOptions = categories?.map((item) => {
        return {
            label: item.name,
            value: item.slug
        }
    })

    const validationSchema = Yup.object().shape({
        name: Yup.string("Enter a name"),
        icon: Yup.string("Upload an icon"),
        banner: Yup.string("Upload banner icon"),
    });

    const initialValues = {
        name: "",
        icon: "",
        banner: "",
        category: "",
    };

    // const onCropImage = useCallback(() => {
        
    // }, [])

    const onUpdateCategory = (values) => {
        const { category, name, iconFile } = values;

        const data = {
            slug: category,
            name,
            icon: iconFile,
            banner: file,
        }

        dispatch(updateCategory(data))
    }

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]));
        form.setFieldValue(`${field.name}File`, file[0]);
    };

    const onSetBannerFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]));
        setPhotoURL(URL.createObjectURL(file[0]))
        setOpenCrop(true);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onUpdateCategory(values)}
        >
            {({ errors, touched, values, children }) => {
                console.log(values);
                return (
                    <Form className="p-6">
                        <FormContainer>
                            <FormItem
                                label=""
                                invalid={
                                    errors.category &&
                                    touched.category
                                }
                                className="w-full"
                                errorMessage={errors.category}
                            >
                                <Field
                                    name="category"
                                    prefix={""}
                                    className="w-full"
                                    autoComplete="off"
                                >
                                    {({ field, form }) => (
                                        <Select
                                            placeholder="Service Category"
                                            field={field}
                                            form={form}
                                            className="w-full"
                                            isLoading={gettingCategories}
                                            onInputChange={(inputValue) => {
                                                console.log(inputValue); 
                                            }}
                                            options={categoryOptions}
                                            // defaultValue={categoryOptions[0]}
                                            value={
                                                categoryOptions?.value
                                            }
                                            onChange={(category) => {
                                                form.setFieldValue(field.name, category.value)
                                                dispatch(getCategory({ slug: category.value }))
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                label=""
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Enter name"
                                    component={Input}
                                    // prefix={<GrServices className="text-xl" />}
                                />
                            </FormItem>

                            <FormItem
                                label="Icon"
                                invalid={errors.icon && touched.icon}
                                errorMessage={errors.icon}
                            >
                                <Field name="icon" autoComplete="off">
                                    {({ field, form }) => {
                                        return (
                                            <Upload
                                                className="cursor-pointer"
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
                                                showList={false}
                                                uploadLimit={1}
                                                draggable
                                            >
                                                {field.value ? (
                                                    <img
                                                        className="p-3 max-h-[300px]"
                                                        src={field.value}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        {children}
                                                        <p className="font-semibold">
                                                            <span className="text-gray-800 dark:text-white">
                                                                Drop your image
                                                                here, or{" "}
                                                            </span>
                                                            <span className="text-blue-500">
                                                                browse
                                                            </span>
                                                        </p>
                                                        <p className="mt-1 opacity-60 dark:text-white">
                                                            Support: jpeg, png
                                                        </p>
                                                    </div>
                                                )}
                                            </Upload>
                                        );
                                    }}
                                </Field>
                            </FormItem>

                            <FormItem
                                label="Banner"
                                invalid={errors.banner && touched.banner}
                                errorMessage={errors.banner}
                            >
                                <Field name="banner" autoComplete="off">
                                    {({ field, form }) => {
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                onChange={(files) =>
                                                    onSetBannerFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetBannerFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                showList={false}
                                                uploadLimit={1}
                                                draggable
                                            >
                                                {field.value ? (
                                                    <img
                                                        className="p-3 max-h-[300px]"
                                                        src={field.value}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        {children}
                                                        <p className="font-semibold">
                                                            <span className="text-gray-800 dark:text-white">
                                                                Drop your image
                                                                here, or{" "}
                                                            </span>
                                                            <span className="text-blue-500">
                                                                browse
                                                            </span>
                                                        </p>
                                                        <p className="mt-1 opacity-60 dark:text-white">
                                                            Support: jpeg, png
                                                        </p>
                                                    </div>
                                                )}
                                            </Upload>
                                        );
                                    }}
                                </Field>
                            </FormItem>

                            <Button
                                block
                                className="mt-4"
                                variant="solid"
                                loading={updatingCategory}
                                type="submit"
                            >
                                Update Category
                            </Button>
                        </FormContainer>

                        <CropImage {...{photoURL, setOpenCrop, openCrop, aspect: 16/9, setPhotoURL, setFile, maxSizeMB: 0.1 }} />
                    </Form>
                )
            }}
        </Formik>
    )
}
export default UpdateCategory