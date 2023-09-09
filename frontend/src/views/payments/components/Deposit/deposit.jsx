import { FormNumericInput } from '@/components/shared';
import {
	Button,
	FormContainer,
	FormItem,
	Input,
	Select,
} from '@/components/ui';
import { Field, Form, Formik } from 'formik';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	card_number: Yup.string()
		.length(16, 'Card number should be 16 digits')
		.required('Card Number is required'),
	expiry_month: Yup.string().required('Expiry Month is required'),
	expiry_year: Yup.string().required('Expiry Year is required'),
	cvc: Yup.string().length(3, 'Must be 3 digits').required('CVC is required'),
	name: Yup.string().required('Enter the name on your card'),
});

const Deposit = ({ profile }) => {
	// Generate month options
	const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map(
		(month) => {
			const monthName = new Date(0, month - 1).toLocaleString('default', {
				month: 'long',
			});
			return { id: month, name: monthName, value: month };
		}
	);

	// Generate year options as arrays of objects
	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear + i).map(
		(year) => ({ id: year, name: year.toString(), value: year })
	);

	const onDeposit = (values) => {
		console.log(values);
	};
	// console.log(monthOptions);
	// console.log(yearOptions);

	return (
		<Formik
			initialValues={{
				card_number: '',
				expiry_month: '',
				expiry_year: '',
				cvc: '',
				name: '',
			}}
			enableReinitialize={true}
			validationSchema={validationSchema}
			onSubmit={(values) => onDeposit(values)}
		>
			{({ errors, touched, values }) => {
				return (
					<Form className="text-slate-800">
						<FormContainer>
							<FormItem
								className="mb-3"
								label="Name"
								invalid={errors.name && touched.name}
								errorMessage={errors.name}
							>
								<Field
									type="text"
									autoComplete="off"
									name="name"
									placeholder="Name on card"
									component={Input}
								/>
							</FormItem>
							<FormItem
								className="mb-3"
								label="Card number"
								invalid={errors.card_number && touched.card_number}
								errorMessage={errors.card_number}
							>
								<Field name="card_number">
									{({ field, form }) => {
										return (
											<FormNumericInput
												className="xx:h-12"
												form={form}
												field={field}
												// placeholder=""
												format="###"
												onValueChange={(e) =>
													form.setFieldValue(field.name, e.value)
												}
											/>
										);
									}}
								</Field>
							</FormItem>
							<div className="flex gap-3">
								<FormItem
									className="mb-3 w-full"
									label="Expires"
									invalid={errors.expiry_month && touched.expiry_month}
									errorMessage={errors.expiry_month}
								>
									<Field name="expiry_month">
										{({ field, form }) => (
											<Select
												menuPlacement="top"
												className="w-full text-slate-700"
												placeholder="Month"
												field={field}
												form={form}
												options={monthOptions}
												value={monthOptions.filter(
													(month) => month.value === values.expiry_month
												)}
												onChange={(month) =>
													form.setFieldValue(field.name, month.value)
												}
											/>
										)}
									</Field>
								</FormItem>
								<FormItem
									className="mb-3 w-full"
									label="Year"
									invalid={errors.expiry_year && touched.expiry_year}
									errorMessage={errors.expiry_year}
								>
									<Field name="expiry_year">
										{({ field, form }) => (
											<Select
												menuPlacement="top"
												className="w-full"
												placeholder="Year"
												field={field}
												form={form}
												options={yearOptions}
												value={yearOptions.filter(
													(year) => year.value === values.expiry_year
												)}
												onChange={(year) =>
													form.setFieldValue(field.name, year.value)
												}
											/>
										)}
									</Field>
								</FormItem>
								<FormItem
									className="mb-3 w-full"
									label="CVC"
									invalid={errors.cvc && touched.cvc}
									errorMessage={errors.cvc}
								>
									<Field name="cvc">
										{({ field, form }) => {
											return (
												<FormNumericInput
													className="xx:h-12"
													form={form}
													field={field}
													placeholder="CVC"
													format="###"
													onValueChange={(e) =>
														form.setFieldValue(field.name, e.value)
													}
												/>
											);
										}}
									</Field>
								</FormItem>
							</div>
							<Button
								// loading={isLoading}
								block
								// disabled={isSuccess}
								variant="solid"
								type="submit"
							>
								Continue
							</Button>
						</FormContainer>
					</Form>
				);
			}}
		</Formik>
	);
};
export default Deposit;
