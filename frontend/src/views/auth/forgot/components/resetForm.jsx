import { PasswordInput } from '@/components/shared';
import { Button, FormContainer, FormItem, Input } from '@/components/ui';
import { useResetMutation } from '@/services/features/userApi';
import { popNotification } from '@/utils/toast';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const resetSchema = Yup.object().shape({
	token: Yup.string().required('Please enter the token you received'),
	email: Yup.string()
		.email('Invalid email')
		.required('Please enter your email'),
	password: Yup.string().required('Please enter your password'),
	password_confirmation: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Your passwords do not match'
	),
});

const ResetForm = ({ setCode, email, setEmail }) => {
	const navigate = useNavigate();
	const [reset, { isLoading }] = useResetMutation();

	const onReset = async (values) => {
		try {
			await reset(values).unwrap();
			setEmail(values.email);
			setCode(true);
		} catch (err) {
			popNotification(
				'Error',
				err.data.message ?? 'Something went wrong; try again',
				'danger',
				5000
			);
		}
	};

	return (
		<Formik
			initialValues={{
				email: email,
				token: '',
				password: '',
				password_confirmation: '',
			}}
			validationSchema={resetSchema}
			onSubmit={(values) => onReset(values)}
		>
			{({ errors, touched }) => (
				<Form>
					<FormContainer>
						<FormItem
							label="Registered email address"
							invalid={errors.email && touched.email}
							errorMessage={errors.email}
							className="mb-4"
						>
							<Field
								type="email"
								autoComplete="off"
								name="email"
								component={Input}
							/>
						</FormItem>
						<FormItem
							label="Token"
							invalid={errors.token && touched.token}
							errorMessage={errors.token}
							className="mb-4"
						>
							<Field
								type="text"
								autoComplete="off"
								name="token"
								component={Input}
							/>
						</FormItem>
						<div className="flex gap-3 items-center">
							<FormItem
								label="Password"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
								className="w-full"
							>
								<Field
									autoComplete="off"
									name="password"
									component={PasswordInput}
								/>
							</FormItem>
							<FormItem
								label="Confirm password"
								invalid={
									errors.password_confirmation && touched.password_confirmation
								}
								errorMessage={errors.password_confirmation}
								className="w-full"
							>
								<Field
									autoComplete="off"
									name="password_confirmation"
									component={PasswordInput}
								/>
							</FormItem>
						</div>

						<Button
							type="submit"
							variant="solid"
							size="sm"
							block
							className="!bg-gray-900 hover:!bg-black"
							loading={isLoading}
						>
							Reset Password
						</Button>
					</FormContainer>
					<div className="flex items-center gap-3 justify-between">
						<Button
							type="button"
							variant="plain"
							size="sm"
							onClick={() => setCode(false)}
							className="underline underline-offset-2 pl-0"
						>
							Resend token
						</Button>
						<Button
							type="button"
							variant="plain"
							size="sm"
							onClick={() => navigate('/login')}
							className="underline underline-offset-2 pr-0 !text-emerald-500"
						>
							Sign In
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
export default ResetForm;
