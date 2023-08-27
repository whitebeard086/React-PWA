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
import {
	SLICE_NAME,
	setState,
	setStore,
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

// const parseExpirationDate = (expirationString) => {
// 	const regex = /^["']?\s*(\d+)\s*(\w+)/;
// 	const match = expirationString.match(regex);

// 	if (match) {
// 		const expirationValue = parseInt(match[1], 10);
// 		const expirationUnit = match[2];

// 		let expirationDate = new Date();

// 		if (expirationUnit === 'day' || expirationUnit === 'days') {
// 			expirationDate.setDate(expirationDate.getDate() + expirationValue);
// 		} else if (expirationUnit === 'week' || expirationUnit === 'weeks') {
// 			expirationDate.setDate(expirationDate.getDate() + expirationValue * 7);
// 		} else if (expirationUnit === 'month' || expirationUnit === 'months') {
// 			expirationDate.setMonth(expirationDate.getMonth() + expirationValue);
// 		} else if (expirationUnit === 'year' || expirationUnit === 'years') {
// 			expirationDate.setFullYear(
// 				expirationDate.getFullYear() + expirationValue
// 			);
// 		}

// 		return expirationDate;
// 	}

// 	return null; // Handle invalid expiration strings
// };
const DataForm = () => {
	const dispatch = useAppDispatch();

	const { operator, products, store } = useAppSelector(
		(state) => state[SLICE_NAME].data
	);
	const { profile } = useAppSelector((state) => state.auth.user);

	const { data, status } = products;

	// const sortedData = data?.sort((a, b) => {
	// 	const expiryA = parseInt(a.meta.data_expiry); // Assuming data_expiry is a number (e.g., "30 days")
	// 	const expiryB = parseInt(b.meta.data_expiry);
	// 	return expiryA - expiryB;
	// });

	// Convert data_expiry to Date objects
	// const sortedDataBundles = data?.map((bundle) => {
	// 	let trimmedExpiry = bundle.meta.data_expiry;
	// 	if (!trimmedExpiry && bundle.meta.hasOwnProperty(' data_expiry')) {
	// 		trimmedExpiry = bundle.meta[' data_expiry'].replace(/["']/g, '').trim();
	// 	}

	// 	return {
	// 		...bundle,
	// 		meta: {
	// 			...bundle.meta,
	// 			data_expiry: parseExpirationDate(trimmedExpiry),
	// 		},
	// 	};
	// });

	// Sort the list based on data_expiry in ascending order
	// sortedDataBundles?.sort(
	// 	(a, b) => a?.meta?.data_expiry - b?.meta?.data_expiry
	// );

	// Step 3: Map over the sorted list and display the data bundles
	// sortedDataBundles.map(bundle => (
	//   <div key={bundle.id}>
	//     <p>Name: {bundle.name}</p>
	//     <p>Expiry Date: {bundle.meta.data_expiry.toDateString()}</p>
	//     {/* ... other properties */}
	//   </div>
	// ));
	// console.log('sorted: ', sortedDataBundles);
	const isFetching = status === 'pending';

	const initialValues = {
		phone: store?.phone || '',
	};

	const onSubmit = ({ phone, bundle }) => {
		const selected = data?.find((b) => b.id === bundle);
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
			setStore({
				oid: operator?.id,
				operator: selected?.name,
				product: bundle,
				phone,
				amount: selected?.meta?.fee,
			})
		);
		dispatch(setState(1));
		// onNext();
	};

	return (
		<div className="mt-5">
			<motion.div
				initial={{ opacity: 0, visibility: 'hidden' }}
				animate={{ opacity: 1, visibility: 'visible' }}
				transition={{ duration: 0.3, type: 'tween' }}
				exit={{ opacity: 0, visibility: 'hidden' }}
			>
				{isFetching ? (
					<Spinner size={40} className="mx-auto" />
				) : (
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
															{data?.map((item, index) => (
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
																				onSegmentItemClick={onSegmentItemClick}
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
				)}
			</motion.div>
		</div>
	);
};
export default DataForm;
