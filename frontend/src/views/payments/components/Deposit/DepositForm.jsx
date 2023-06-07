import { Button, FormContainer, FormItem } from "components/ui";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/auth/userSlice";
import { paystackDeposit, verifyPaystackDeposit } from "views/payments/store/dataSlice";
import { setAmount } from "views/payments/store/stateSlice";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FormNumericInput } from "components/shared";
import { PaystackButton } from "react-paystack";

const DepositForm = () => {
    const dispatch = useDispatch();

    const publicKey = 'pk_test_abd78b5f53a117719e9152fad5412b26de42b1e0';

    const { profile } = useSelector((state) => state.auth.user)

    const validationSchema = Yup.object().shape({
        amount: Yup.string().required("How much do you want to deposit?"),
    })

    const initialValues = {
        amount: "",
    }

    const onDeposit = (values) => {
        const { amount } = values;

        dispatch(setAmount(amount));
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) => onDeposit(values)}
        >
            {({ errors, touched, values }) => {

                const paystackProps = {
                    email: profile?.email,
                    amount: values.amount * 100,
                    metadata: {
                        name: profile?.username,
                        phone: profile?.phone,
                    },
                    publicKey,
                    text: "Deposit",
                    onSuccess: ({ reference }) => {
                        dispatch(paystackDeposit({ 
                            amount: values.amount * 100,
                            reference,
                            charge: 0,
                        }))
                        dispatch(verifyPaystackDeposit());
                        dispatch(setAmount(""));
                        dispatch(getUser());
                    },
                    onClose: () => {},
                }

                return (
                    <Form>
                        <FormContainer>
                            <motion.div
                                className="mb-3 relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    type: "tween",
                                    duration: 0.5,
                                }}
                            >
                                <FormItem
                                    label="Enter Amount"
                                    invalid={errors.amount && touched.amount}
                                    errorMessage={errors.amount}
                                >
                                    <Field name="amount">
                                        {({ field,form, }) => {
                                            return (
                                                <FormNumericInput
                                                    thousandSeparator={true}
                                                    form={form}
                                                    field={field}
                                                    placeholder="Enter amount to deposit"
                                                    // isAllowed={(field) => field.value}
                                                    decimalScale={2}
                                                    onValueChange={(e) => {
                                                        form.setFieldValue(field.name, e.floatValue);
                                                    }}
                                                    value={field.value}
                                                    inputSuffix={
                                                        <span className="font-semibold">
                                                            NGN
                                                        </span>
                                                    }
                                                />
                                            );
                                        }}
                                    </Field>

                                </FormItem>
                            </motion.div>

                            <div className="mt-4">
                                {!values.amount || values.amount > 5000000 ? (
                                    <Button
                                        disabled
                                        block
                                        size="sm"
                                        variant="solid"
                                    >
                                        {values.amount > 5000000 ? "₦5 Million Max..." : "Deposit"}
                                    </Button>
                                ):(
                                    <div className="flex gap-2 justify-center items-center h-9 font-semibold text-white text-sm rounded-md px-3 py-2 w-full cursor-pointer bg-primary-500 hover:bg-primary-600 transition duration-300">
                                        <PaystackButton
                                            className="paystack-button w-full px-3 py-2"
                                            {...paystackProps}
                                        />
                                    </div>
                                )}
                            </div>
                        </FormContainer>
                    </Form>
                )

            }}   
        </Formik>
    )
}
export default DepositForm