import { SegmentItemOption } from '@/components/shared';
import { Segment } from '@/components/ui';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggleDepositDialog } from '../../store/stateSlice';
import Deposit from './deposit';
import Transfer from './transfer';

const DepositShell = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [type, setType] = useState('');

	const options = [
		{
			id: 1,
			name: 'Transfer',
			value: 'transfer',
			desc: 'Transfer with your bank account or USSD',
		},
		{
			id: 2,
			name: 'Deposit',
			value: 'deposit',
			desc: 'Deposit into your account with a naira card',
		},
	];

	const { profile } = useSelector((state) => state.auth.user);

	const doKYB = () => {
		if (location.pathname !== '/profile/kyb') {
			navigate('/profile/kyb');
			dispatch(toggleDepositDialog(false));
		}
	};

	return (
		<div className="mt-4 overflow-y-auto">
			{profile?.kyc_tier === '0' ? (
				doKYB()
			) : (
				<>
					{!type && (
						<div className="grid gap-4">
							<h3 className="text-center text-base">
								How would you like to fund your account?
							</h3>
							<Segment
								className="flex flex-col gap-4"
								onChange={(val) => {
									setType(val[0]);
								}}
							>
								{options?.map((item) => (
									<Segment.Item value={item.value} key={item.id}>
										{({ ref, active, onSegmentItemClick, disabled }) => {
											return (
												<SegmentItemOption
													ref={ref}
													active={active}
													disabled={disabled}
													className="bg-emerald-100"
													onSegmentItemClick={onSegmentItemClick}
													variant="plain"
												>
													<div className="space-y-1 text-center">
														<h6>{item.name}</h6>
														<p>{item.desc}</p>
													</div>
												</SegmentItemOption>
											);
										}}
									</Segment.Item>
								))}
							</Segment>
						</div>
					)}
					{type === 'transfer' && <Transfer profile={profile} />}
					{type === 'deposit' && <Deposit profile={profile} />}
				</>
			)}
		</div>
	);
};
export default DepositShell;
