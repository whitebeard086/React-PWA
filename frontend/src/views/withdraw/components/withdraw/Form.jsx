import * as Yup from "yup";
import {
    Button,
    FormContainer,
    FormItem,
    Notification,
    Select,
    Spinner,
    toast,
} from "@/components/ui";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormNumericInput, PasswordInput } from "@/components/shared";
import useTaskitly from "@/utils/hooks/useTaskitly";
import { AnimatePresence, motion } from "framer-motion";
import { payoutCustomer } from "../../store/dataSlice";

const WithdrawForm = () => {
    const dispatch = useDispatch();

    const { profile } = useSelector((state) => state.auth.user)
    
    const accounts = profile?.withdrawal_accounts

    const validationSchema = Yup.object().shape({
        account: Yup.string().required("Please select a withdrawal account"),
        amount: Yup.string().required("Please enter an amount"),
        password: Yup.string().required("Please enter your password"),
    })

    const initialValues = {
        account: "",
        amount: "",
        password: "",
    }

    const accountOptions = accounts?.map((account) => {
        return {
            label: `${account.bank_name} - ${account.account_number}`,
            value: account.recipient_code,
        }
    })

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

    const onSubmit = (values) => {
        const { account, amount, password } = values;

        dispatch(payoutCustomer({
            amount,
            recipientCode: account,
            password
        }))
    }
    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
            onSubmit(values, setSubmitting);
        }}
        >
            {({ touched, errors, values }) => {
                const taskitlyCut = values?.amount * 0.05
                const userCut = values?.amount * 0.95
                console.log(values);

                return (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label=""
                                invalid={
                                    errors.account && touched.account
                                }
                                className="w-full"
                                errorMessage={errors.account}
                            >
                                <Field
                                    name="account"
                                    prefix={""}
                                    className="w-full"
                                    autoComplete="off"
                                >
                                    {({ field, form }) => (
                                        <Select 
                                            placeholder="Select a Withdrawal Account"
                                            field={field}
                                            form={form}
                                            className="w-full"
                                            options={accountOptions}
                                            value={accountOptions?.value}
                                            onChange={(account) => {
                                                form.setFieldValue(field.name, account.value)
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                label=""
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
                                                thousandSeparator={true}
                                                form={form}
                                                field={field}
                                                isAllowed={(field) => field.value <= profile?.balance}
                                                placeholder="Enter Amount"
                                                decimalScale={0}
                                                value={field.value}
                                                onValueChange={(e) => form.setFieldValue(field.name, e.floatValue)}
                                            />
                                        );
                                    }}
                                </Field>
                            </FormItem>

                            <AnimatePresence>
                                {values.amount && (
                                    <motion.div 
                                        className="p-2 mb-4 border-2 rounded-lg"
                                        key={1} layoutId={1} initial={{ opacity: 0, visibility: "hidden", }}
                                        animate={{ opacity: 1, visibility: "visible", }} transition={{ duration: 0.3, type: "tween", }}
                                        exit={{ opacity: 0, visibility: "hidden", }}
                                    >
                                        <p className="text-sm font-semibold text-gray-500">
                                            Taskitly Service Fee (5%): <span className="text-red-500">₦{taskitlyCut?.toLocaleString()}</span>
                                        </p>
                                        <p className="text-sm font-semibold text-gray-500">
                                            You Receive: <span className="text-green-500">₦{userCut?.toLocaleString()}</span>
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <FormItem
                                label=""
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    component={PasswordInput}
                                />
                            </FormItem>

                            <Button
                                block
                                // loading={creatingRecipient || addingAccount}
                                disabled={!values.account || !values?.amount || !values.password}
                                variant="solid"
                                type="submit"
                                // icon={<AiOutlineSave />}
                                className="!bg-gray-900 hover:!bg-black"
                            >
                                Withdraw Now
                            </Button>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default WithdrawForm