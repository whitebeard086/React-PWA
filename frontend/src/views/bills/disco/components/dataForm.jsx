import {
	FormNumericInput,
	Loading,
	SegmentItemOption,
} from '@/components/shared';
import {
	Alert,
	Button,
	FormContainer,
	FormItem,
	Segment,
	Spinner,
} from '@/components/ui';
import { popNotification } from '@/utils/toast';
import { Field, Form, Formik } from 'formik';
import debounce from 'lodash/debounce';
import { useEffect, useRef } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import * as Yup from 'yup';
import { useGetProducts } from '../../store/hooks';
import {
	SLICE_NAME,
	setProduct,
	setState,
	useAppDispatch,
	useAppSelector,
	verifyCustomer,
} from '../store';

const validationSchema = Yup.object().shape({
	meter_type: Yup.string().required('Please select meter type'),
	device_number: Yup.string().required('Please enter meter number'),
	amount: Yup.string().required('Please enter amount'),
});

const initialValues = {
	meter_type: '',
	device_number: '',
	amount: '',
};

const DataForm = () => {
	const dispatch = useAppDispatch();
	const { store, customer } = useAppSelector((state) => state[SLICE_NAME].data);

	const handleDebounceFn = (v_data) => {
		dispatch(verifyCustomer(v_data));
	};

	const debounceFn = useRef(debounce(handleDebounceFn, 1000)).current;

	useEffect(() => {
		return () => {
			debounceFn.cancel();
		};
	}, []);

	const { isFetching, data } = useGetProducts(store);
	const { products } = data || {};
	const { profile } = useAppSelector((state) => state.auth.user);

	console.log('Products: ', products);
	console.log('customer: ', customer);

	const meter_options = [
		{ value: 'prepaid', name: 'prepaid' },
		{ value: 'postpaid', name: 'postpaid' },
	];

	const onVerifyCustomer = (d_values) => {
		debounceFn(d_values);
	};
	const onPay = (values) => {
		if (values?.amount > profile?.account_balance) {
			popNotification(
				'Error',
				'You do not have sufficient fund to complete this transaction, please top-up and try again.',
				'danger',
				5000
			);

			return;
		}
		const payload = {
			...store,
			...values,
			productID: products?.data[0]?.id,
			disco: products?.data[0]?.name,
		};
		dispatch(setProduct(payload));
		dispatch(setState(2));
	};

	return (
		<Loading loading={isFetching}>
			<div
				className="inline-flex items-center cursor-pointer py-2 pr-2 mb-2"
				onClick={() => {
					dispatch(setState(0));
				}}
			>
				<HiChevronLeft /> Back
			</div>

			{products?.success && products?.data?.length > 0 ? (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => onPay(values)}
				>
					{({ touched, errors, values }) => {
						// console.log('meter type: ', values.meter_type);
						return (
							<Form>
								<FormContainer>
									<div className="flex flex-col xx:flex-row xx:gap-2">
										<FormItem
											label="Meter type"
											invalid={errors.meter_type && touched.meter_type}
											errorMessage={errors.meter_type}
										>
											<Field name="meter_type">
												{({ field, form }) => (
													<Segment
														className="flex flex-col gap-2 xx:flex-row"
														value={[field.value]}
														onChange={(val) => {
															form.setFieldValue(field.name, val[0]);
															if (val[0] && values.device_number.length >= 11) {
																const v_data = {
																	...store,
																	meter_type: val[0],
																	device_number: values.device_number,
																};
																console.log('data from meter:', v_data);
																onVerifyCustomer(v_data);
															}
														}}
													>
														<>
															{meter_options.map((item, index) => (
																<Segment.Item
																	value={item.value}
																	key={item.value}
																>
																	{({
																		ref,
																		active,
																		onSegmentItemClick,
																		disabled,
																	}) => {
																		return (
																			<SegmentItemOption
																				ref={ref}
																				active={active}
																				disabled={disabled}
																				className="bg-slate-50"
																				onSegmentItemClick={onSegmentItemClick}
																				variant="plain"
																			>
																				<div className="text-center">
																					<p className="text-base">
																						{item.value}
																					</p>
																				</div>
																			</SegmentItemOption>
																		);
																	}}
																</Segment.Item>
															))}
														</>
													</Segment>
												)}
											</Field>
										</FormItem>
										<FormItem
											label="Meter number"
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
															placeholder="Meter number"
															format="###"
															onValueChange={(e) => {
																form.setFieldValue(field.name, e.value);
																if (e.value.length >= 11 && values.meter_type) {
																	const v_data = {
																		...store,
																		meter_type: values.meter_type,
																		device_number: e.value,
																	};
																	console.log('data from device:', v_data);
																	onVerifyCustomer(v_data);
																}
															}}
														/>
													);
												}}
											</Field>
										</FormItem>
									</div>

									{values?.device_number?.length >= 11 &&
										values?.meter_type && (
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
																	customer?.status === 'success'
																		? 'success'
																		: 'danger'
																}
																showIcon
															>
																{customer?.status === 'success'
																	? customer?.data?.data?.name ??
																	  customer?.message
																	: customer?.message}
															</Alert>
														)}
													</>
												)}
											</>
										)}
									<Field name="amount">
										{({ field, form }) => {
											return (
												<FormNumericInput
													className="xx:h-12 mb-4"
													thousandSeparator={true}
													form={form}
													field={field}
													placeholder="Enter amount"
													// isAllowed={(field) => field.value}
													decimalScale={2}
													onValueChange={(e) => {
														form.setFieldValue(field.name, e.floatValue);
													}}
													value={field.value}
													inputSuffix={
														<span className="font-semibold">NGN</span>
													}
												/>
											);
										}}
									</Field>
									<Button
										variant="solid"
										type="submit"
										block
										className="!bg-gray-900 hover:!bg-black"
										disabled={
											!customer?.data?.success ||
											customer?.status !== 'success' ||
											!values.amount ||
											!values.device_number ||
											!values.meter_type
										}
									>
										Continue
									</Button>
								</FormContainer>
							</Form>
						);
					}}
				</Formik>
			) : (
				<p className="mb-4">Sorry this distro is currently unavailable.</p>
			)}
		</Loading>
	);
};
export default DataForm;
