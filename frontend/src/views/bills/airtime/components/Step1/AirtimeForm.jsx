/* eslint-disable react/prop-types */
import { FormNumericInput } from '@/components/shared';
import { Button, FormContainer, FormItem, Input } from '@/components/ui';
import { popNotification } from '@/utils/toast';
import { useGetProducts } from '@/views/bills/store/hooks';
import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { BsPhone } from 'react-icons/bs';
import { TbCurrencyNaira } from 'react-icons/tb';
import * as Yup from 'yup';
import {
	SLICE_NAME,
	setProduct,
	useAppDispatch,
	useAppSelector,
} from '../../store';

const validationSchema = Yup.object().shape({
	phone: Yup.string()
		.matches(
			/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
			'Phone number is not valid'
		)
		.required('Please enter your phone number'),
	amount: Yup.string().required('Please enter an amount'),
});

const AirtimeForm = ({ onNext }) => {
	const dispatch = useAppDispatch();

	const { product, store } = useAppSelector((state) => state[SLICE_NAME].data);
	const { profile } = useAppSelector((state) => state.auth.user);

	const { isFetching, data } = useGetProducts(store);
	const { products } = data || {};

	const operator_product = products?.data?.find(
		(item) => item.fee_type === 'RANGE'
	);
	// console.log('operator_product: ', operator_product);
	// console.log('is fetching: ', isFetching);
	const initialValues = {
		phone: product?.phone || '',
		amount: product?.amount || '',
	};

	const onSubmit = ({ phone, amount }) => {
		if (amount > profile?.balance) {
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
				productID: operator_product?.id,
				bill: store?.bill,
				operatorID: store?.operatorID,
				device_number: phone,
				amount,
				package: operator_product?.name,
			})
		);
		onNext();
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

									<FormItem
										label="How Much Do You Want To Recharge?"
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
														isAllowed={(field) =>
															field.value <=
															Number(operator_product?.meta?.maximum_fee)
														}
														placeholder={`Amount between ₦${Number(
															operator_product?.meta?.minimum_fee
														).toLocaleString()} - ₦${Number(
															operator_product?.meta?.maximum_fee
														).toLocaleString()}`}
														decimalScale={0}
														value={field.value}
														inputPrefix={
															<TbCurrencyNaira className="text-2xl" />
														}
														onValueChange={(e) =>
															form.setFieldValue(field.name, e.floatValue)
														}
													/>
												);
											}}
										</Field>
									</FormItem>

									<Button
										variant="solid"
										type="submit"
										block
										className="!bg-gray-900 hover:!bg-black"
										disabled={
											!values.amount ||
											isFetching ||
											!values.phone ||
											values.amount <
												Number(operator_product?.meta?.minimum_fee) ||
											values.amount >
												Number(operator_product?.meta?.maximum_fee)
										}
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
export default AirtimeForm;
