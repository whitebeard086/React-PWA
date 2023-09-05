import { Button, FormContainer, FormItem, Input } from '@/components/ui';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import { getUser } from "@/store/auth/userSlice";
import { FormNumericInput } from '@/components/shared';
import { useUpdateBvn } from '../../store/hooks';

import * as Yup from 'yup';
// import { motion } from "framer-motion";

const validationSchema = Yup.object().shape({
	// bvn: Yup.string().required('Enter your BVN'),
	bvn: Yup.string()
		.matches(/^[0-9]{11}$/, 'BVN must be exactly 11 digits')
		.required('enter your bvn'),
	first_name: Yup.string().required('Enter the Firstname in your BVN'),
	last_name: Yup.string().required('Enter the Surname in your BVN'),
});

const BvnForm = () => {
	const dispatch = useDispatch();

	const { mutate, isLoading, isSuccess } = useUpdateBvn();

	const { profile } = useSelector((state) => state.auth.user);

	const initialValues = {
		bvn: profile?.bvn,
		first_name: profile?.first_name,
		last_name: profile?.last_name,
	};

	const onUpdate = (values) => {
		console.log('values: ', { userID: profile?.id, data: values });
		mutate({ userID: profile?.id, data: values });
	};

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize={true}
			validationSchema={validationSchema}
			onSubmit={(values) => onUpdate(values)}
		>
			{({ errors, touched }) => {
				return (
					<Form>
						<FormContainer>
							{/* <motion.div
                                  className="mb-3 relative"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{
                                      type: "tween",
                                      duration: 0.5,
                                  }}
                              > */}
							<FormItem
								label="BVN"
								invalid={errors.bvn && touched.bvn}
								errorMessage={errors.bvn}
							>
								<Field name="bvn">
									{({ field, form }) => {
										return (
											<FormNumericInput
												form={form}
												field={field}
												placeholder="BVN"
												format="###"
												onValueChange={(e) => {
													form.setFieldValue(field.name, e.value);
												}}
											/>
										);
									}}
								</Field>
							</FormItem>
							<FormItem
								label="First Name"
								invalid={errors.first_name && touched.first_name}
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
								label="Last Name"
								invalid={errors.last_name && touched.last_name}
								errorMessage={errors.last_name}
							>
								<Field
									type="text"
									autoComplete="off"
									name="last_name"
									placeholder="URL"
									component={Input}
								/>
							</FormItem>
							{/* </motion.div> */}
							<div className="flex mt-3">
								<Button
									loading={isLoading}
									block
									disabled={isSuccess}
									variant="solid"
									type="submit"
								>
									Submit
								</Button>
							</div>
						</FormContainer>
					</Form>
				);
			}}
		</Formik>
	);
};
export default BvnForm;
