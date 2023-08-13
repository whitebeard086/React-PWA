/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import debounce from "lodash/debounce";
import { BsDot } from "react-icons/bs";
import { motion } from "framer-motion";
import useTimeOutMessage from "../../../../utils/hooks/useTimeOutMessage";
import useTimeOutStatus from "../hooks/UseTimeoutStatus";
import useEmailMessage from "../hooks/UseEmailMessage";
import { useEffect, useState } from "react";
import {
    setChar,
    setLoCase,
    setNum,
    setSpChar,
    setUpCase,
    togglePasswordActive,
    toggleTermsDialog,
} from "../../store/stateSlice";
import {
    Alert,
    Button,
    Card,
    Checkbox,
    FormContainer,
    FormItem,
    Input,
    Radio,
} from "../../../../components/ui";
import { Field, Form, Formik } from "formik";
import classNames from "classnames";
import useAuth from "@/utils/hooks/useAuth";
import { Loading, PasswordInput } from "@/components/shared";
import { checkEmail, checkUser, setSignupData } from "../../store/dataSlice";

const SignupForm = (props) => {
    const { disableSubmit = false, className, signInUrl = "/login" } = props;

    const [type, setType] = useState(1)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/home";

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Please enter your user name"),
        first_name: Yup.string().required("Please enter your first name"),
        last_name: Yup.string().required("Please enter your last name"),
        userType: Yup.string("Please choose a profile type"),
        email: Yup.string()
            .email("Invalid email")
            .required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
        password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Your passwords do not match"
        ),
    });

    const isEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    let caps, small, num, password, specialSymbol;

    const { signUp } = useAuth();

    const onChangeType = (val) => {
        setType(val)
    }

    const {
        status,
        statusMessage,
        emailStatus,
        emailStatusMessage,
        checkingUsername,
        checkingEmail,
        emailAvail,
        usernameAvail,
        profileTypes,
        gettingProfileTypes,
    } = useSelector((state) => state.authentication.data);
    const {
        passwordActive,
        pwdStatus: { characters, number, uppercase, lowercase, specialChar },
        terms,
    } = useSelector((state) => state.authentication.state);
    const { signedIn } = useSelector((state) => state.auth.session);
    const { userType, verifiedPhone, hasService } = useSelector(
        (state) => state.auth.user
    );

    // console.log(usernameAvail);
    const passwordCheck =
        characters && number && uppercase && lowercase && specialChar;

    const handleDebounceFn = (val) => {
        dispatch(checkUser({ username: val }));
    };

    const handleEmailDebounce = (val) => {
        if (isEmail(val)) {
            dispatch(checkEmail({ email: val }));
        }
    };

    const debounceEmail = debounce(handleEmailDebounce, 1000);

    const debounceFn = debounce(handleDebounceFn, 1000);

    const onCheckUser = (e) => {
        debounceFn(e.target.value);
    };

    const onCheckEmail = (e) => {
        debounceEmail(e.target.value);
    };

    const [message, setMessage] = useTimeOutMessage();
    const [checkMessage, setCheckMessage] = useTimeOutStatus();
    const [emailMessage, setEmailMessage] = useEmailMessage();

    useEffect(() => {
        let redirectUrl = from;

        if (signedIn) {
            if (userType === "Client" && verifiedPhone) {
                redirectUrl = from;
            } else if (userType === "Client" && !verifiedPhone) {
                redirectUrl = "/verify";
            } else if (userType === "Provider" && !hasService) {
                redirectUrl = "/service-setup";
            } else if (userType === "Provider" && !verifiedPhone) {
                redirectUrl = "/verify";
            } else if (
                userType === "Provider" &&
                hasService &&
                verifiedPhone
            ) {
                redirectUrl = "/home";
            }

            navigate(redirectUrl, { replace: true });
        }
    }, [from, hasService, navigate, signedIn, userType, verifiedPhone]);

    useEffect(() => {
        if (status === "success" || status === "error") {
            setCheckMessage(statusMessage);
        }
    }, [setCheckMessage, status, statusMessage]);

    useEffect(() => {
        if (emailStatus === "success" || emailStatus === "error") {
            setEmailMessage(emailStatusMessage);
        }
    }, [emailStatus, emailStatusMessage, setEmailMessage]);

    const onSignUp = async (values, setSubmitting) => {
        const {
            username,
            password,
            email,
            password_confirmation,
            userType,
            first_name,
            last_name,
        } = values;
        setSubmitting(true);
        const result = await signUp({
            username,
            first_name,
            last_name,
            password,
            email,
            password_confirmation,
            // profile_type_id: userType,
            profile_type_id: type,
        });

        const data = {
            username: username,
            email: email,
            userType:
                userType === 1
                    ? "Client"
                    : userType === 2
                    ? "Provider"
                    : null,
        };

        dispatch(setSignupData(data));

        if (result.status === "failed") {
            setMessage(result.message);
        }

        setSubmitting(false);
    };

    const onAgreeTerms = () => {
        dispatch(toggleTermsDialog(true));
    };

    return (
        <div className={classNames(className, "mt-4 max-w-lg mx-auto")}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}

            <Formik
                initialValues={{
                    username: "",
                    first_name: "",
                    last_name: "",
                    password: "",
                    password_confirmation: "",
                    email: "",
                    userType: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting);
                    } else {
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    touched,
                    errors,
                    isSubmitting,
                    values,
                    setErrors,
                    setFieldValue,
                }) => {
                    const passwordMatch =
                        values.password === values.password_confirmation;
                    // console.log(values);
                    const onValidate = (e) => {
                        password = e.target.value;
                        caps = (password.match(/[A-Z]/g) || []).length;
                        small = (password.match(/[a-z]/g) || []).length;
                        num = (password.match(/[0-9]/g) || []).length;
                        specialSymbol = (password.match(/\W/g) || []).length;

                        if (password.length > 7) {
                            setFieldValue("password", e.target.value);
                            dispatch(setChar(true));
                        } else {
                            setFieldValue("password", e.target.value);
                            setErrors({
                                ...errors,
                                password:
                                    "password should have at least 8 characters.",
                            });
                            dispatch(setChar(false));
                        }

                        if (caps > 0) {
                            setFieldValue("password", e.target.value);
                            dispatch(setUpCase(true));
                        } else {
                            setFieldValue("password", e.target.value);
                            dispatch(setUpCase(false));
                        }

                        if (small > 0) {
                            setFieldValue("password", e.target.value);
                            dispatch(setLoCase(true));
                        } else {
                            setFieldValue("password", e.target.value);
                            dispatch(setLoCase(false));
                        }

                        if (num > 0) {
                            setFieldValue("password", e.target.value);
                            dispatch(setNum(true));
                        } else {
                            setFieldValue("password", e.target.value);
                            dispatch(setNum(false));
                        }

                        if (specialSymbol > 0) {
                            setFieldValue("password", e.target.value);
                            dispatch(setSpChar(true));
                        } else {
                            setFieldValue("password", e.target.value);
                            dispatch(setSpChar(false));
                        }
                    };

                    return (
                        <Form>
                            <FormContainer>
                                {(status === "success" || status === "error") &&
                                    checkMessage && (
                                        <Alert
                                            className="mb-4"
                                            type={
                                                usernameAvail
                                                    ? "success"
                                                    : "danger"
                                            }
                                            showIcon
                                        >
                                            {checkMessage}
                                        </Alert>
                                    )}

                                <FormItem
                                    label=""
                                    invalid={
                                        errors.userType && touched.userType
                                    }
                                    errorMessage={errors.userType}
                                >
                                    <Field name="userType">
                                        {({ field, form }) => {
                                            return gettingProfileTypes ? (
                                                <Card
                                                    bodyClass="p-1"
                                                    className="w-full"
                                                >
                                                    <Loading loading={true} />
                                                </Card>
                                            ) : (
                                                <div className="flex justify-center">
                                                    <Radio.Group value={type} onChange={onChangeType} className="flex w-full items-center gap-4">
                                                        <Radio value={1} className="border-2 w-full p-2 rounded-md border-gray-400 !mr-0">Client</Radio>
                                                        <Radio value={2} className="border-2 w-full p-2 rounded-md border-gray-400 !mr-0">Provider</Radio>
                                                    </Radio.Group>
                                                    {/* <Radio.Group
                                                        className="flex w-full items-center gap-4"
                                                        value={[field.value]}
                                                        onChange={(val) =>
                                                            form.setFieldValue(
                                                                field.name,
                                                                val
                                                            )
                                                        }
                                                    >
                                                        {profileTypes?.map(
                                                            (type) => (
                                                                <Radio
                                                                    key={
                                                                        type.id
                                                                    }
                                                                    className="border-2 w-full p-2 rounded-md border-gray-400 mr-0"
                                                                    value={
                                                                        type.id
                                                                    }
                                                                >
                                                                    {type.name}
                                                                </Radio>
                                                            )
                                                        )}
                                                    </Radio.Group> */}
                                                </div>
                                            );
                                        }}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    label={
                                        <div className="flex items-center w-full gap-2">
                                            <p></p>
                                            <Loading
                                                loading={checkingUsername}
                                                customLoader={
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex gap-1 space-x-2 animate-pulse">
                                                            <div
                                                                className={`w-2 h-2 bg-green-50 rounded-full`}
                                                            ></div>
                                                            <div
                                                                className={`w-2 h-2 bg-green-50 rounded-full`}
                                                            ></div>
                                                            <div
                                                                className={`w-2 h-2 bg-green-50 rounded-full`}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                }
                                            ></Loading>
                                        </div>
                                    }
                                    invalid={
                                        errors.username && touched.username
                                    }
                                    errorMessage={errors.username}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="username"
                                        placeholder="Username"
                                        className={`${
                                            usernameAvail
                                                ? "border-green-500 dark:border-green-500"
                                                : !usernameAvail &&
                                                  values.username.length > 0
                                                ? "border-red-500 dark:border-red-500 focus:!ring-red-500"
                                                : null
                                        }`}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "username",
                                                e.target.value
                                            );
                                            onCheckUser(e);
                                        }}
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    label=""
                                    invalid={
                                        errors.first_name && touched.first_name
                                    }
                                    errorMessage={errors.first_name}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="first_name"
                                        placeholder="First Name"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    label=""
                                    invalid={
                                        errors.last_name && touched.last_name
                                    }
                                    errorMessage={errors.last_name}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="last_name"
                                        placeholder="Last Name"
                                        component={Input}
                                    />
                                </FormItem>

                                {(emailStatus === "success" ||
                                    emailStatus === "error") &&
                                    emailMessage && (
                                        <Alert
                                            className="mb-4"
                                            type={
                                                emailAvail
                                                    ? "success"
                                                    : "danger"
                                            }
                                            showIcon
                                        >
                                            {emailMessage}
                                        </Alert>
                                    )}

                                <FormItem
                                    label={
                                        <div className="flex items-center gap-2">
                                            <p></p>
                                            <Loading
                                                loading={checkingEmail}
                                                customLoader={
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex gap-1 space-x-2 animate-pulse">
                                                            <div
                                                                className={`w-2 h-2 bg-green-50 rounded-full`}
                                                            ></div>
                                                            <div
                                                                className={`w-2 h-2 bg-green-50 rounded-full`}
                                                            ></div>
                                                            <div
                                                                className={`w-2 h-2 bg-green-50 rounded-full`}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                }
                                            ></Loading>
                                        </div>
                                    }
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        className={`${
                                            emailAvail
                                                ? "border-green-500 dark:border-green-500"
                                                : !emailAvail &&
                                                  isEmail(values.email) > 0
                                                ? "border-red-500 focus:!ring-red-500"
                                                : null
                                        }`}
                                        placeholder="Email"
                                        onChange={(e) => {
                                            setFieldValue(
                                                "email",
                                                e.target.value
                                            );
                                            onCheckEmail(e);
                                        }}
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    label=""
                                    invalid={
                                        errors.password && touched.password
                                    }
                                    errorMessage={errors.password}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password"
                                        passwordClass={`${
                                            passwordCheck
                                                ? "border-green-500"
                                                : !passwordCheck &&
                                                  values.password.length > 7
                                                ? "border-red-500 focus:!ring-red-500"
                                                : null
                                        }`}
                                        placeholder="Password"
                                        onBlur={() =>
                                            dispatch(
                                                togglePasswordActive(false)
                                            )
                                        }
                                        onFocus={() =>
                                            dispatch(togglePasswordActive(true))
                                        }
                                        onChange={(e) => onValidate(e)}
                                        component={PasswordInput}
                                    />
                                </FormItem>

                                {passwordActive && (
                                    <motion.div
                                        className="mb-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            type: "tween",
                                            duration: 0.5,
                                        }}
                                    >
                                        <Card bordered className="mb-4">
                                            <h4 className="text-sm">
                                                Password must contain:
                                            </h4>
                                            <div className="p-4">
                                                <div
                                                    className={`flex items-center ${
                                                        characters
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    <BsDot className="text-3xl" />
                                                    <p>at least 8 characters</p>
                                                </div>
                                                <div
                                                    className={`flex items-center ${
                                                        number
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    <BsDot className="text-3xl" />
                                                    <p>at least 1 number</p>
                                                </div>
                                                <div
                                                    className={`flex items-center ${
                                                        uppercase
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    <BsDot className="text-3xl" />
                                                    <p>at least 1 uppercase</p>
                                                </div>
                                                <div
                                                    className={`flex items-center ${
                                                        lowercase
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    <BsDot className="text-3xl" />
                                                    <p>at least 1 lowercase</p>
                                                </div>
                                                <div
                                                    className={`flex items-center ${
                                                        specialChar
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    <BsDot className="text-3xl" />
                                                    <p>
                                                        at least 1 special
                                                        character (: @ $ ! % * ?
                                                        &)
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                )}

                                <FormItem
                                    label=""
                                    invalid={
                                        errors.password_confirmation &&
                                        touched.password_confirmation
                                    }
                                    errorMessage={errors.password_confirmation}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password_confirmation"
                                        passwordClass={`${
                                            passwordCheck && passwordMatch
                                                ? "border-green-500"
                                                : (!passwordCheck ||
                                                      !passwordMatch) &&
                                                  values.password.length > 7
                                                ? "border-red-500 focus:!ring-red-500"
                                                : null
                                        }`}
                                        placeholder="Confirm Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>

                                <div className="mt-8 mb-4">
                                    <Checkbox
                                        checked={terms}
                                        onChange={onAgreeTerms}
                                        className="text-sm"
                                    >
                                        {" "}
                                        I agree with the{" "}
                                        <span className="font-bold cursor-pointer">
                                            Terms and Policy
                                        </span>{" "}
                                    </Checkbox>
                                </div>

                                <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    disabled={
                                        !passwordCheck ||
                                        !usernameAvail ||
                                        !emailAvail ||
                                        !passwordMatch ||
                                        !terms ||
                                        !values.first_name ||
                                        !values.last_name
                                    }
                                >
                                    {isSubmitting
                                        ? "Creating Account..."
                                        : "Sign Up"}
                                </Button>

                                <div className="mt-2 text-center text-sm">
                                    <span>Already have an account? </span>
                                    <Link
                                        className="underline font-bold text-primary-500"
                                        to={signInUrl}
                                    >
                                        Sign in
                                    </Link>
                                </div>
                            </FormContainer>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
export default SignupForm;
