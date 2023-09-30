import { useUser } from '@/services/features/userApi';
import { setHasVisited } from '@/store/auth/userSlice';
import { Suspense, lazy, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../../components/shared';

const Landing = () => {
	const navigate = useNavigate();
	const { userType } = useUser();

	// const Step1 = lazy(() => import("./components/Step1"))
	const Step2 = lazy(() => import('./components/Step2'));
	const Step3 = lazy(() => import('./components/Step3'));
	const Step4 = lazy(() => import('./components/Step4'));
	const Step5 = lazy(() => import('./components/Step5'));

	const dispatch = useDispatch();
	const location = useLocation();
	console.log(location.pathname);

	// const { hasVisited } = useSelector((state) => state.auth.user);

	const hasVisited = localStorage.getItem('visitedTastikly');

	if (hasVisited) {
		navigate('/home');
	}
	const [step, setStep] = useState(1);

	// useEffect(() => {
	// 	if (userType ?? '' != '') navigate('/home');
	// 	if (location.pathname === '/' && hasVisited) {
	// 		navigate('/home');
	// 	}
	// }, [dispatch, hasVisited, location.pathname, navigate, userType]);

	const handleNext = useCallback(() => {
		setStep(step + 1);
	}, [step]);

	const handleSkip = () => {
		if (userType !== '') {
			localStorage.setItem('visitedTastikly', 'true');
			dispatch(setHasVisited(true));
			navigate('/home');
		} else {
			navigate('/login');
		}
	};

	// const onGetStarted = useCallback(() => {
	//     navigate("/register")
	// }, [navigate])

	return (
		<Container className="max-w-xl">
			<Suspense
				fallback={<div className="bg-primary-500 w-full h-screen"></div>}
			>
				{/* {step === 0 && <Step1 onNext={handleNext} onSkip={handleSkip} />} */}
				{step === 1 && <Step2 onNext={handleNext} onSkip={handleSkip} />}
				{step === 2 && <Step3 onNext={handleNext} onSkip={handleSkip} />}
				{step === 3 && <Step4 onNext={handleNext} onSkip={handleSkip} />}
				{step === 4 && <Step5 onNext={handleNext} onSkip={handleSkip} />}
			</Suspense>
		</Container>
	);
};
export default Landing;
