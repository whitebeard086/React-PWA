import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { BsPhone } from 'react-icons/bs';
import * as Yup from 'yup';

import { SegmentItemOption } from '@/components/shared';
import {
	Button,
	FormContainer,
	FormItem,
	Input,
	Segment,
	Spinner,
} from '@/components/ui';
import { popNotification } from '@/utils/toast';
import { useGetProducts } from '../../store/hooks';
import {
	SLICE_NAME,
	setProduct,
	setState,
	useAppDispatch,
	useAppSelector,
} from '../store';

const validationSchema = Yup.object().shape({
	phone: Yup.string()
		.matches(
			/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
			'Phone number is not valid'
		)
		.required('Please enter your phone number'),
	bundle: Yup.string().required('Please select bundle'),
});

const DataForm = () => {
	const dispatch = useAppDispatch();

	const { product, store } = useAppSelector((state) => state[SLICE_NAME].data);
	const { profile } = useAppSelector((state) => state.auth.user);

	const { isFetching, data } = useGetProducts(store);
	const { products } = data || {};

	console.log(products);

	const initialValues = {
		phone: product?.phone || '',
	};

	const onSubmit = ({ phone, bundle }) => {
		const selected = products?.data?.find((b) => b.id === bundle);
		if (selected?.meta?.fee > profile?.balance) {
			popNotification(
				'Error',
				'You do not have enough balance to complete this transaction, please top-up and try again.',
				'danger',
				5000
			);

			return;
		}

		dispatch(
			setProduct({
				productID: bundle,
				bill: store?.bill,
				operatorID: store?.operatorID,
				device_number: phone,
				amount: Number(selected?.meta?.fee),
				package: selected?.name,
			})
		);
		dispatch(setState(1));
	};

	return (
		<div className="mt-5">
			<motion.div
				initial={{ opacity: 0, visibility: 'hidden' }}
				animate={{ opacity: 1, visibility: 'visible' }}
				transition={{ duration: 0.3, type: 'tween' }}
				exit={{ opacity: 0, visibility: 'hidden' }}
			>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => onSubmit(values)}
				>
					{({ touched, errors, values }) => {
						return (
							<Form>
								<FormContainer>
									<FormItem
										label="Enter Your Phone Number"
										invalid={errors.phone && touched.phone}
										errorMessage={errors.phone}
									>
										<Field
											type="text"
											autoComplete="off"
											name="phone"
											placeholder="Phone number"
											component={Input}
											prefix={<BsPhone className="text-xl" />}
										/>
									</FormItem>
									{isFetching ? (
										<Spinner size={40} className="mx-auto mb-4" />
									) : (
										<FormItem
											label="Select a data bundle"
											invalid={errors.bundle && touched.bundle}
											errorMessage={errors.bundle}
										>
											<Field name="bundle">
												{({ field, form }) => (
													<Segment
														className="grid grid-cols-card gap-3"
														value={[field.value]}
														onChange={(val) =>
															form.setFieldValue(field.name, val[0])
														}
													>
														<>
															{products?.data
																?.filter((item) => item.fee_type !== 'RANGE')
																.map((item) => (
																	<Segment.Item value={item.id} key={item.id}>
																		{({
																			ref,
																			active,
																			value,
																			onSegmentItemClick,
																			disabled,
																		}) => {
																			return (
																				<SegmentItemOption
																					ref={ref}
																					active={active}
																					disabled={disabled}
																					className="bg-slate-50"
																					onSegmentItemClick={
																						onSegmentItemClick
																					}
																					variant="plain"
																				>
																					<div className="space-y-1 text-center">
																						<h6>{item?.meta?.data_value}</h6>
																						<p>{item?.meta?.data_expiry}</p>
																						<p>
																							₦
																							{Number(
																								item?.meta?.fee
																							)?.toLocaleString()}
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
									)}

									<Button
										variant="solid"
										type="submit"
										block
										className="!bg-gray-900 hover:!bg-black"
										disabled={!values.bundle || !values.phone || isFetching}
									>
										Continue
									</Button>
								</FormContainer>
							</Form>
						);
					}}
				</Formik>
			</motion.div>
		</div>
	);
};
export default DataForm;
