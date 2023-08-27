import { Notification, toast } from '@/components/ui';

export const popNotification = (title, messg, type, duration = 5000) => {
	toast.push(
		<Notification title={title} type={type} duration={duration}>
			{messg}
		</Notification>,
		{
			placement: 'top-center',
		}
	);
};
