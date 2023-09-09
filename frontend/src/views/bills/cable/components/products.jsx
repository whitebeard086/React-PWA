import { Loading, SegmentItemOption } from '@/components/shared';
import { Segment } from '@/components/ui';
import { popNotification } from '@/utils/toast';
import { useGetProducts } from '../../store/hooks';
import {
	SLICE_NAME,
	setProduct,
	setState,
	useAppDispatch,
	useAppSelector,
} from '../store';

const Products = () => {
	const { store } = useAppSelector((state) => state[SLICE_NAME].data);
	const { profile } = useAppSelector((state) => state.auth.user);

	const dispatch = useAppDispatch();
	const { isFetching, data } = useGetProducts(store);
	const { products } = data || {};

	// console.log('products', products);

	return (
		<Loading loading={isFetching}>
			<Segment
				className="grid grid-cols-pow gap-3"
				onChange={(val) => {
					const selected = products?.data?.find((b) => b.id === val[0]);
					if (selected?.meta?.fee > profile?.account_balance) {
						popNotification(
							'Error',
							'You do not have enough balance to complete this transaction, please top-up and try again.',
							'danger',
							5000
						);

						return;
					}
					dispatch(
						setProduct({
							productID: val[0],
							bill: 'television',
							operatorID: store?.operatorID,
							amount: Number(selected?.meta?.fee),
							package: selected?.name,
						})
					);
					dispatch(setState(1));
				}}
			>
				{products?.data?.map((item, index) => (
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
										<p>{item?.name}</p>
										<h6>₦{Number(item?.meta?.fee)?.toLocaleString()}</h6>
									</div>
								</SegmentItemOption>
							);
						}}
					</Segment.Item>
				))}
			</Segment>
		</Loading>
	);
};
export default Products;
