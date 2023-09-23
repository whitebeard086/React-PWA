import { Card, Image } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { calculateAverageRating } from '@/utils';
import { Rating, Star } from '@smastrom/react-rating';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ServicesCard = ({ services }) => {
	const { imagePath } = appConfig;

	// const { services } = useSelector((state) => state.home.data);

	const ratingStyles = {
		itemShapes: Star,
		activeFillColor: '#ffb700',
		inactiveFillColor: '#36454F',
	};

	return (
		<>
			<h4 className="text-lg font-bold mb-2">Popular Services</h4>

			<Swiper
				spaceBetween={30}
				loop={true}
				slidesPerView="auto"
				centeredSlides={true}
				speed={6000}
				disableOnInteraction={true}
				autoplay={{
					delay: 1,
					disableOnInteraction: true,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Autoplay]}
				className="popularServicesSwiper flex overflow-auto gap-4 w-full pb-2"
			>
				{services?.map((item) => {
					const averageRating = calculateAverageRating(item?.bookings);

					return (
						<SwiperSlide key={item.id}>
							<Link to={`/browse/profile/${item.user?.username}`}>
								<Card
									bodyClass="w-full flex items-center gap-4"
									className="min-w-[20rem] bg-primary-500"
								>
									<Card bordered bodyClass="p-0 h-32" className="p-0 w-1/2">
										<Image
											src={`${imagePath}/${item?.banner}`}
											alt={`${item?.title}`}
											wrapperClassName="rounded-lg"
											className="w-full h-full object-fit rounded-lg"
										/>
									</Card>

									<div className="w-1/2 flex flex-col gap-4">
										<div className="flex flex-col w-full">
											<h4 className="text-base font-bold text-white">
												{item?.title}
											</h4>
											<p className="font-semibold text-gray-200">
												{item?.category?.name}
											</p>
										</div>
										<div className="flex flex-col w-full">
											<h4 className="text-base font-bold text-white">
												From ₦{item?.starting_price?.toLocaleString()}
											</h4>

											<div className="flex items-center gap-1">
												<p className="font-bold text-gray-200">
													{averageRating === 0 ? null : averageRating}
												</p>
												<Rating
													readOnly
													style={{ maxWidth: 80 }}
													itemStyles={ratingStyles}
													value={averageRating}
												/>
												<p className="text-gray-200">
													({item.bookings?.length?.toLocaleString()})
												</p>
											</div>
										</div>
									</div>
								</Card>
							</Link>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</>
	);
};
export default ServicesCard;
