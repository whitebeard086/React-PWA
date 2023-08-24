import { Button, FormContainer, FormItem, Notification, toast } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { toggleCancelDeleteDialog } from "../../store/stateSlice";
import { cancelDeleteAccount, setDeleteStatus } from "../../store/dataSlice";
import { getUser } from "@/store/auth/userSlice";
import { Field, Form, Formik } from "formik";
import { PasswordInput } from "@/components/shared";
import { useEffect } from "react";

const CancelForm = () => {
    const dispatch = useDispatch();

    const { deletingAccount, deleteStatus } = useSelector((state) => state.settings.data)

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Please enter your password"),
    })

    const initialValues = {
        password: '',
    }

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
        if (deleteStatus === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );

            dispatch(setDeleteStatus('idle'));
            dispatch(toggleCancelDeleteDialog(false));
        }

        if (deleteStatus === 'password error') {
            popNotification(
                "The password entered does not match your account password, please try again.",
                "danger",
                "Error",
                5000
            );

            dispatch(setDeleteStatus('idle'));
        }

        if (deleteStatus === 'success') {
            popNotification(
                "Your account deletion has been canceled.",
                "success",
                "Success",
                6000
            );

            dispatch(setDeleteStatus('idle'));
            dispatch(getUser());
            dispatch(toggleCancelDeleteDialog(false));
        }
    }, [deleteStatus, dispatch])

    const handleSubmit = ({ password }) => {
        dispatch(cancelDeleteAccount({ password }))
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ touched, errors }) => {
                return (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Please Enter Your Password To Confirm"
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
                                type="submit"
                                variant="solid"
                                size="sm"
                                block
                                className="!bg-gray-900 hover:!bg-black"
                                loading={deletingAccount}
                            >
                                Submit
                            </Button>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default CancelForm