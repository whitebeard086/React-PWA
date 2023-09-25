import { CategoryWithSubCategories } from '@/@types/common'
import { setCategory, setSubCategories, toggleCategoryWithServicesDialog, useAppDispatch, useAppSelector } from '../store'
import { Avatar, Button, Dialog, FormContainer, FormItem, Input, Select } from '@/components/ui'
import { HiOutlineExclamation } from 'react-icons/hi'
import { useDeleteCategory } from '../../utils/hooks'
import { Field, Formik, Form, FieldProps } from 'formik'
import * as Yup from 'yup'

type Props = {
    categories: CategoryWithSubCategories[]
}

type DataProps = {
    data: CategoryWithSubCategories
}

type FormFields = {
    category: number | null
    subCategory: number | null
}

const DeleteCategoryWithServices = ({ categories }: Props) => {
    const { mutate: deleteCategory, isLoading } = useDeleteCategory()
    const dispatch = useAppDispatch()
    const { categoryWithServicesDialog, category, subCategories } = useAppSelector((state) => state.categories.data)

    const onDialogClose = () => {
        dispatch(toggleCategoryWithServicesDialog(false))
        dispatch(setCategory({}))
    }

    const handleSubmit = (values: FormFields) => {
        deleteCategory({ slug: category.slug ?? '', id: values.category, sid: values.subCategory })
    }

    const validationSchema = Yup.object().shape({
        category: Yup.string().required('Select a Category'),
        subCategory: Yup.string().required('Select a Sub Category'),
    })

    const categoryOptions = categories?.filter(item => item.sub_categories.length > 0 && item.id !== category.id).map((item) => {
        return { label: item.name, value: item.id, setSubCategories: item.sub_categories };
    })

    const subCategoryOptions = subCategories?.map(item => {
        return { label: item.name, value: item.id }
    })

    const initialData: FormFields = {
        category: null,
        subCategory: null,
    }

    return (
        <Dialog
            isOpen={categoryWithServicesDialog}
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
                    console.log(values);
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
                                        Delete Category
                                    </h5>
                                    <p className='mb-4'>
                                        This category has service(s), chose a category below to move the service(s) to before you continue.
                                    </p>
                                    <div className="mt-2">
                                        <FormItem
                                            label="Category"
                                            invalid={
                                                (errors.category && touched.category) as boolean
                                            }
                                            errorMessage={errors.category}
                                        >
                                            <Field name="category">
                                                {({ field, form }: FieldProps) => (
                                                    <Select
                                                        field={field}
                                                        form={form}
                                                        options={categoryOptions}
                                                        value={categoryOptions.filter((category) => category.value === values.category)}
                                                        onChange={(option) => {
                                                            form.setFieldValue(field.name, option?.value)
                                                            dispatch(setSubCategories(option?.setSubCategories))
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>

                                        {values.category !== null && (
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
                                        )}
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
export default DeleteCategoryWithServices