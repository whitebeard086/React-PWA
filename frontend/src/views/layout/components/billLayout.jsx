import { Outlet } from 'react-router-dom';
import BreadCrumbs from './breadCrumbs';

const BillLayout = () => {
	return (
		<div>
			<BreadCrumbs />
			<Outlet />
		</div>
	);
};
export default BillLayout;
