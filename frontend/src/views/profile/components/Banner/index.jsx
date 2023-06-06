import { Button, Card, Upload } from "components/ui"
import millify from "millify"
import { AiFillStar } from "react-icons/ai"
import { HiOutlineCloudUpload } from "react-icons/hi"
import { useSelector } from "react-redux"
import { formatNumber } from "utils"
import UploadBanner from "./UploadBanner"
import appConfig from "configs/app.config"
import { Loading } from "components/shared"

const Banner = () => {
    const { profile, gettingUser } = useSelector((state) => state.auth.user)
    const { uploading } = useSelector((state) => state.profile.data)

    const { imagePath } = appConfig

    // const startingPrice = formatNumber(profile.service?.starting_price, 2)
    const startingPrice = profile.service?.starting_price?.toLocaleString()

    return (
        <div>
            <div className="relative">
                {!profile.service?.banner && (
                    <div className="h-48 w-full bg-gray-300 rounded-2xl grid place-content-center relative">
                        <UploadBanner />
                        <img className="w-14" src="/img/gallery.png" alt="" />
                    </div>
                )}
                {profile.service?.banner && (
                    <div className="h-56 w-full bg-gray-300 rounded-2xl relative">
                        {(gettingUser || uploading) && (
                            <div className="w-full h-56 rounded-2xl bg-black/60 absolute">
                                <Loading loading={true} />
                            </div>
                        )}
                        <UploadBanner />
                        <img className="w-full rounded-2xl h-56 object-cover" src={`${imagePath}/${profile.service?.banner}`} alt={`${profile.service?.title} Banner`} />
                    </div>
                )}

                <div className="absolute w-full -bottom-10">
                    <Card bordered className="bg-black w-[80%] mx-auto">
                        <div className="flex items-center gap-4 justify-between">
                            <h4 className="text-white font-bold text-lg">
                                {profile.service?.title}
                            </h4>
                            <h5 className="text-primary-500 text-lg font-bold">
                                ₦{startingPrice}+
                            </h5>
                        </div>

                        <div className="flex items-center gap-4 justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items center">
                                    <AiFillStar className="text-amber-200 text-md" />
                                    <AiFillStar className="text-amber-200 text-md" />
                                    <AiFillStar className="text-amber-200 text-md" />
                                    <AiFillStar className="text-amber-200 text-md" />
                                    <AiFillStar className="text-amber-200 text-md" />
                                </div>
                                <p className="text-gray-300 font-semibold">5 stars</p>
                            </div>

                            <p className="text-gray-300 font-semibold">{millify(2300)} Orders</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default Banner