import { Avatar, Card, Skeleton } from '@/components/ui';
import { HiOutlineUser } from 'react-icons/hi';

const GettingDashboardData = () => {
	return (
		<div>
			<h4>Active Bookings</h4>

			<div className="mt-4 mb-4 flex gap-4 overflow-auto pb-4">
				<Card
					className="min-w-[18rem] w-80"
					bodyClass="flex w-full flex-col justify-center items-center"
				>
					<div className="w-full flex items-center gap-4">
						<div className="w-1/2 flex flex-col items-center">
							<Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

							<div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
								<Skeleton width="80%" />
								<Skeleton width="100%" />
							</div>
						</div>

						<Skeleton width="50%" height="30px" />
					</div>
				</Card>
				<Card
					className="min-w-[18rem] w-80"
					bodyClass="flex w-full flex-col justify-center items-center"
				>
					<div className="w-full flex items-center gap-4">
						<div className="w-1/2 flex flex-col items-center">
							<Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

							<div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
								<Skeleton width="80%" />
								<Skeleton width="100%" />
							</div>
						</div>

						<Skeleton width="50%" height="30px" />
					</div>
				</Card>
				<Card
					className="min-w-[18rem] w-80"
					bodyClass="flex w-full flex-col justify-center items-center"
				>
					<div className="w-full flex items-center gap-4">
						<div className="w-1/2 flex flex-col items-center">
							<Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

							<div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
								<Skeleton width="80%" />
								<Skeleton width="100%" />
							</div>
						</div>

						<Skeleton width="50%" height="30px" />
					</div>
				</Card>
			</div>

			<h4>Unanswered Request Chats</h4>

			<div className="mt-4 mb-4 flex gap-4 overflow-auto pb-4">
				<Card
					className="min-w-[10rem] w-40"
					bodyClass="flex w-full flex-col justify-center items-center"
				>
					<Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

					<div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
						<Skeleton width="80%" />
						<Skeleton width="100%" />
					</div>
				</Card>
				<Card
					className="min-w-[10rem] w-40"
					bodyClass="flex w-full flex-col justify-center items-center"
				>
					<Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

					<div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
						<Skeleton width="80%" />
						<Skeleton width="100%" />
					</div>
				</Card>
				<Card
					className="min-w-[10rem] w-40"
					bodyClass="flex w-full flex-col justify-center items-center"
				>
					<Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

					<div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
						<Skeleton width="80%" />
						<Skeleton width="100%" />
					</div>
				</Card>
				<Card
					className="min-w-[10rem] w-40"
					bodyClass="flex w-full flex-col justify-center items-center"
				>
					<Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

					<div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
						<Skeleton width="80%" />
						<Skeleton width="100%" />
					</div>
				</Card>
			</div>

			<div className="mt-4 mb-4 w-full flex items-center gap-4 overflow-auto pb-4">
				<Card className="w-1/2 min-w-[18rem] h-40" bodyClass="h-full">
					<div className="w-full h-full flex flex-col gap-4 justify-center items-center">
						<h4>All Profile Views</h4>
						<Skeleton width="30%" height="15px" />
					</div>
				</Card>
				<Card className="w-1/2 min-w-[18rem] h-40" bodyClass="h-full">
					<div className="w-full h-full flex flex-col gap-4 justify-center items-center">
						<h4>All Service Requests</h4>
						<Skeleton width="30%" height="15px" />
					</div>
				</Card>
			</div>

			{/* <div className="col-span-4 w-full mt-4">
                <Card className="bg-black">
                    <div>
                        <h4 className="text-lg font-bold mb-2 text-white">
                            Bill Payments
                        </h4>

                        <div className="grid grid-cols-4 gap-4">
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                        </div>
                    </div>
                </Card>
            </div> */}
		</div>
	);
};
export default GettingDashboardData;
