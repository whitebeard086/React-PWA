/* eslint-disable react/prop-types */
import { Button, FormContainer, FormItem, Input, Select } from "@/components/ui";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updatePhone } from "../store/dataSlice";
import { useEffect } from "react";
import { Loading } from "@/components/shared";
import { getUser } from "@/store/auth/userSlice";

const PhoneForm = ({ onNext }) => {
    const dispatch = useDispatch()

    const { countries, loading, phoneStatus, settingPhone, message } = useSelector((state) => state.verify.data) 

    const handleNext = (values) => {
        const {
            code,
            phone,
        } = values;

        const data = { 
            phone: code.substring(1) + phone
        }

        dispatch(updatePhone(data))
    }

    useEffect(() => {
        if (message === 'Otp sent') {
            dispatch(getUser())
            onNext()
        }
    }, [dispatch, message, onNext])

    const isValidPhone = (phone) => {
        return (/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/).test(phone)
    }

    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid number"
            )
            .required(""),
            code: Yup.string().required("Please select your country"),
    })

    const initialValues = {
        phone: "",
        code: "+234",
    }

    const countryOptions = countries?.map((item) => {
        
        return { label: `+${item.phone}`, value: item.name}
    })

    return (
        <div className="mt-4 flex justify-center">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    handleNext(values, setSubmitting)
                }}
            >
                {({ errors, touched, values }) => {
                    const validPhone = isValidPhone(values.phone)
                    console.log(values.code + values.phone);
                    return (
                        <Form>
                            <FormContainer>
                                <div className="flex">
                                    <FormItem
                                        label=""
                                        invalid={
                                            errors.code &&
                                            touched.code
                                        }
                                        className=""
                                        errorMessage={errors.code}
                                    >
                                        <Field
                                            name="code"
                                            prefix={""}
                                            className=""
                                            autoComplete="off"
                                        >
                                            {({ field, form }) => (
                                                loading ? (
                                                    <div className="bg-blue-100 h-11 w-28 rounded-l-md">
                                                        <Loading size={30} loading={true} />
                                                    </div>
                                                ) : (
                                                    <Select
                                                        placeholder=""
                                                        field={field}
                                                        form={form}
                                                        className="w-28 select_phone"
                                                        isLoading={loading}
                                                        onInputChange={(inputValue) => {
                                                            console.log(inputValue);
                                                        }}
                                                        options={countryOptions}
                                                        defaultValue={countryOptions[163]}
                                                        value={
                                                            countryOptions?.value
                                                        }
                                                        onChange={(country) => {
                                                            form.setFieldValue(field.name, country.label)
                                                        }}
                                                    />
                                                )
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label=""
                                        invalid={
                                            errors.phone && touched.phone
                                        }
                                        errorMessage={errors.phone}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phone"
                                            className="rounded-l-none border-l-0"
                                            placeholder="Enter phone number"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>

                                <Button
                                    block
                                    variant="solid"
                                    disabled={!values.phone || !values.code || !validPhone}
                                    loading={phoneStatus === "loading" || settingPhone}
                                >
                                    Send Code
                                </Button>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default PhoneForm