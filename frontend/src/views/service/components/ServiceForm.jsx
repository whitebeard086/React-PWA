import { Button, FormContainer, FormItem, Input } from "components/ui";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BsDashLg } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "react-time-picker";
import * as Yup from "yup";
import MondayDialog from "./monday/MondayDialog";
import { setEditingMonday } from "../store/stateSlice";
import { formatTime } from "components/ui/utils/formatTime";
import Monday from "./monday";
import Tuesday from "./tuesday";
import Wednesday from "./wednesday";
import Thursday from "./thursday";
import Friday from "./friday";
import Saturday from "./saturday";
import Sunday from "./sunday";

const ServiceForm = () => {
    const dispatch = useDispatch();

    const [value, onChange] = useState('8:20');

    const { 
        unavailable,
        mondayValue,
        mondayValue2,
    } = useSelector((state) => state.service.state)

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Please enter the title of your service or business"),
    })

    const initialValues = {
        title: "",
    }

    const onSubmit = (values) => {
        values.monday = 1
    }

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
                    console.log(values);
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
                                    <p className="font-bold">Set Working Hours</p>

                                    <Monday />
                                    <Tuesday />
                                    <Wednesday />
                                    <Thursday />
                                    <Friday />
                                    <Saturday />
                                    <Sunday />
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default ServiceForm