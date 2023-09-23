import { Button } from '@/components/ui'
import { BiEditAlt } from 'react-icons/bi'
import { setEditCategory, useAppDispatch, useAppSelector } from '../store'
import { AnimatePresence, motion } from 'framer-motion'
import { CategoryWithSubCategories } from '@/@types/common'
import EditName from './EditName'

type Props = {
    category: Partial<CategoryWithSubCategories>
    slug: string
}

const CategoryName = ({ slug, category }: Props) => {
    const dispatch = useAppDispatch()

    const { editCategory } = useAppSelector((state) => state.categories.data)

    const onEditCategory = () => {
        dispatch(setEditCategory(true))
    }

    return (
        <AnimatePresence>
            {editCategory ? (
                <motion.div
                    layoutId='editing'
                    initial={{ opacity: 0, visibility: 'hidden' }}
                    animate={{ opacity: 1, visibility: 'visible' }}
                    transition={{ duration: 0.2, type: 'tween' }}
                    exit={{ opacity: 0, visibility: 'hidden' }}
                >
                    <div className="flex items center gap-2 flex-wrap">
                        <h4 className="text-base">
                            Category Name: 
                        </h4>
                        <EditName 
                            category={category}
                            slug={slug}
                        />
                    </div>
                </motion.div>
            ):(
                <motion.div
                    layoutId='initial'
                    initial={{ opacity: 0, visibility: 'hidden' }}
                    animate={{ opacity: 1, visibility: 'visible' }}
                    transition={{ duration: 0.2, type: 'tween' }}
                    exit={{ opacity: 0, visibility: 'hidden' }}
                    className='flex items-center gap-2'
                >
                    <h4 className="text-base">
                        Category Name: <span className='font-semibold'>{category?.name}</span> 
                    </h4>
                    <Button 
                        size='xs'
                        variant='twoTone'
                        icon={<BiEditAlt />}
                        onClick={onEditCategory}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
export default CategoryName