import {
	FormNumericInput,
	Loading,
	SegmentItemOption,
} from '@/components/shared';
import { Button, FormContainer, FormItem, Segment } from '@/components/ui';
import { Field, Form, Formik } from 'formik';
import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import * as Yup from 'yup';
import { useGetProducts } from '../../store/hooks';
import {
	SLICE_NAME,
	setState,
	useAppDispatch,
	useAppSelector,
	verifyCustomer,
} from '../store';

const validationSchema = Yup.object().shape({
	meter_type: Yup.string().required('Please select meter type'),
	device_number: Yup.string().required('Please enter meter number'),
});

const initialValues = {
	meter_type: '',
	device_number: '',
};

const DataForm = () => {
	const [lastValues, setLastValues] = useState(initialValues);
	const [formValues, setFormValues] = useState(initialValues);

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

	useEffect(() => {
		if (
			formValues.meter_type &&
			formValues.device_number &&
			formValues.device_number.length > 10
		) {
			const v_data = {
				...store,
				...formValues,
			};
			console.log('payload: ', v_data);
			onVerifyCustomer(v_data);
		}
	}, [formValues]);

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
	const onPay = (values) => {};

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
						// if (
						// 	values?.meter_type &&
						// 	values?.device_number &&
						// 	values?.device_number.length > 10
						// ) {
						// 	const v_data = {
						// 		...store,
						// 		...values,
						// 	};
						// 	console.log('payload: ', v_data);
						// 	onVerifyCustomer(v_data);
						// }

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
															setFormValues({
																...formValues,
																[field.name]: val[0],
															});
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
																setFormValues({
																	...formValues,
																	[field.name]: e.value,
																});
															}}
														/>
													);
												}}
											</Field>
										</FormItem>
									</div>

									<Button
										variant="solid"
										type="submit"
										block
										className="!bg-gray-900 hover:!bg-black"
										disabled={!values.bundle || !values.phone}
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
