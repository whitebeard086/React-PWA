import { SegmentItemOption } from '@/components/shared';
import { Avatar, Segment } from '@/components/ui';
import classNames from 'classnames';
import { HiOutlineUser } from 'react-icons/hi';

import { setStore, useAppDispatch } from '../store';

const Operators = ({ operators }) => {
	const dispatch = useAppDispatch();

	const operatorImages = {
		DSTV: '/img/dstv.png',
		GOTV: '/img/gotv.png',
		STARTIMES: '/img/startimes.png',
	};
	return (
		<Segment
			className="flex flex-col xx:grid xx:grid-cols-3 gap-3"
			onChange={(val) => {
				dispatch(
					setStore({
						operatorID: val[0],
						bill: 'television',
					})
				);
			}}
		>
			{operators?.data?.map((item, index) => (
				<Segment.Item value={item.id} key={item.id}>
					{({ ref, active, value, onSegmentItemClick, disabled }) => {
						return (
							<SegmentItemOption
								ref={ref}
								active={active}
								disabled={disabled}
								className={classNames('bg-slate-50', active && 'bg-sky-100')}
								onSegmentItemClick={onSegmentItemClick}
								variant="plain"
							>
								<div className="space-y-1 text-center">
									<Avatar
										//  className="bg-white"
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
