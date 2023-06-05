import { Card, Image, Radio } from "components/ui"
import appConfig from "configs/app.config"
import { useState } from "react"
import { Suspense } from "react"
import { AiFillStar } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Services = () => {
    const { imagePath } = appConfig
    const [value, setValue] = useState('All')

    const onChange = (val) => {
        setValue(val)
    }

    const { category, services } = useSelector((state) => state.browse.data)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 justify-between">
                <h4 className="font-bold text-lg">{category?.name}</h4>
                <p className="font-semibold text-base text-primary-500">({services?.length === 1 ? `${services?.length} Provider` : `${services?.length} Providers`})</p>
            </div>

            <Card bordered bodyClass="p-0">
                <Image 
                    src={`${imagePath}/${category?.banner}`} 
                    alt={`${category?.name}`}
                    className="rounded-lg h-52 w-full object-cover"
                />
            </Card>

            <div className="flex items-center">
                <Radio.Group className="w-full flex items-center justify-between" value={value} onChange={onChange}>
                    <Radio customLabelClass="font-bold text-base" value={'All'}>All</Radio>
                    <Radio customLabelClass="font-bold text-base" value={'Online Now'}>Online Now</Radio>
                    <Radio customLabelClass="font-bold text-base" value={'Online 24hrs ago'}>Online 24hrs ago</Radio>
                </Radio.Group>
            </div>

            {services.length < 1 ? (
                <div className="min-h-[15rem] flex justify-center items-center">
                    <p className="text-center text-lg font-bold text-gray-400">
                        No service providers available,<br /> please check back later.
                    </p>
                </div>
            ):(
                <div className="flex flex-col gap-4">
                    {services?.map((item) => (
                        <Link key={item.id} to={`/profile/${item.user?.slug}`}>
                            <Card>
                                <div className="flex gap-4 justify-between">
                                    <div className="flex items-center gap-4 w-3/4">
                                        <div className="w-full">
                                            <Image 
                                                src={`${imagePath}/${item.user?.image}`}
                                                alt={`${item.user.username}`}
                                                wrapperClassName="rounded-lg" 
                                                className="rounded-lg h-48 w-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h4 className="font-bold text-lg text-gray-800 mb-4">
                                                {item.title}
                                            </h4>
                                            <h4 className="font-bold text-base">
                                                From <span className="text-lg text-primary-500">₦{item.starting_price.toLocaleString()}</span>
                                            </h4>

                                            <div className="flex items-center gap-2">
                                                <div className="flex items center">
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                </div>
                                                <p className="text-gray-500 font-semibold">5 stars</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="font-semibold text-base text-primary-500">
                                        1.2km
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Services