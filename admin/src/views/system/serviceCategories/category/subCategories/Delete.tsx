import { useDeleteSubCategory } from '@/views/system/utils/hooks'
import { setSubCategory, toggleDeleteDialog, useAppDispatch, useAppSelector } from '../../store'
import { ConfirmDialog } from '@/components/shared'

const Delete = () => {
    const { mutate: deleteSub, isLoading} = useDeleteSubCategory()
    const dispatch = useAppDispatch()

    const { subCategory, deleteDialog } = useAppSelector((state) => state.categories.data)

    const onDialogClose = () => {
        dispatch(toggleDeleteDialog(false))
        dispatch(setSubCategory({}))
    }

    const onDelete = () => {
        deleteSub({ id: subCategory.id ?? null })
    }

    return (
        <ConfirmDialog
            isOpen={deleteDialog}
            type="danger"
            title="Delete Sub Category"
            confirmButtonColor="red-600"
            loading={isLoading}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this sub category? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}
export default Delete