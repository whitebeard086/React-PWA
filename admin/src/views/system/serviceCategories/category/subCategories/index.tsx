import { CategoryWithSubCategories } from '@/@types/common'
import { Button, Card } from '@/components/ui'
import { AnimatePresence, motion } from 'framer-motion'
import { BiEditAlt } from 'react-icons/bi'
import { MdDeleteOutline, MdPostAdd } from 'react-icons/md'
import { setEditSubCategory, setNewSubCategory, useAppDispatch, useAppSelector } from '../../store'
import EditName from './EditName'
import NewSubCategory from './NewSubCategory'

type Props = {
    category: Partial<CategoryWithSubCategories>
}

const SubCategories = ({ category }: Props) => {
    const dispatch = useAppDispatch()
    const { editSubCategory, newSubCategory } = useAppSelector((state) => state.categories.data)

    const onEdit = (subCat: number) => {
        dispatch(setEditSubCategory(subCat))
    }

    const onAddNew = () => {
        dispatch(setNewSubCategory(true))
    }

    return (
        <div>
            <h4 className="text-base mb-4">Sub Categories</h4>

            {category.sub_categories?.length === 0 && (
                <AnimatePresence>
                    <motion.div
                        layoutId={`empty-sub-categories`}
                        initial={{ opacity: 0, visibility: 'hidden' }}
                        animate={{ opacity: 1, visibility: 'visible' }}
                        transition={{ duration: 0.3, type: 'tween' }}
                        exit={{ opacity: 0, visibility: 'hidden' }}
                    >
                        <p className="text-xl font-bold text-center mb-4">
                            No Sub Categories <br />
                            Click The Button Below to Add Some
                        </p>
                    </motion.div>
                </AnimatePresence>
            )}

            <div className="flex flex-col gap-2">
                <AnimatePresence>
                    {category?.sub_categories?.map((item) =>
                        editSubCategory === item.id ? (
                            <EditName
                                key={item.id}
                                slug={item.slug}
                                subCategory={item}
                            />
                        ) : (
                            <motion.div
                                key={item.id}
                                layoutId={`${item.id}`}
                                initial={{ opacity: 0, visibility: 'hidden' }}
                                animate={{ opacity: 1, visibility: 'visible' }}
                                transition={{ duration: 0.3, type: 'tween' }}
                                exit={{ opacity: 0, visibility: 'hidden' }}
                            >
                                <Card bordered>
                                    <div className="flex items-center gap-4 justify-between flex-wrap">
                                        <div className="flex flex-col">
                                            <h4 className="text-base">
                                                {item.name}
                                            </h4>
                                            <p className="text-base">
                                                {item.services.length.toLocaleString()}{' '}
                                                {item.services.length === 1
                                                    ? 'Service'
                                                    : 'Services'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="slate-900"
                                                icon={<BiEditAlt />}
                                                onClick={() => onEdit(item.id)}
                                            />
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="red-500"
                                                icon={<MdDeleteOutline />}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    )}

                    {newSubCategory && (
                        <div className="">
                            <NewSubCategory 
                                slug={category.slug ?? ''}
                            />
                        </div>
                    )}

                    {!newSubCategory && (
                        <Button
                            block
                            size="sm"
                            variant="twoTone"
                            icon={<MdPostAdd />}
                            onClick={onAddNew}
                        >
                            New SubCategory
                        </Button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
export default SubCategories
