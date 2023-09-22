import { useLocation } from 'react-router-dom'
import { useGetCategory } from '../../utils/hooks'
import { Avatar, Button, Card, Image, Tooltip, Upload } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { RiImageEditFill } from 'react-icons/ri';
import UploadBanner from './UploadBanner';
import reducer, { SLICE_NAME } from '../store';
import { injectReducer } from '@/store';
import useCompressFile from '@/utils/hooks/useCompressFile';
import UploadIcon from './UploadIcon';

injectReducer(SLICE_NAME, reducer)

const Category = () => {
    const { pathname } = useLocation()
    const slug = pathname.split('/')[3];
    const { data, isLoading } = useGetCategory({ slug })
    const category = data?.category

    return (
        <div>
            <h4 className="font-base">{category?.name}</h4>
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
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default Category