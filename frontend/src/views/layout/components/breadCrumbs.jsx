import { HiChevronLeft } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

export default function BreadCrumbs() {
	const location = useLocation();

	let currentLink = '';

	const crumbs = location.pathname
		.split('/')
		.filter((crumb) => crumb !== '')
		.map((crumb) => {
			currentLink = +`/${crumb}`;

			return (
				<div className="flex items-center" key={crumb}>
					<HiChevronLeft />
					<Link to={currentLink}>{crumb}</Link>
				</div>
			);
		});

	// console.log(location);
	return (
		<div className="max-w-[300px] py-3 px-1 flex items-center gap-2">
			{crumbs}
		</div>
	);
}
