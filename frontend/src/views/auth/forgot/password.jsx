import { Container } from '@/components/shared';
import { useState } from 'react';
import InitiateForm from './components/initiateForm';
import ResetForm from './components/resetForm';

const Password = () => {
	const [code, setCode] = useState(false);
	const [email, setEmail] = useState('');

	return (
		<Container className="max-w-xl h-screen bg-white p-4">
			<div className="h-full flex flex-col justify-center">
				<div className="flex justify-center items-center pb-5">
					<img
						className="w-3/4"
						src="/svg/forgot_password.svg"
						alt="forgot password svg image courtesy undraw"
					/>
				</div>

				<div className="">
					{/* <h1 className="font-semibold text-base text-center">
						Reset password
					</h1> */}
					{code ? (
						<ResetForm setCode={setCode} email={email} setEmail={setEmail} />
					) : (
						<InitiateForm setCode={setCode} email={email} setEmail={setEmail} />
					)}
				</div>
			</div>
		</Container>
	);
};
export default Password;
