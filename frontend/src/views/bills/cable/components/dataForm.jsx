import { FormNumericInput, Loading } from '@/components/shared';
import {
	Alert,
	Button,
	FormContainer,
	FormItem,
	Spinner,
} from '@/components/ui';
import { Field, Form, Formik } from 'formik';
import debounce from 'lodash/debounce';
import { useEffect, useRef } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import * as Yup from 'yup';
import {
	SLICE_NAME,
	setProduct,
	setState,
	useAppDispatch,
	useAppSelector,
	verifyCustomer,
} from '../store';

const validationSchema = Yup.object().shape({
	// package: Yup.string().required('Please select a package'),
	device_number: Yup.string().required('Please enter meter number'),
});

const initialValues = {
	// package: '',
	device_number: '',
};

const DataForm = () => {
	// const [formValues, setFormValues] = useState(initialValues);

	const dispatch = useAppDispatch();
	const { store, customer, product } = useAppSelector(
		(state) => state[SLICE_NAME].data
	);

	const handleDebounceFn = (v_data) => {
		dispatch(verifyCustomer(v_data));
	};

	const debounceFn = useRef(debounce(handleDebounceFn, 1000)).current;

	useEffect(() => {
		return () => {
			debounceFn.cancel();
		};
	}, []);

	const onVerifyCustomer = (d_values) => {
		debounceFn(d_values);
	};
	const onPay = (values) => {
		dispatch(
			setProduct({
				...product,
				...values,
			})
		);
		dispatch(setState(2));
	};

	return (
		<Loading loading={false}>
			<div
				className="inline-flex items-center cursor-pointer py-2 pr-2 mb-2"
				onClick={() => {
					dispatch(setState(0));
				}}
			>
				<HiChevronLeft /> Back
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => onPay(values)}
			>
				{({ touched, errors, values }) => {
					return (
						<Form>
							<FormContainer>
								<FormItem
									label="Smart card number"
									invalid={errors.device_number && touched.device_number}
									errorMessage={errors.device_number}
									className="xx:flex-1 xx:justify-between"
								>
									<Field name="device_number">
										{({ field, form }) => {
											return (
												<FormNumericInput
													className="xx:h-12"
													form={form}
													field={field}
													placeholder="Smart card number"
													format="###"
													onValueChange={(e) => {
														form.setFieldValue(field.name, e.value);
														if (e.value.length >= 11) {
															const v_data = {
																...store,
																device_number: e.value,
															};
															console.log(v_data);
															onVerifyCustomer(v_data);
														}
													}}
												/>
											);
										}}
									</Field>
								</FormItem>

								{values?.device_number?.length > 10 && (
									<>
										{customer?.status === 'pending' ? (
											<Spinner size={35} className="mx-auto mb-3" />
										) : (
											<>
												{(customer?.status === 'success' ||
													customer?.status === 'error') && (
													<Alert
														className="mb-4"
														type={
															customer?.data?.success &&
															customer?.data?.data?.name
																? 'success'
																: 'danger'
														}
														showIcon
													>
														{customer?.data?.data?.name ?? customer?.message}
													</Alert>
												)}
											</>
										)}
									</>
								)}

								<Button
									variant="solid"
									type="submit"
									block
									className="!bg-gray-900 hover:!bg-black"
									disabled={
										!customer?.data?.success && !customer?.data?.data?.name
									}
								>
									Continue
								</Button>
							</FormContainer>
						</Form>
					);
				}}
			</Formik>
		</Loading>
	);
};
export default DataForm;
