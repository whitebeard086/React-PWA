import { useLocation } from 'react-router-dom'
import { useGetCategory } from '../../utils/hooks'
import { Avatar, Card, Image } from '@/components/ui';
import appConfig from '@/configs/app.config';
import UploadBanner from './UploadBanner';
import reducer, { SLICE_NAME } from '../store';
import { injectReducer } from '@/store';
import UploadIcon from './UploadIcon';
import CategoryName from './CategoryName';
import SubCategories from './subCategories';
import Services from './services';
import GettingCategory from './GettingCategory';

injectReducer(SLICE_NAME, reducer)

const Category = () => {
    const { pathname } = useLocation()
    const slug = pathname.split('/')[3];
    const { data, isLoading } = useGetCategory({ slug })
    const category = data?.category

    return (
        <div>
            {isLoading ? (
                <GettingCategory />
            ):(
                <>
                    <h4 className="mb-4">{category?.name} Category</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            <Card>
                                <Card
                                    bodyClass='p-0 h-full'
                                    className='h-48 lg:h-60 xl:h-[22rem] relative'
                                >
                                    <Image 
                                        src={`${appConfig.imagePath}/${category?.banner}`}
                                        alt={`${category?.name} banner`}
                                        className='h-full w-full rounded-lg'
                                    />
                                    <div className="absolute h-full w-full bg-black/50 rounded-lg top-0 transition duration-200 p-4">
                                        <div className='flex flex-col justify-between h-full'>
                                            <div className='flex justify-end'>
                                                <UploadBanner 
                                                    slug={category?.slug ?? ''} 
                                                />
                                            </div>

                                            <div>
                                                <div className="relative w-fit h-fit">
                                                    <Avatar 
                                                        shape='circle'
                                                        className='w-20 h-20'
                                                        src={`${appConfig.imagePath}/${category?.icon}`}
                                                    />

                                                    <div className="absolute bg-black/50 w-20 h-20 rounded-full top-0">
                                                        <UploadIcon 
                                                            slug={category?.slug ?? ''} 
                                                        />
                                                    </div>
                                                </div>
                                                <p className="text-white font-semibold">Category Icon</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <div className="mt-6">
                                    <CategoryName 
                                        category={category ?? {}}
                                        slug={category?.slug ?? ''}
                                    />
                                </div>
                            </Card>

                            <Card className='mt-4'>
                                <SubCategories 
                                    category={category ?? {}}
                                />
                            </Card>
                        </div>
                        <div className="lg:col-span-1 h-full">
                            <Card>
                                <Services 
                                    category={category ?? {}}
                                />
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default Category