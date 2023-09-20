import { Dialog } from '@/components/ui'
import { closeCategoryDialog, useAppDispatch, useAppSelector } from '../store'

const EditDialog = () => {
    const dispatch = useAppDispatch()
    const { categoryDialog, category } = useAppSelector((state) => state.categories.data)

    const onDialogClose = () => {
        dispatch(closeCategoryDialog())
    }

    return (
        <Dialog
            width='100%'
            isOpen={categoryDialog}
            scrollable={true}
            onRequestClose={onDialogClose}
            onClose={onDialogClose}
        >
            <div>
                <h4 className="text-base">{category.name}</h4>
            </div>
        </Dialog>
    )
}
export default EditDialog