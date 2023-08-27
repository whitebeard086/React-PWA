import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ActionBar = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};
	return (
		<div>
			<MdArrowBack className="h-6 w-6 hover:cursor-pointer" onClick={goBack} />
		</div>
	);
};
export default ActionBar;
