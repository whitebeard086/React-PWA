import { useDispatch } from "react-redux";
import { setAddingItem, setInvoiceData } from "../../store/stateSlice";
import { motion, AnimatePresence } from "framer-motion";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Button, FormContainer, FormItem, Input } from "@/components/ui";
import { FormNumericInput } from "@/components/shared";
import createUID from "@/components/ui/utils/createUid";
import { MdOutlineDownloadDone } from "react-icons/md";
import { AiOutlineRollback } from "react-icons/ai";

const InvoiceForm = () => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        item: Yup.string().required("Please enter an item"),
        price: Yup.string().required("Please enter a price"),
    });

    const initialValues = {
        item: "",
        price: "",
    };

    const onSubmit = (values) => {
        const { item, price } = values;

        const data = {
            tid: createUID(5),
            item,
            price,
        };

        dispatch(setInvoiceData(data));
        dispatch(setAddingItem(false));
    };

    return (
        <AnimatePresence>
            <motion.div
                key={1}
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                transition={{ duration: 0.2, type: "tween" }}
                exit={{ opacity: 0, visibility: "hidden" }}
                layoutId={1}
            >
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                        onSubmit(values, setSubmitting);
                        resetForm();
                    }}
                >
                    {({
                        isSubmitting,
                        touched,
                        errors,
                        values,
                        setFieldValue,
                    }) => {
                        console.log(values);
                        return (
                            <Form>
                                <FormContainer>
                                    <FormItem
                                        label="Item"
                                        invalid={errors.item && touched.item}
                                        errorMessage={errors.item}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="item"
                                            size="sm"
                                            placeholder="Enter an item"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Price"
                                        invalid={errors.price && touched.price}
                                        errorMessage={errors.price}
                                    >
                                        <Field name="price">
                                            {({ field, form }) => {
                                                return (
                                                    <FormNumericInput
                                                        thousandSeparator={true}
                                                        form={form}
                                                        size="sm"
                                                        field={field}
                                                        placeholder="Enter price"
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

                                    <div className="mt-8 flex items-center gap-2">
                                        <Button
                                            block
                                            variant="solid"
                                            type="submit"
                                            size="sm"
                                            icon={<MdOutlineDownloadDone />}
                                            disabled={
                                                !values.item || !values.price
                                            }
                                        >
                                            Add
                                        </Button>

                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                            block
                                            variant="solid"
                                            type="button"
                                            size="sm"
                                            icon={<AiOutlineRollback />}
                                            onClick={() =>
                                                dispatch(setAddingItem(false))
                                            }
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </FormContainer>
                            </Form>
                        );
                    }}
                </Formik>
            </motion.div>
        </AnimatePresence>
    );
};
export default InvoiceForm;
