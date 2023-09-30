import { EllipsisButton, TextEllipsis } from '@/components/shared';
import { Avatar, Card, Dropdown } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { useRequest } from '@/services/features/requestApi';
import { useUser } from '@/services/features/userApi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Enquiries = () => {
	const { imagePath } = appConfig;
	const { isLoading, chats } = useRequest();
	const { user: profile } = useUser();

	// const { enquiries } = useSelector((state) => state.requests.data);
	// const { profile } = useSelector((state) => state.auth.user);

	// const chats = enquiries?.filter((item) => item?.messages?.length > 0);

	return (
		<div className="mt-4 mb-4">
			{chats?.length < 1 ? (
				<div className="min-h-[20vh] flex flex-col justify-center">
					<p className="text-center text-gray-400 font-bold text-2xl">
						No enquiries, <br /> check back later...
					</p>
				</div>
			) : (
				<div>
					{!isLoading &&
						chats?.map((enquiry) => {
							const receiver =
								profile?.id === enquiry?.receiver?.id
									? enquiry?.user
									: enquiry?.receiver;

							return (
								<Link
									key={enquiry.id}
									to={`/chat/${receiver?.slug}`}
									state={{ chat: enquiry.id }}
								>
									<Card className="rounded-none">
										<div className="w-full flex items-center justify-between">
											<div className="w-full flex gap-4 items-center">
												<div>
													<Avatar
														size="lg"
														shape="circle"
														src={`${imagePath}/${
															receiver.service?.banner || receiver?.image
														}`}
														icon={<HiOutlineUser />}
													/>
												</div>

												<div className="mt-2 flex flex-col justify-center w-full">
													<h4 className="text-base">
														{receiver.service?.title || receiver.username}
													</h4>
													<p className="text-gray-500 font-semibold">
														<TextEllipsis
															text={enquiry.messages[
																enquiry.messages?.length - 1
															]?.message?.replace(/<[^>]*>?/gm, '')}
															maxTextCount={60}
														/>
														{/* {enquiry.messages[enquiry.messages?.length - 1]?.message} */}
													</p>
												</div>
											</div>

											<Dropdown
												customToggleClass="flex"
												placement="top-end"
												renderTitle={
													<EllipsisButton
														icon={
															<BsThreeDotsVertical className="text-xl text-gray-600" />
														}
														variant="twoTone"
														shape="round"
													/>
												}
											></Dropdown>
										</div>
									</Card>
								</Link>
							);
						})}
				</div>
			)}
		</div>
	);
};
export default Enquiries;
