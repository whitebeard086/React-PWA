import { Dialog } from '@/components/ui'
import { closeCategoryDialog, useAppDispatch, useAppSelector } from '../store'
import CategoryForm from './CategoryForm'

const NewDialog = () => {
    const dispatch = useAppDispatch()
    const { categoryDialog } = useAppSelector((state) => state.categories.data)

    const onDialogClose = () => {
        dispatch(closeCategoryDialog())
    }

    return (
        <Dialog
            // width='100%'
            isOpen={categoryDialog}
            scrollable={true}
            onRequestClose={onDialogClose}
            onClose={onDialogClose}
        >
            <div>
                <h4 className="text-base mb-4">Add a New Service Category</h4>

                <CategoryForm />
            </div>
        </Dialog>
    )
}
export default NewDialog