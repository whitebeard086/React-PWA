import { CategoryWithSubCategories } from '@/@types/common'
import { Avatar, Button, Card, Image } from '@/components/ui'
import appConfig from '@/configs/app.config'
import { RiEdit2Fill } from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import { setCategory, toggleCategoryDialog, useAppDispatch } from '../store'

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

    const onEdit = (category: CategoryWithSubCategories) => {
        dispatch(setCategory(category))
        dispatch(toggleCategoryDialog(true))
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
                        <div>
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
                        </div>

                        <div className='mt-4 flex items-center gap-4 justify-between'>
                            <Button
                                size='xs'
                                variant='solid'
                                icon={<RiEdit2Fill />}
                                onClick={() => onEdit(category)}
                            >
                                Edit
                            </Button>

                            <Button
                                size='xs'
                                variant='twoTone'
                                color='red-500'
                                icon={<MdDelete />}
                            >
                                Delete
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </AnimatePresence>
    )
}
export default CategoryCard