import { Skeleton } from '@/components/ui';

const GettingSingle = () => {
	return (
		<div className="mt-4 grid gap-5">
			<div className="flex flex-col items-center gap-2">
				<Skeleton variant="circle" height="6rem" width="6rem" />
				<Skeleton height="1rem" width="16%" />
				<Skeleton height="1rem" width="24%" />
			</div>
			<div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
				<div className="flex gap-3 justify-between items-center">
					<Skeleton height="1rem" width="16%" />
					<Skeleton height="1rem" width="10%" />
				</div>
				<div className="flex gap-3 justify-between items-center">
					<Skeleton height="1rem" width="18%" />
					<Skeleton height="1rem" width="30%" />
				</div>
				<div className="flex gap-3 justify-between items-center">
					<Skeleton height="1rem" width="16%" />
					<Skeleton height="1rem" width="40%" />
				</div>
				<div className="flex gap-3 justify-between items-center">
					<Skeleton height="1rem" width="20%" />
					<Skeleton height="1rem" width="70%" />
				</div>
				<div className="flex gap-3 justify-between items-center">
					<Skeleton height="1rem" width="14%" />
					<Skeleton height="1rem" width="50%" />
				</div>
			</div>
		</div>
	);
};
export default GettingSingle;
