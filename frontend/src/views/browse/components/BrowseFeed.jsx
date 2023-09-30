import { Avatar, Card } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { Link } from 'react-router-dom';

const BrowseFeed = ({ categories }) => {
	const { imagePath } = appConfig;

	return (
		<div className="grid grid-cols-3 gap-2">
			{categories?.map((item) => (
				<Link key={item.id} to={`${item.slug}`}>
					<Card clickable bordered bodyClass="" className="bg-amber-50">
						<div className="flex flex-col gap-2 justify-center items-center">
							<Avatar
								size={65}
								shape="circle"
								src={`${imagePath}/${item.icon}`}
								className="bg-white border-2"
							/>

							<p className="font-bold text-sm sm:text-base">{item.name}</p>
							<p className="text-xs font-bold text-primary-500">
								{`${
									item.services?.length === 1
										? `${item.services?.length} Provider`
										: `${item.services?.length} Providers`
								}`}
							</p>
						</div>
					</Card>
				</Link>
			))}
		</div>
	);
};
export default BrowseFeed;
