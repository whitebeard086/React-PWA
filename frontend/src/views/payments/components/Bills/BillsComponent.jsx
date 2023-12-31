import { Badge, Card } from '@/components/ui';
import { BiCameraMovie, BiUserVoice } from 'react-icons/bi';
import {
	MdMobiledataOff,
	MdOutlineElectricalServices,
	MdOutlineFlightTakeoff,
	MdOutlineGames,
	MdOutlineHotel,
	MdOutlineSignalCellularConnectedNoInternet0Bar,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

const BillsComponent = () => {
	return (
		<div className="col-span-4 w-full mt-4">
			<Card bordered className="bg-black">
				<div>
					<h4 className="text-lg font-bold mb-4 text-white">Bill Payments</h4>

					<div className="grid grid-cols-4 gap-4">
						<Link
							to="/bills/airtime"
							className="flex cursor-pointer flex-col justify-center items-center"
						>
							<Card className="flex justify-center items-center w-full">
								<BiUserVoice className="text-3xl" />
							</Card>
							<p className="text-base font-semibold text-gray-200">Airtime</p>
						</Link>
						<Link
							to="/bills/data"
							className="flex cursor-pointer flex-col justify-center items-center"
						>
							<Card className="flex justify-center items-center w-full">
								<MdMobiledataOff className="text-3xl" />
							</Card>
							<p className="text-base font-bold text-gray-200">Data</p>
						</Link>
						<Link
							to="/bills/disco"
							className="flex cursor-pointer flex-col justify-center items-center"
						>
							<Card className="flex justify-center items-center w-full">
								<MdOutlineElectricalServices className="text-3xl" />
							</Card>
							<p className="text-base font-bold text-gray-200">Electricity</p>
						</Link>
						<Link
							to="/bills/cable"
							className="flex cursor-pointer flex-col justify-center items-center"
						>
							<Card className="flex justify-center items-center w-full">
								<BiCameraMovie className="text-3xl" />
							</Card>
							<p className="text-base font-bold text-gray-200">Television</p>
						</Link>
						<div className="flex cursor-pointer flex-col justify-center items-center">
							<Card className="flex justify-center items-center w-full relative">
								<Badge
									content={'Coming soon'}
									innerClass="bg-emerald-500 absolute top-0 rounded-md w-max left-0"
								/>
								<MdOutlineGames className="text-3xl" />
							</Card>
							<p className="text-base font-bold text-gray-200">Betting</p>
						</div>
						<div className="flex cursor-pointer flex-col justify-center items-center">
							<Card className="flex justify-center items-center w-full relative">
								<Badge
									content={'Coming soon'}
									innerClass="bg-emerald-500 absolute top-0 rounded-md w-max left-0"
								/>
								<MdOutlineSignalCellularConnectedNoInternet0Bar className="text-3xl" />
							</Card>
							<p className="text-base font-bold text-gray-200">Internet</p>
						</div>
						<div className="flex cursor-pointer flex-col justify-center items-center">
							<Card className="flex justify-center items-center w-full relative">
								<Badge
									content={'Coming soon'}
									innerClass="bg-emerald-500 absolute top-0 rounded-md w-max left-0"
								/>
								<MdOutlineHotel className="text-3xl" />
							</Card>
							<p className="text-base font-bold text-gray-200">Hotels</p>
						</div>
						<div className="flex cursor-pointer flex-col justify-center items-center">
							<Card className="flex justify-center items-center w-full relative">
								<Badge
									content={'Coming soon'}
									innerClass="bg-emerald-500 absolute top-0 rounded-md w-max left-0"
								/>
								<MdOutlineFlightTakeoff className="text-3xl" />
							</Card>
							<p className="text-base font-bold text-gray-200">Flights</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};
export default BillsComponent;
