import { Dialog, Image } from '@/components/ui'
import { closeCategoryDialog, useAppDispatch, useAppSelector } from '../store'
import appConfig from '@/configs/app.config'

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

                <div className="mt-4">
                    <Image 
                        src={`${appConfig.imagePath}/${category.banner}`} 
                        alt={`${category.name} image`}
                        className='max-w-lg max-h-60'
                    />
                </div>
            </div>
        </Dialog>
    )
}
export default EditDialog