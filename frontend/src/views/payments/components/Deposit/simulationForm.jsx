import { FormNumericInput } from '@/components/shared';
import { Button, FormContainer, FormItem } from '@/components/ui';
import { Field, Form, Formik } from 'formik';
import { useSimulateCredit } from '../../store/hooks';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	amount: Yup.string().required('Enter the amount'),
});

const SimulationForm = () => {
	const { mutate, isLoading, isSuccess } = useSimulateCredit();

	const initialValues = {
		amount: '',
	};

	const onUpdate = (values) => {
		mutate(values);
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
							<FormItem
								label="Amount"
								invalid={errors.amount && touched.amount}
								errorMessage={errors.amount}
							>
								<Field name="amount">
									{({ field, form }) => {
										return (
											<FormNumericInput
												thousandSeparator={true}
												form={form}
												field={field}
												placeholder="Enter amount"
												decimalScale={2}
												// format="###"
												onValueChange={(e) => {
													form.setFieldValue(field.name, e.floatValue);
												}}
												inputSuffix={<span className="font-semibold">NGN</span>}
											/>
										);
									}}
								</Field>
							</FormItem>

							<div className="flex mt-2">
								<Button
									loading={isLoading}
									block
									disabled={isSuccess}
									variant="solid"
									type="submit"
								>
									Fund account
								</Button>
							</div>
						</FormContainer>
					</Form>
				);
			}}
		</Formik>
	);
};
export default SimulationForm;
