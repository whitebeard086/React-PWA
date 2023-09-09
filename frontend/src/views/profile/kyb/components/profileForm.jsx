import {
	Button,
	FormContainer,
	FormItem,
	Input,
	Select,
} from '@/components/ui';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Field, Form, Formik } from 'formik';

import * as Yup from 'yup';
dayjs.extend(customParseFormat);

const validationSchema = Yup.object().shape({
	place_of_birth: Yup.string().required('Please enter your place of birth'),
	gender: Yup.string().required('Please enter your gender'),
	// dob: Yup.string().required('Please enter your date of birth'),
	dob: Yup.string()
		.required('Please enter your date of birth')
		.test('dob', 'Required format: YYYY-MM-DD', (value) => {
			return dayjs(value, 'YYYY-MM-DD', true).isValid();
		}),
});

const genderOptions = [
	{ label: 'Male', value: 'Male' },
	{ label: 'Female', value: 'Female' },
	{ label: 'Others', value: 'Others' },
];

const ProfileForm = ({ profile, mutate, isLoading, isSuccess }) => {
	const onUpdate = (values) => {
		// console.log(values);
		mutate(values);
	};

	const initialValues = {
		place_of_birth: profile?.place_of_birth ?? '',
		gender: profile?.gender ?? '',
		dob: profile?.dob ?? '',
	};

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize={true}
			validationSchema={validationSchema}
			onSubmit={(values) => onUpdate(values)}
		>
			{({ errors, touched, values }) => {
				return (
					<Form className="xx:flex-1">
						<FormContainer>
							<div className="flex gap-3">
								<div className="flex-1 flex flex-col gap-4 items-center">
									<FormItem
										className="mb-3 w-full"
										label="Date of Birth"
										invalid={errors.dob && touched.dob}
										errorMessage={errors.dob}
									>
										<Field
											type="text"
											autoComplete="off"
											name="dob"
											placeholder="1989-03-30"
											component={Input}
										/>
									</FormItem>
									<FormItem
										className="mb-3 w-full"
										// label="Gender"
										invalid={errors.gender && touched.gender}
										errorMessage={errors.gender}
									>
										<Field name="gender">
											{({ field, form }) => (
												<Select
													className="w-full"
													placeholder="Gender"
													field={field}
													form={form}
													options={genderOptions}
													value={genderOptions.filter(
														(gender) => gender.value === values.gender
													)}
													onChange={(gender) =>
														form.setFieldValue(field.name, gender.value)
													}
												/>
											)}
										</Field>
									</FormItem>
								</div>

								<div className="flex-1 flex flex-col gap-4 justify-between pb-3">
									<FormItem
										className="mb-3"
										label="Place of Birth"
										invalid={errors.place_of_birth && touched.place_of_birth}
										errorMessage={errors.place_of_birth}
									>
										<Field
											type="text"
											autoComplete="off"
											name="place_of_birth"
											placeholder="Port-Harcourt"
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
								</div>
							</div>
						</FormContainer>
					</Form>
				);
			}}
		</Formik>
	);
};
export default ProfileForm;
