import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Upload,
} from "@/components/ui";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { GrServices } from "react-icons/gr";
import { createCategory } from "../store/dataSlice";

const NewCategory = () => {
    const dispatch = useDispatch();

    const { creatingCategory } = useSelector((state) => state.settings.data);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Enter a name"),
        icon: Yup.string().required("Upload an icon"),
    });

    const initialValues = {
        name: "",
        icon: "",
    };

    const onCreateCategory = (values) => {
        const { name, iconFile } = values;

        const data = {
            name,
            icon: iconFile,
        };

        dispatch(createCategory(data));
    };

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]));
        form.setFieldValue(`${field.name}File`, file[0]);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onCreateCategory(values)}
        >
            {({ errors, touched, values, children }) => {
                console.log(values);
                return (
                    <Form>
                        <FormContainer>
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

                            <Button
                                block
                                className="mt-4"
                                variant="solid"
                                loading={creatingCategory}
                            >
                                Add Category
                            </Button>
                        </FormContainer>
                    </Form>
                );
            }}
        </Formik>
    );
};
export default NewCategory;
