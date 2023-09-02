import { SegmentItemOption } from '@/components/shared';
import { Segment } from '@/components/ui';
import { setStore, useAppDispatch } from '../store';

const Operators = ({ operators }) => {
	const dispatch = useAppDispatch();
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
								className="bg-slate-50"
								onSegmentItemClick={onSegmentItemClick}
								variant="plain"
							>
								<div className="space-y-1 text-center">
									{/* <p className="text-xs">{item?.desc}</p> */}
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
