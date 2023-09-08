/* eslint-disable react/prop-types */
import classNames from 'classnames';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Card, Image, Notification, toast } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {
	setDeleteMessageStatus,
} from '../store/dataSlice';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
dayjs.extend(calendar);

const Messages = ({ isOwner, receiver }) => {
	const dispatch = useDispatch();
	const scroll = useRef();
	const { imagePath } = appConfig;

	// Select data from the Redux store
	const { messages, deleteMessageStatus } = useSelector(
		(state) => state.chat.data
	);
	const { profile } = useSelector((state) => state.auth.user);

	useEffect(() => {
		// Show notification when deleteMessageStatus changes
		const popNotification = () => {
			toast.push(
				<Notification
					title={`${deleteMessageStatus === 'success' ? 'Success' : 'Error'}`}
					type={`${deleteMessageStatus === 'success' ? 'success' : 'danger'}`}
					duration={3000}
				>
					{deleteMessageStatus === 'success'
						? 'Message deleted successfully!'
						: 'Looks like something went wrong, please try again.'}
				</Notification>,
				{
					placement: 'top-center',
				}
			);
		};

		if (deleteMessageStatus !== 'idle') {
			popNotification();
		}

		dispatch(setDeleteMessageStatus('idle'));
	}, [deleteMessageStatus, dispatch]);

	useEffect(() => {
		// Scroll to the last message
		scroll.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<AnimatePresence className="">
			{messages?.map((message) => {
				const owner = isOwner(message);

				return (
					<motion.div
						key={message.id}
						ref={scroll}
						initial={{ opacity: 0, visibility: 'hidden' }}
						animate={{ opacity: 1, visibility: 'visible' }}
						transition={{ duration: 0.3, type: 'tween' }}
						exit={{ opacity: 0, visibility: 'hidden' }}
						layoutId={message.id}
						className={classNames(
							'flex gap-2 items-start',
							owner ? 'justify-end' : 'justify-start'
						)}
					>
						{!owner && (
							<div>
								<Avatar
									src={`${imagePath}/${
										receiver?.service?.banner || receiver?.image
									}`}
									size="sm"
									shape="circle"
								/>
							</div>
						)}
						<div className="mb-4 max-w-[80%] w-fit">
							<Card
								className={classNames(
									'max-w-[100%] w-full',
									owner ? 'bg-primary-500 text-white' : ''
								)}
							>
								<div className="flex gap-2">
									{message.message && <p>{message.message}</p>}
									{message.file && (
										<Image src={`${imagePath}/${message.file}`} alt="" />
									)}
								</div>
							</Card>
							<div>
								<p className="text-left">
									{dayjs(message.created_at).format('DD MMM, YYYY - h:mm A')}
								</p>
							</div>
						</div>
						{owner && (
							<div>
								<Avatar
									src={`${imagePath}/${
										profile?.service?.banner || profile?.image
									}`}
									size="sm"
									shape="circle"
								/>
							</div>
						)}
					</motion.div>
				);
			})}
		</AnimatePresence>
	);
};
export default Messages;
