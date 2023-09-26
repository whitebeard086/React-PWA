import { SubCategory } from '@/@types/common'
import { Field, Formik, Form, FieldProps } from 'formik'
import * as Yup from 'yup'
import { Avatar, Button, Dialog, FormContainer, FormItem, Select } from '@/components/ui'
import { HiOutlineExclamation } from 'react-icons/hi'
import { useDeleteSubCategory } from '@/views/system/utils/hooks'
import { setSubCategory, toggleSubWithServicesDialog, useAppDispatch, useAppSelector } from '../../store'

type Props = {
    subCategories: SubCategory[]
}

type FormFields = {
    subCategory: number | null
}

const DeleteWithServices = ({ subCategories }: Props) => {
    const { mutate: deleteSub, isLoading } = useDeleteSubCategory()
    const dispatch = useAppDispatch()
    const { subCategory, subWithServicesDialog } = useAppSelector((state) => state.categories.data)

    const onDialogClose = () => {
        dispatch(toggleSubWithServicesDialog(false))
        dispatch(setSubCategory({}))
    }

    const handleSubmit = (values: FormFields) => {
        deleteSub({ id: subCategory.id ?? null, sid: values.subCategory })
    }

    const validationSchema = Yup.object().shape({
        subCategory: Yup.string().required('Select a Sub Category'),
    })

    // const subCategoryOptions = subCategories?.map(item => {
    //     return { label: item.name, value: item.id }
    // })
    const subCategoryOptions = subCategories?.filter(item => item.id !== subCategory.id).map(item => (
        { label: item.name, value: item.id }
    ))

    const initialData: FormFields = {
        subCategory: null,
    }

    return (
        <Dialog
            isOpen={subWithServicesDialog}
            scrollable={true}
            contentClassName="pb-0 px-0"
            onRequestClose={onDialogClose}
            onClose={onDialogClose}
        >
            <Formik
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ touched, errors, values }) => {
                    
                    return (
                        <Form>
                            <FormContainer>
                            <div className="px-6 pb-0 pt-2 flex">
                                <Avatar
                                    className="text-red-600 bg-red-100 dark:text-red-100"
                                    shape="circle"
                                >
                                    <span className="text-2xl">
                                        <HiOutlineExclamation />
                                    </span>
                                </Avatar>
                                <div className='ml-4'>
                                    <h5 className="mb-2">
                                        Delete Sub Category
                                    </h5>
                                    <p className='mb-4'>
                                        This sub category has service(s), chose a sub category below to move the service(s) to before you continue.
                                    </p>
                                    <div className="mt-2">

                                        <FormItem
                                            label="Sub Category"
                                            invalid={
                                                (errors.subCategory && touched.subCategory) as boolean
                                            }
                                            errorMessage={errors.subCategory}
                                        >
                                            <Field name="subCategory">
                                                {({ field, form }: FieldProps) => (
                                                    <Select
                                                        field={field}
                                                        form={form}
                                                        options={subCategoryOptions}
                                                        value={subCategoryOptions.filter((category) => category.value === values.subCategory)}
                                                        onChange={(option) => {
                                                            form.setFieldValue(field.name, option?.value)
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                                <Button
                                    size="sm"
                                    type='button'
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={onDialogClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    type='submit'
                                    variant="solid"
                                    color='red-600'
                                    loading={isLoading}
                                    // disabled={!values.category || !values.subCategory}
                                >
                                    Confirm
                                </Button>
                            </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </Dialog>
    )
}
export default DeleteWithServices