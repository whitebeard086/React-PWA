import { CategoryWithSubCategories } from '@/@types/common'
import { Avatar, Button, Card, Image } from '@/components/ui'
import appConfig from '@/configs/app.config'
import { AnimatePresence, motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import { setCategory, toggleCategoryWithServicesDialog, toggleDeleteDialog, useAppDispatch } from '../store'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { apiGetCategory } from '@/services/SystemService'
import { GetCategoryRequest, GetCategoryResponse } from '../../utils/types'
import { FaEye } from 'react-icons/fa'

type Props = {
    categories: CategoryWithSubCategories[]
}

type DataProps = {
    data: CategoryWithSubCategories
}

const CardHeader = ({ data }: DataProps) => (
    <div className="rounded-tl-lg rounded-tr-lg h-44 overflow-hidden relative">
        <Image 
            src={`${appConfig.imagePath}/${data.banner}`} 
            placeholderSrc='/img/blurred.jpg' 
            alt={`${data.name} image`} 
            className='h-full'
        />
        <div className='h-44 w-full bg-black/50 absolute top-0 transition duration-200 p-4'>
            <div className="w-full h-full text-white flex items-end">
                <div className='flex items-center gap-2'>
                    <Avatar 
                        shape='circle'
                        src={`${appConfig.imagePath}/${data.icon}`}
                    />
                    <p className="font-semibold">
                        {data.name}
                    </p>
                </div>
            </div>
        </div>
    </div>
)

const CategoryCard = ({ categories }: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const prefetchCategory = (category: GetCategoryRequest) => {
        queryClient.prefetchQuery({
            queryKey: ['categories', category],
            queryFn: async () => {
                const response = await apiGetCategory<GetCategoryResponse, GetCategoryRequest>(category)
                return response.data
            },
            staleTime: 60 * 1000,
        })
    }

    const onView = (category: CategoryWithSubCategories) => {
        dispatch(setCategory(category))
        navigate(`/configurations/service-categories/${category.slug}`)
    }

    const onDelete = (category: CategoryWithSubCategories) => {
        dispatch(setCategory(category))

        if (category.services.length > 0) {
            dispatch(toggleCategoryWithServicesDialog(true))
        } else {
            dispatch(toggleDeleteDialog(true))
        }
    }

    return (
        <AnimatePresence>
            {categories.map((category) => (
                <motion.div
                    key={category.id}
                    layoutId={`${category.id}`}
                    initial={{ opacity: 0, visibility: 'hidden' }}
                    animate={{ opacity: 1, visibility: 'visible' }}
                    transition={{ duration: 0.3, type: 'tween' }}
                    exit={{ opacity: 0, visibility: 'hidden' }}
                >
                    <Card
                        header={<CardHeader data={category}  />}
                        headerClass="p-0"
                    >
                        <div onMouseEnter={() => prefetchCategory({ slug: category.slug })}>
                            <div className="flex items-center gap-4 justify-between">
                                <p className='font-semibold'>
                                    Sub Categories:
                                </p>
                                <p className='font-semibold'>
                                    {category.sub_categories.length.toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 justify-between">
                                <p className='font-semibold'>
                                    Services:
                                </p>
                                <p className='font-semibold'>
                                    {category.services.length.toLocaleString()}
                                </p>
                            </div>
                            
                            <div className='mt-4 flex items-center gap-4 justify-between'>
                                <Button
                                    size='xs'
                                    variant='solid'
                                    icon={<FaEye />}
                                    onClick={() => onView(category)}
                                >
                                    View
                                </Button>

                                <Button
                                    size='xs'
                                    variant='twoTone'
                                    color='red-500'
                                    icon={<MdDelete />}
                                    onClick={() => onDelete(category)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>

                    </Card>
                </motion.div>
            ))}
        </AnimatePresence>
    )
}
export default CategoryCard