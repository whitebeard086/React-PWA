import { HiOutlineGift } from 'react-icons/hi';

const Intro = () => {
	return (
		<div className="mx-auto text-center">
			<HiOutlineGift className="h-28 w-28 mx-auto stroke-green-300 stroke-1" />
			<h2 className="text-2xl px-5">Refer and Earn</h2>
			<p className="py-2 max-w-[350px] px-5 mx-auto">
				Refer your friends to our app and you&apos;ll receive a special bonus{' '}
				<span className="text-green-400">₦200</span>! Our app is a convinient
				and easy to use mobile app. Plus, with services like handyman and bill
				payments, it is the best choice for anyone looking for an easy life.
				Don&apos;y miss out on this limited time offer - start referring todat!
			</p>
		</div>
	);
};
export default Intro;
