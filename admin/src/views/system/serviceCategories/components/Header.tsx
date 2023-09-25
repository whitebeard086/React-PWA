import { Button } from '@/components/ui'
import { MdPostAdd } from 'react-icons/md'
import { toggleCategoryDialog, useAppDispatch } from '../store'

const Header = () => {
    const dispatch = useAppDispatch()

    const onNewCategory = () => {
        dispatch(toggleCategoryDialog(true))
    }

    return (
        <div className="flex items-center gap-4 justify-between flex-wrap mb-4 mt-6">
            <h4 className="">Service Categories</h4>
            <Button
                variant='solid'
                size='sm'
                color='slate-900'
                icon={<MdPostAdd />}
                onClick={onNewCategory}
            >
                New Category
            </Button>
        </div>
    )
}
export default Header