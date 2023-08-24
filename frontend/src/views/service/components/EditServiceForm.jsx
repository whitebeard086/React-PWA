import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Notification,
    Select,
    toast,
} from "@/components/ui";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Monday from "./monday";
import Tuesday from "./tuesday";
import Wednesday from "./wednesday";
import Thursday from "./thursday";
import Friday from "./friday";
import Saturday from "./saturday";
import Sunday from "./sunday";
import { FormNumericInput, Loading, RichTextEditor } from "@/components/shared";
import {
    createService,
    getSubCategories,
    setServiceStatus,
    updateService,
} from "../store/dataSlice";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/store/auth/userSlice";

const EditServiceForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profile } = useSelector((state) => state.auth.user);

    const {
        loadingCategories,
        categories,
        loadingSubCategories,
        subCategories,
        creatingService,
        serviceStatus,
    } = useSelector((state) => state.service.data);

    const {
        mondayValue,
        mondayValue2,
        tuesdayValue,
        wednesdayValue,
        thursdayValue,
        fridayValue,
        saturdayValue,
        sundayValue,
        tuesdayValue2,
        wednesdayValue2,
        thursdayValue2,
        fridayValue2,
        saturdayValue2,
        sundayValue2,
    } = useSelector((state) => state.service.state);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(
            "Please enter the title of your service or business"
        ),
        category: Yup.string().required("Please select a category"),
        subcategory: Yup.string().required("Please select a sub category"),
        description: Yup.string().required(
            "Please write a brief description of your service"
        ),
        startingPrice: Yup.string().required(
            "Please enter a minimum price for your service"
        ),
    });

    const initialValues = {
        title: profile.service?.title,
        category: profile.service?.category_id,
        subcategory: profile.service?.sub_category_id,
        description: profile.service?.description,
        startingPrice: profile.service?.starting_price,
    };

    const categoryOptions = categories?.map((item) => {
        return { label: item.name, value: item.id };
    });

    const subCategoryOptions = subCategories?.map((item) => {
        return { label: item.name, value: item.id };
    });

    const onSubmit = (values) => {
        const { title, category, subcategory, description, startingPrice } =
            values;

        const data = {
            service_id: profile.service?.id,
            workdays_id: profile.service?.workdays_id,
            monday1: mondayValue,
            monday2: mondayValue2,
            tuesday1: tuesdayValue,
            tuesday2: tuesdayValue2,
            wednesday1: wednesdayValue,
            wednesday2: wednesdayValue2,
            thursday1: thursdayValue,
            thursday2: thursdayValue2,
            friday1: fridayValue,
            friday2: fridayValue2,
            saturday1: saturdayValue,
            saturday2: saturdayValue2,
            sunday1: sundayValue,
            sunday2: sundayValue2,
            category,
            subcategory,
            title,
            description,
            starting_price: startingPrice,
        };

        dispatch(updateService(data));
    };

    useEffect(() => {
        const popNotification = (keyword) => {
            toast.push(
                <Notification
                    title={`${
                        serviceStatus === "success" ? "Success" : "Error"
                    }`}
                    type={`${
                        serviceStatus === "success" ? "success" : "danger"
                    }`}
                    duration={5000}
                >
                    {serviceStatus === "success"
                        ? "Service updated successfully!"
                        : "Looks like something went wrong, please try again."}
                </Notification>,
                {
                    placement: "top-center",
                }
            );
        };

        if (serviceStatus !== "idle") {
            popNotification();
        }

        setTimeout(() => {
            if (serviceStatus === "success") {
                dispatch(getUser());
                navigate(-1);
            }
        }, 2000);

        if (serviceStatus === "success" || serviceStatus === "error") {
            dispatch(setServiceStatus("idle"));
        }
    }, [dispatch, navigate, serviceStatus]);

    return (
        <div className="mt-8">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    onSubmit(values, setSubmitting);
                }}
            >
                {({ isSubmitting, touched, errors, values, setFieldValue }) => {

                    return (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label=""
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="title"
                                        placeholder="Business Name or Service Title"
                                        component={Input}
                                    />
                                </FormItem>

                                <div className="mt-8">
                                    <p className="font-bold">
                                        Set Working Hours
                                    </p>

                                    <Monday />
                                    <Tuesday />
                                    <Wednesday />
                                    <Thursday />
                                    <Friday />
                                    <Saturday />
                                    <Sunday />
                                </div>

                                <div className="mt-8 flex gap-4 justify-between">
                                    <FormItem
                                        label=""
                                        invalid={
                                            errors.category && touched.category
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
                                                    isLoading={
                                                        loadingCategories
                                                    }
                                                    onInputChange={(
                                                        inputValue
                                                    ) => {
                                                        console.log(inputValue);
                                                    }}
                                                    options={categoryOptions}
                                                    defaultValue={{
                                                        label: profile.service
                                                            ?.category?.name,
                                                        value: profile.service
                                                            ?.category_id,
                                                    }}
                                                    value={
                                                        categoryOptions?.value
                                                    }
                                                    onChange={(category) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            category.value
                                                        );
                                                        dispatch(
                                                            getSubCategories({
                                                                category_id:
                                                                    category.value,
                                                            })
                                                        );
                                                        form.setFieldValue(
                                                            "subcategory",
                                                            ""
                                                        );
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>

                                    <FormItem
                                        label=""
                                        invalid={
                                            errors.subcategory &&
                                            touched.subcategory
                                        }
                                        className="w-full"
                                        errorMessage={errors.subcategory}
                                    >
                                        <Field
                                            name="subcategory"
                                            prefix={""}
                                            className="w-full"
                                            autoComplete="off"
                                        >
                                            {({ field, form }) =>
                                                loadingSubCategories ||
                                                loadingCategories ? (
                                                    <div className="border-2 h-11 rounded-md">
                                                        <Loading
                                                            size={30}
                                                            loading={true}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Select
                                                        placeholder="Sub Category"
                                                        field={field}
                                                        form={form}
                                                        className="w-full"
                                                        isLoading={
                                                            loadingSubCategories ||
                                                            loadingCategories
                                                        }
                                                        onInputChange={(
                                                            inputValue
                                                        ) => {
                                                            console.log(
                                                                inputValue
                                                            );
                                                        }}
                                                        options={
                                                            subCategoryOptions
                                                        }
                                                        defaultValue={{
                                                            label: profile
                                                                .service
                                                                ?.sub_category
                                                                ?.name,
                                                            value: profile
                                                                .service
                                                                ?.category_id,
                                                        }}
                                                        value={
                                                            subCategoryOptions?.value
                                                        }
                                                        onChange={(
                                                            category
                                                        ) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                category.value
                                                            );
                                                        }}
                                                    />
                                                )
                                            }
                                        </Field>
                                    </FormItem>
                                </div>

                                <FormItem
                                    label={
                                        <p className="text-gray-400">
                                            Describe the nature of your services
                                        </p>
                                    }
                                    labelClass="!justify-start"
                                    invalid={
                                        errors.description &&
                                        touched.description
                                    }
                                    errorMessage={errors.description}
                                >
                                    <Field name="description">
                                        {({ field, form }) => (
                                            <RichTextEditor
                                                value={field.value}
                                                onChange={(val) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        val
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    label=""
                                    invalid={
                                        errors.startingPrice &&
                                        touched.startingPrice
                                    }
                                    errorMessage={errors.startingPrice}
                                >
                                    <Field name="startingPrice">
                                        {({ field, form }) => {
                                            return (
                                                <FormNumericInput
                                                    thousandSeparator={true}
                                                    form={form}
                                                    field={field}
                                                    placeholder="Service Starting Price"
                                                    decimalScale={2}
                                                    onValueChange={(e) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            e.floatValue
                                                        );
                                                    }}
                                                    value={field.value}
                                                    inputPrefix={
                                                        <span className="font-semibold">
                                                            ₦
                                                        </span>
                                                    }
                                                />
                                            );
                                        }}
                                    </Field>
                                </FormItem>

                                <div className="mt-8">
                                    <Button
                                        block
                                        variant="solid"
                                        type="submit"
                                        loading={creatingService}
                                    >
                                        Finish
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
export default EditServiceForm;
