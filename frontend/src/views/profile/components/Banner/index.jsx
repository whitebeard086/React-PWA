import { Button, Upload } from "components/ui"
import millify from "millify"
import { AiFillStar } from "react-icons/ai"
import { HiOutlineCloudUpload } from "react-icons/hi"
import { useSelector } from "react-redux"
import { formatNumber } from "utils"

const Banner = () => {
    const { profile } = useSelector((state) => state.auth.user)

    // const startingPrice = formatNumber(profile.service?.starting_price, 2)
    const startingPrice = profile.service?.starting_price.toLocaleString()

    return (
        <div>
            <div className="relative">
                <div className="h-48 w-full bg-gray-300 rounded-2xl grid place-content-center relative">
                    <Upload className="absolute top-4 left-4">
                        <Button size="xs" variant="solid" icon={<HiOutlineCloudUpload />}>
                            Upload
                        </Button>
                    </Upload>
                    <img className="w-14" src="/img/gallery.png" alt="" />
                </div>

                <div className="absolute w-full -bottom-10">
                    <div className="bg-black rounded-2xl p-4 w-[80vw] mx-auto">
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
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner