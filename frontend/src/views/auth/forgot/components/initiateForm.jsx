import { Button, FormContainer, FormItem, Input } from '@/components/ui';
import { useInitiateMutation } from '@/services/features/userApi';
import { popNotification } from '@/utils/toast';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const initiateSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email')
		.required('Please enter your email'),
});

const InitiateForm = ({ setCode, email, setEmail }) => {
	const navigate = useNavigate();
	const [initiate, { isLoading }] = useInitiateMutation();

	const onInitiate = async ({ email }) => {
		// console.log({ email: email });
		try {
			await initiate({ email: email }).unwrap();
			setEmail(email);
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
			initialValues={{ email: email }}
			validationSchema={initiateSchema}
			onSubmit={(values) => onInitiate(values)}
		>
			{({ errors, touched }) => (
				<Form>
					<FormContainer>
						<FormItem
							label="Registered email address"
							invalid={errors.email && touched.email}
							errorMessage={errors.email}
						>
							<Field
								type="email"
								autoComplete="off"
								name="email"
								component={Input}
							/>
						</FormItem>

						<Button
							type="submit"
							variant="solid"
							size="sm"
							block
							className="!bg-gray-900 hover:!bg-black"
							loading={isLoading}
						>
							Get token
						</Button>
					</FormContainer>
					<div className="flex items-center gap-3 justify-between">
						<Button
							type="button"
							variant="plain"
							size="sm"
							onClick={() => setCode(true)}
							className="underline underline-offset-2 pl-0"
						>
							I have token
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
export default InitiateForm;
