import { Button } from '@/components/ui';
// import { BASE_URL } from '@/constants/app.constant';
import { useAppDispatch, useAppSelector } from '@/store';
import { popNotification } from '@/utils/toast';
import { BiCopy } from 'react-icons/bi';
import { setState } from '../store';

const Actions = () => {
	const dispatch = useAppDispatch();
	const { profile } = useAppSelector((state) => state.auth.user);

	const seeHistory = () => {
		dispatch(setState(1));
	};
	return (
		<div className="p-5 grid gap-4 justify-center items-center">
			<Button
				shape="circle"
				className="min-w-[220px] flex items-center justify-center"
				variant="plain"
				onClick={() => {
					navigator.clipboard.writeText(
						profile?.username
						// `${BASE_URL}/register?referrer=${profile?.username}`
					);
					popNotification('', 'Copied', 'success', 1000);
				}}
			>
				{/* {`${BASE_URL}/register?referrer=${profile?.username}`}{' '} */}
				{profile?.username} <BiCopy className="ml-1 h-6 w-6" />
			</Button>
			<Button shape="circle" className="min-w-[220px]" variant="solid">
				Invite a friend
			</Button>
			<Button shape="circle" onClick={seeHistory}>
				Referral history
			</Button>
		</div>
	);
};
export default Actions;
