import { Button, Card, Image } from "@/components/ui";
import appConfig from "@/configs/app.config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { calculateAverageRating } from "@/utils";
import { Rating, Star } from "@smastrom/react-rating";

const RecentBookings = () => {
    const { imagePath } = appConfig;

    const { bookings } = useSelector((state) => state.home.data);

    const ratingStyles = {
        itemShapes: Star,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#36454F'
    }

    return (
        <>
            <h4 className="text-lg font-bold mb-2">
                Recently Ordered Services
            </h4>

            {bookings?.length < 1 ? (
                <div className="min-h-[10rem] flex justify-center items-center flex-col gap-1">
                    <p className="text-lg text-gray-400 font-semibold">
                        You have not ordered any services yet
                    </p>
                    <Link to="/browse">
                        <Button size="xs" variant="solid">
                            Browse Services
                        </Button>
                    </Link>
                </div>
            ) : (
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
                    className="recentServicesSwiper flex overflow-auto gap-4 w-full pb-2"
                >
                    {bookings?.map((item) => {
                        const averageRating = calculateAverageRating(item.service?.bookings);

                        return (
                            <SwiperSlide key={item.id}>
                                <Link
                                    to={`/browse/profile/${item.service?.user?.username}`}
                                >
                                    <Card
                                        bodyClass="w-full flex items-center gap-4"
                                        className="min-w-[20rem] bg-primary-500"
                                    >
                                        <Card
                                            bordered
                                            bodyClass="p-0 h-32"
                                            className="p-0 w-1/2"
                                        >
                                            <Image
                                                src={`${imagePath}/${item.service?.banner}`}
                                                alt={`${item.service?.title}`}
                                                wrapperClassName="rounded-lg"
                                                className="w-full h-full object-fit rounded-lg"
                                            />
                                        </Card>

                                        <div className="w-1/2 flex flex-col gap-4">
                                            <div className="flex flex-col w-full">
                                                <h4 className="text-base font-bold text-white">
                                                    {item.service?.title}
                                                </h4>
                                                <p className="font-semibold text-gray-200">
                                                    {item.service?.category?.name}
                                                </p>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <h4 className="text-base font-bold text-white">
                                                    From ₦
                                                    {item.service?.starting_price?.toLocaleString()}
                                                </h4>

                                                <div className="flex items-center gap-1">
                                                    <p className="font-bold text-gray-200">{averageRating === 0 ? null : averageRating}</p>
                                                    <Rating readOnly style={{ maxWidth: 80 }} itemStyles={ratingStyles} value={averageRating} />
                                                    <p className="text-gray-200">({item.service?.bookings?.length?.toLocaleString()})</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )}
        </>
    );
};
export default RecentBookings;
