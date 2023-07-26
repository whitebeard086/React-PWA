import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useTimeOutMessage from "../../../../utils/hooks/useTimeOutMessage";
import { Alert, Button, FormContainer, FormItem, Input } from "../../../../components/ui";
import { PasswordInput } from "../../../../components/shared";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../utils/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const SignInForm = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { signedIn } = useSelector((state) => state.auth.session)
    const { userType, verifiedPhone, hasService } = useSelector((state) => state.auth.user)

    const from = location.state?.from?.pathname || "/home"

    useEffect(() => {
        let redirectUrl = from

        if (signedIn) {
            if (userType === "Normal User" && verifiedPhone) {
                redirectUrl = from
            } else if (userType === "Normal User" && !verifiedPhone) {
                redirectUrl = '/verify'
            } else if (userType === "Service Provider" && !hasService) {
                redirectUrl = '/service-setup'
            } else if (userType === "Service Provider" && !verifiedPhone) {
                redirectUrl = '/verify'
            } else if (userType === "Service Provider" && hasService && verifiedPhone) {
                redirectUrl = '/home'
            } 

            navigate(redirectUrl, { replace: true })
        }

        redirectUrl = ""
    }, [from, hasService, navigate, signedIn, userType, verifiedPhone])
    console.log(location);

    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = "/forgot-password",
        signUpUrl = "/register",
    } = props;

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Please enter your username"),
        password: Yup.string().required("Please enter your password"),
        rememberMe: Yup.bool(),
    });

    const [message, setMessage] = useTimeOutMessage();

    const { signIn } = useAuth();

    const onSignIn = async (values, setSubmitting) => {
        const { username, password } = values;
        setSubmitting(true);

        const result = await signIn({ username, password });

        if (result.status === "failed") {
          setMessage(result.message);
        }

        setSubmitting(false);
        // dispatch(getUser())
    };

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting);
                    } else {
                        setSubmitting(false);
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label=""
                                invalid={errors.username && touched.username}
                                errorMessage={errors.username}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="username"
                                placeholder="Username"
                                component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label=""
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                autoComplete="off"
                                name="password"
                                placeholder="Password"
                                component={PasswordInput}
                                />
                            </FormItem>

                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? "Signing in..." : "Sign In"}
                            </Button>

                            <div className="mt-2 text-center text-sm flex flex-col gap-2">
                                <div>
                                    <Link className="underline font-bold" to={forgotPasswordUrl}>
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div>
                                    <span>Don't have an account? {" "}</span>
                                    <Link className="underline font-bold text-primary-500" to={signUpUrl}>
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default SignInForm;
