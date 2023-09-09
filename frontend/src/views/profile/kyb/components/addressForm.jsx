import { Button, FormContainer, FormItem, Input } from '@/components/ui';
import { Field, Form, Formik } from 'formik';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	street: Yup.string().required('Enter the name of your street'),
	city: Yup.string().required('Enter the name of your city'),
	state: Yup.string().required('Enter the name of your state'),
	country: Yup.string().required('Enter the name of your country'),
	postal_code: Yup.string().required('Enter your postal code'),
});

const AddressForm = ({ profile, mutate, isLoading, isSuccess }) => {
	const onCreate = (values) => {
		// console.log(values);
		mutate(values);
	};

	const initialValues = {
		street: profile?.address?.street ?? '',
		city: profile?.address?.city ?? '',
		state: profile?.address?.state ?? '',
		country: profile?.address?.country ?? '',
		postal_code: profile?.address?.postal_code ?? '',
	};

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize={true}
			validationSchema={validationSchema}
			onSubmit={(values) => onCreate(values)}
		>
			{({ errors, touched }) => {
				return (
					<Form>
						<FormContainer>
							<div className="flex gap-3">
								<FormItem
									className="mb-3 flex-1"
									label="Street"
									invalid={errors.street && touched.street}
									errorMessage={errors.street}
								>
									<Field
										type="text"
										autoComplete="off"
										name="street"
										placeholder="Street"
										component={Input}
									/>
								</FormItem>
								<FormItem
									className="mb-3 flex-1"
									label="City"
									invalid={errors.city && touched.city}
									errorMessage={errors.city}
								>
									<Field
										type="text"
										autoComplete="off"
										name="city"
										placeholder="City"
										component={Input}
									/>
								</FormItem>
							</div>
							<div className="flex gap-3">
								<FormItem
									className="mb-3 flex-1"
									label="State"
									invalid={errors.state && touched.state}
									errorMessage={errors.state}
								>
									<Field
										type="text"
										autoComplete="off"
										name="state"
										placeholder="State"
										component={Input}
									/>
								</FormItem>
								<FormItem
									className="mb-3 flex-1"
									label="Country"
									invalid={errors.country && touched.country}
									errorMessage={errors.country}
								>
									<Field
										type="text"
										autoComplete="off"
										name="country"
										placeholder="Country"
										component={Input}
									/>
								</FormItem>
							</div>
							<FormItem
								className="mb-3"
								label="Postal Code"
								invalid={errors.postal_code && touched.postal_code}
								errorMessage={errors.postal_code}
							>
								<Field
									type="text"
									autoComplete="off"
									name="postal_code"
									placeholder="Postal Code"
									component={Input}
								/>
							</FormItem>
							<Button
								loading={isLoading}
								block
								disabled={isSuccess}
								variant="solid"
								type="submit"
							>
								Submit
							</Button>
						</FormContainer>
					</Form>
				);
			}}
		</Formik>
	);
};
export default AddressForm;
