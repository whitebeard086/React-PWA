/* eslint-disable react/prop-types */
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    FormContainer,
    FormItem,
    Input,
    Notification,
    toast,
} from "@/components/ui";
import { Field, Form, Formik } from "formik";
import { BsPhone } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { FormNumericInput, Loading } from "@/components/shared";
import { setFormData } from "../../store/stateSlice";

const AirtimeForm = ({ onNext }) => {
    const dispatch = useDispatch();

    const { airtime, gettingProducts, productStatus } = useSelector(
        (state) => state.airtime.data
    );
    const { operator, selectedOperator } = useSelector(
        (state) => state.airtime.state
    );
    const { profile } = useSelector((state) => state.auth.user)

    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Phone number is not valid"
            )
            .required("Please enter your phone number"),
        amount: Yup.string().required("Please enter an amount"),
    });

    const initialValues = {
        phone: "",
        amount: "",
    };

    const popNotification = (message, type, title, duration) => {
        toast.push(
            <Notification
                title={title || `${"Error"}`}
                type={type || `${"warning"}`}
                duration={duration || 3000}
            >
                {message}
            </Notification>,
            {
                placement: "top-center",
            }
        );
    };

    const onSubmit = ({ phone, amount }) => {
        if (amount > profile?.balance) {
            popNotification(
                "You do not have enough balance to complete this transaction, please top-up and try again.",
                "danger",
                "Error",
                5000
            );

            return;
        }

        dispatch(
            setFormData({
                oid: operator,
                operator: selectedOperator,
                product: airtime?.id,
                phone,
                amount,
            })
        );
        onNext();
    };

    return (
        <div>
            {gettingProducts ? (
                <div className="h-[10vh]">
                    <Loading size={32} loading={true} />
                </div>
            ) : (
                productStatus === "success" && (
                    <motion.div
                        initial={{ opacity: 0, visibility: "hidden" }}
                        animate={{ opacity: 1, visibility: "visible" }}
                        transition={{ duration: 0.3, type: "tween" }}
                        exit={{ opacity: 0, visibility: "hidden" }}
                    >
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => onSubmit(values)}
                        >
                            {({ touched, errors, values }) => {
                                return (
                                    <Form>
                                        <FormContainer>
                                            <FormItem
                                                label="Enter Your Phone Number"
                                                invalid={
                                                    errors.phone &&
                                                    touched.phone
                                                }
                                                errorMessage={errors.phone}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="phone"
                                                    placeholder="Phone number"
                                                    component={Input}
                                                    prefix={
                                                        <BsPhone className="text-xl" />
                                                    }
                                                />
                                            </FormItem>

                                            <FormItem
                                                label="How Much Do You Want To Recharge?"
                                                invalid={
                                                    errors.amount &&
                                                    touched.amount
                                                }
                                                errorMessage={errors.amount}
                                            >
                                                <Field name="amount">
                                                    {({ field, form }) => {
                                                        return (
                                                            <FormNumericInput
                                                                thousandSeparator={
                                                                    true
                                                                }
                                                                form={form}
                                                                field={field}
                                                                isAllowed={(
                                                                    field
                                                                ) =>
                                                                    field.value <=
                                                                    Number(
                                                                        airtime
                                                                            ?.meta
                                                                            ?.maximum_fee
                                                                    )
                                                                }
                                                                placeholder={`Amount between ₦${Number(
                                                                    airtime
                                                                        ?.meta
                                                                        ?.minimum_fee
                                                                ).toLocaleString()} - ₦${Number(
                                                                    airtime
                                                                        ?.meta
                                                                        ?.maximum_fee
                                                                ).toLocaleString()}`}
                                                                decimalScale={0}
                                                                value={
                                                                    field.value
                                                                }
                                                                inputPrefix={
                                                                    <TbCurrencyNaira className="text-2xl" />
                                                                }
                                                                onValueChange={(
                                                                    e
                                                                ) =>
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        e.floatValue
                                                                    )
                                                                }
                                                            />
                                                        );
                                                    }}
                                                </Field>
                                            </FormItem>

                                            <Button
                                                variant="solid"
                                                type="submit"
                                                block
                                                className="!bg-gray-900 hover:!bg-black"
                                                disabled={
                                                    !values.amount ||
                                                    !values.phone ||
                                                    values.amount <
                                                        Number(
                                                            airtime?.meta
                                                                ?.minimum_fee
                                                        ) ||
                                                    values.amount >
                                                        Number(
                                                            airtime?.meta
                                                                ?.maximum_fee
                                                        )
                                                }
                                            >
                                                Continue
                                            </Button>
                                        </FormContainer>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </motion.div>
                )
            )}
        </div>
    );
};
export default AirtimeForm;
