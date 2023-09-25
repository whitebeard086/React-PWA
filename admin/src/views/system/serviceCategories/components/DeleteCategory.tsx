import { ConfirmDialog } from '@/components/shared'
import { setCategory, toggleDeleteDialog, useAppDispatch, useAppSelector } from '../store'
import { useDeleteCategory } from '../../utils/hooks'


const DeleteCategory = () => {
    const { mutate: deleteCategory, isLoading } = useDeleteCategory()
    const dispatch = useAppDispatch()

    const { category, deleteDialog } = useAppSelector((state) => state.categories.data)

    const onDialogClose = () => {
        dispatch(toggleDeleteDialog(false))
        dispatch(setCategory({}))
    }

    const onDelete = () => {
        deleteCategory({ slug: category.slug ?? '' })
    }

    return (
        <ConfirmDialog
            isOpen={deleteDialog}
            type="danger"
            title="Delete Category"
            confirmButtonColor="red-600"
            loading={isLoading}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this category? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}
export default DeleteCategory