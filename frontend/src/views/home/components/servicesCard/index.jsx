import { Card, Image } from "@/components/ui";
import appConfig from "@/configs/app.config";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ServicesCard = () => {
    const { imagePath } = appConfig;

    const { services } = useSelector((state) => state.home.data);

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
                {services?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link to={`/browse/profile/${item.user?.username}`}>
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
                                            From ₦
                                            {item?.starting_price?.toLocaleString()}
                                        </h4>

                                        <div className="flex items-center gap-2">
                                            <div className="flex items center">
                                                <AiFillStar className="text-amber-200 text-md" />
                                                <AiFillStar className="text-amber-200 text-md" />
                                                <AiFillStar className="text-amber-200 text-md" />
                                                <AiFillStar className="text-amber-200 text-md" />
                                                <AiFillStar className="text-amber-200 text-md" />
                                            </div>
                                            {/* <p className="text-gray-200 font-semibold">
                                                5 stars
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
export default ServicesCard;
