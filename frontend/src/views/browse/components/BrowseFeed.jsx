import { Avatar, Card } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { useBrowse } from '@/services/features/browseApi';
import { Link } from 'react-router-dom';

const BrowseFeed = () => {
	const { imagePath } = appConfig;

	const { categories } = useBrowse();

	// const { categories } = useSelector((state) => state.browse.data);
	// console.log('Cats: ', categories);

	return (
		<div className="flex flex-col gap-4">
			{categories?.map((item) => (
				<Link key={item.id} to={`${item.slug}`}>
					<Card bodyClass="w-full">
						<div className="flex gap-4 justify-between">
							<div className="flex flex-col gap-4">
								<Avatar
									size={65}
									shape="circle"
									src={`${imagePath}/${item.icon}`}
									className="bg-amber-50"
								/>

								<h4 className="font-bold text-lg text-gray-600">{item.name}</h4>
							</div>
							<p className="text-lg font-bold text-primary-500">
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
