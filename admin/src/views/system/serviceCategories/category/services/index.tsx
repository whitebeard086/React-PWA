import { CategoryWithSubCategories } from '@/@types/common'
import { Avatar } from '@/components/ui'
import appConfig from '@/configs/app.config'
import acronym from '@/utils/acronym'
import useThemeClass from '@/utils/hooks/useThemeClass'
import useTwColorByName from '@/utils/hooks/useTwColorByName'
import { Link } from 'react-router-dom'

type Props = {
    category: Partial<CategoryWithSubCategories>
}

const Services = ({ category }: Props) => {
    const { imagePath } = appConfig
    const { textTheme } = useThemeClass()
    const color = useTwColorByName()

    return (
        <div>
            <h4 className="text-base mb-4">Services</h4>

            {category.services?.length === 0 && (
                <div className="min-h-[15vh] grid place-content-center">
                    <p className="text-xl font-bold text-center">
                        No Services <br /> Use This Category Yet
                    </p>
                </div>
            )}

            {category.services && category.services.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                    {category.services.map((service) => (
                        <div key={service.id} className="w-full flex  items-center gap-4">
                            <div className="w-fit">
                                {!service.banner && (
                                    <Avatar shape="circle" className={`${color(service.title)}`}>
                                        {acronym(service.title)}
                                    </Avatar>
                                )}
                                {service.banner && (
                                    <Avatar 
                                        shape='circle'
                                        src={`${imagePath}/${service.banner}`}
                                    />
                                )}
                            </div>

                            <div className="w-full flex flex-col gap-0">
                                <Link
                                    to={`/services/${service.uid}`}
                                    className='w-fit'
                                >
                                    <p className={`hover:${textTheme} font-semibold w-fit`}>
                                        {service.title}
                                    </p>
                                </Link>
                                <p className="text-xs font-semibold flex items-center gap-2">
                                    {service.sub_category.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Services