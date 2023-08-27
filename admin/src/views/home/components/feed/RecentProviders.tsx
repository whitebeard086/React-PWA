import { Avatar, Card } from "@/components/ui";
import acronym from "@/utils/acronym";
import { calculateAverageRating } from "@/utils/getTaskitlyData";
import useTwColorByName from "@/utils/hooks/useTwColorByName";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import appConfig from "@/configs/app.config";

const RecentProviders = () => {
    const { imagePath } = appConfig
    const color = useTwColorByName()
    const { recentProviders } = useAppSelector((state) => state.home.data)

    return (
        <Card>
            <div className="flex items-center gap-4 justify-between">
                <h4 className="text-base">Recent Providers</h4>
                <Link to="/users/providers" className="text-sm text-blue-500 hover:text-blue-600 transition duration-300 underline cursor-pointer">
                    View All
                </Link>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {recentProviders?.map((item) => {
                    const name = `${item.first_name} ${item.last_name}`
                    const averageRating = calculateAverageRating(item.service?.bookings);
                    return (
                        <div key={item.id} className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                {!item.image && (
                                    <Avatar shape="circle" className={`${color(name)}`}>
                                        {acronym(name)}
                                    </Avatar>
                                )}
                                {item.image && (
                                    <Avatar 
                                        shape="circle"
                                        src={item?.image ? `${imagePath}/${item?.image}` : ""}
                                    />
                                )}
                            </div>

                            <div className="w-full flex flex-col gap-0">
                                <p className="text-base">
                                    {item.service.title && item.service.title}
                                    {!item.service.title && `${item.last_name} ${item.first_name}`}
                                </p>
                                <p className="text-xs font-semibold flex items-center gap-2">
                                    {averageRating}
                                    <Rating readOnly style={{ maxWidth: 60 }} value={averageRating} />
                                    <span>({item.service?.bookings?.length?.toLocaleString()})</span>
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
export default RecentProviders