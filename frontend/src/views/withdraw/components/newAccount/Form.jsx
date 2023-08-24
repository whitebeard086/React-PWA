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
import { AiOutlineSave } from "react-icons/ai";
import { addAccount, createTransferRecipient, getWithdrawalData, resolveAccountNumber, setAccountStatus, setRecipientStatus, setResolveStatus } from "../../store/dataSlice";
import { FaSpinner } from "react-icons/fa";
import classNames from "classnames";
import { useEffect } from "react";
import { setFormData, setIsValidAccountNumber, toggleAccountDialog } from "../../store/stateSlice";
import { getUser } from "@/store/auth/userSlice";

const NewAccountForm = () => {
    const dispatch = useDispatch();

    const { banks, resolvingAccount, resolvedAccount, resolveStatus, resolveError, accountStatus, recipientStatus, recipient, creatingRecipient, addingAccount } = useSelector((state) => state.withdraw.data)
    const { isValidAccountNumber, formData } = useSelector((state) => state.withdraw.state)

    const validationSchema = Yup.object().shape({
        bank: Yup.string().required("Please select a bank"),
        accNumber: Yup.string().required("Please enter your account number"),
        password: Yup.string().required("Please enter your password"),
    })

    const initialValues = {
        bank: "",
        accNumber: "",
        password: "",
    }

    const bankOptions = banks?.map((bank) => {
        return {
            label: bank.name,
            value: bank.code,
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

    useEffect(() => {
        if (resolveError !== '') {
            dispatch(setResolveStatus('idle'))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolveError, resolveStatus])

    useEffect(() => {
        if (accountStatus === 'error' || recipientStatus === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );
        }

        if (accountStatus === 'password error') {
            popNotification(
                "The password entered does not match your account password, please try again.",
                "danger",
                "Error",
                5000
            );
        }

        if (accountStatus === 'duplicate error') {
            popNotification(
                "Account already added or in use by another user",
                "danger",
                "Error",
                5000
            );
        }

        if (accountStatus === 'success') {
            dispatch(toggleAccountDialog(false));
            dispatch(getUser());
            dispatch(getWithdrawalData());

            popNotification(
                "Withdrawal account added successfully.",
                "success",
                "Success",
                5000
            );
        }

        if (accountStatus === 'error' || accountStatus === 'password error' || (accountStatus === 'duplicate error') || accountStatus === 'success'){
            dispatch(setAccountStatus('idle'))
            dispatch(setRecipientStatus('idle'))
        }

        if (recipientStatus === 'error'){
            dispatch(setRecipientStatus('idle'))
        }
    }, [accountStatus, dispatch, recipientStatus])

    useEffect(() => {
        if (recipientStatus === 'success'){
            dispatch(addAccount({
                bankName: recipient?.details?.bank_name,
                accountNumber: recipient?.details?.account_number,
                accountName: recipient?.details?.account_name,
                recipientCode: recipient?.recipient_code,
                password: formData?.password
            }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipientStatus])

    const onSubmit = (values) => {
        const { bank, accNumber, password } = values;

        dispatch(setFormData({
            bankCode: bank,
            accountNumber: accNumber,
            password: password
        }))
        dispatch(createTransferRecipient({
            accountName: resolvedAccount?.account_name,
            accountNumber: accNumber,
            bankCode: bank
        }))
    }

    const handleAccNumberChange = (e, values, form, field) => {
        form.setFieldValue(field.name, e.floatValue);

        if (e.value.length >= 10) {
            if (!isValidAccountNumber) {
                dispatch(setIsValidAccountNumber(true))
            }
        } else {
            if (isValidAccountNumber) {
                dispatch(setIsValidAccountNumber(false))
            }
        }
        if (e.value.length === 10 && values.bank) {
            dispatch(resolveAccountNumber({
                accountNumber: e.floatValue,
                bankCode: values.bank
            }))
        }
    }

    return (
        <div className="mt-10">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onSubmit(values, setSubmitting);
                }}
            >
                {({ touched, errors, values }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label=""
                                    invalid={
                                        errors.bank && touched.bank
                                    }
                                    className="w-full"
                                    errorMessage={errors.bank}
                                >
                                    <Field
                                        name="bank"
                                        prefix={""}
                                        className="w-full"
                                        autoComplete="off"
                                    >
                                        {({ field, form }) => (
                                            <Select 
                                                placeholder="Select a Bank"
                                                field={field}
                                                form={form}
                                                className="w-full"
                                                options={bankOptions}
                                                value={bankOptions?.value}
                                                onChange={(bank) => {
                                                    form.setFieldValue(field.name, bank.value)
                                                    if (values.accNumber >= 10) {
                                                        dispatch(resolveAccountNumber({
                                                            accountNumber: values.accNumber,
                                                            bankCode: bank.value
                                                        }))
                                                    }
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    label=""
                                    invalid={
                                        errors.accNumber &&
                                        touched.accNumber
                                    }
                                    errorMessage={errors.accNumber}
                                >
                                    <Field name="accNumber">
                                        {({ field, form }) => {
                                            return (
                                                <FormNumericInput
                                                    thousandSeparator={false}
                                                    form={form}
                                                    field={field}
                                                    maxLength={10}
                                                    placeholder="Enter Account Number"
                                                    decimalScale={0}
                                                    value={field.value}
                                                    onValueChange={(e) => {
                                                        handleAccNumberChange(e, values, form, field); 
                                                    }}
                                                />
                                            );
                                        }}
                                    </Field>
                                </FormItem>

                                {(values.bank && isValidAccountNumber && resolvingAccount) ? (
                                    <div className="p-2 mb-4 grid place-content-center">
                                        <Spinner indicator={FaSpinner} color="primary-500" size={24} />
                                    </div>
                                ) : (values.bank && isValidAccountNumber && (resolvedAccount?.account_name || resolveError)) ? (
                                    <div className={classNames("p-2 border-2 mb-4 rounded-lg", resolveError && 'border-red-500', resolveStatus === 'success' && 'border-primary-500')}>
                                        <p className="text-sm font-semibold text-gray-500">
                                            {resolveError && 'Invalid account details'}
                                            {resolveStatus === 'success' && resolvedAccount?.account_name}
                                        </p>
                                    </div>
                                ) : null}

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
                                    loading={creatingRecipient || addingAccount}
                                    disabled={!isValidAccountNumber || !resolvedAccount?.account_name || !values.password}
                                    variant="solid"
                                    type="submit"
                                    icon={<AiOutlineSave />}
                                    className="!bg-gray-900 hover:!bg-black"
                                >
                                    Save
                                </Button>
                            </FormContainer>
                        </Form>    
                    )
                }}
            </Formik>
        </div>
    )
}
export default NewAccountForm