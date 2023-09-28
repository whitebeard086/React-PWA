import { HiOutlineGift } from 'react-icons/hi';
import { SLICE_NAME, useAppSelector } from '../store';
import ReactHtmlParser from 'html-react-parser'

const Intro = () => {
	const { systemConfig } = useAppSelector((state) => state[SLICE_NAME].data);
	const { data } = systemConfig
	console.log(data);
	return (
		<div className="mx-auto text-center">
			<HiOutlineGift className="h-28 w-28 mx-auto stroke-green-300 stroke-1" />
			<h2 className="text-2xl px-5">Refer and Earn</h2>
			<p className="py-2 max-w-[350px] px-5 mx-auto">
				{ReactHtmlParser(data?.referral_pitch ?? 'Loading...')}
			</p>
		</div>
	);
};
export default Intro;
