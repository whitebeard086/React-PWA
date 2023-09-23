import { SegmentItemOption } from '@/components/shared';
import { Avatar, Segment } from '@/components/ui';
import classNames from 'classnames';
import { HiOutlineUser } from 'react-icons/hi';
import { setStore, useAppDispatch } from '../../store';

const Operators = ({ operators }) => {
	const dispatch = useAppDispatch();

	const operatorImages = {
		Airtel: '/img/airtel.jpg',
		'9Mobile': '/img/9mobile.png',
		Glo: '/img/Glo.png',
		MTN: '/img/MTN.png',
	};

	return (
		<Segment
			className="flex flex-col xx:grid xx:grid-cols-4 gap-3"
			onChange={(val) => {
				dispatch(
					setStore({
						operatorID: val[0],
						bill: 'telco',
					})
				);
			}}
		>
			{operators?.data
				?.filter(
					(item) =>
						// item.id !== 'op_zQG65u4Ax7HyXDHyJaHCLK' &&
						// item.id !== 'op_4NJKCdevbLiZPCxdrRmmCX'
						item.name !== 'Visafone'
				)
				.map((item) => (
					<Segment.Item value={item.id} key={item.id}>
						{({ ref, active, value, onSegmentItemClick, disabled }) => {
							return (
								<SegmentItemOption
									ref={ref}
									active={active}
									disabled={disabled}
									className={classNames(
										'bg-slate-50',
										active && 'bg-sky-100 shadow-sm'
									)}
									onSegmentItemClick={onSegmentItemClick}
									variant="plain"
								>
									<div className="space-y-1 text-center">
										<Avatar
											size="lg"
											src={operatorImages[item.name]}
											icon={<HiOutlineUser />}
										/>
										<h6>{item?.name}</h6>
									</div>
								</SegmentItemOption>
							);
						}}
					</Segment.Item>
				))}
		</Segment>
	);
};
export default Operators;
