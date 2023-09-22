import { useCallback } from 'react'
import { CategoryWithSubCategories } from '@/@types/common'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useUpdateCategory } from '../../utils/hooks'
import { TbArrowBackUp } from 'react-icons/tb'
import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { MdOutlineUploadFile } from 'react-icons/md'
import { setEditCategory, useAppDispatch } from '../store'

type FormFields = {
    name: string
}

type Props = {
    category: Partial<CategoryWithSubCategories>
    slug: string
}

const EditName = ({ category, slug }: Props) => {
    const dispatch = useAppDispatch()
    const { mutate: updateName, isLoading } = useUpdateCategory()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Enter Category Name'),
    })

    const initialData: FormFields = {
        name: category?.name ?? ''
    }

    const onGoBack = useCallback(() => {
        dispatch(setEditCategory(false))
    }, [dispatch])

    const handleSubmit = (values: FormFields) => {
        const { name } = values
        updateName({ slug, name })
    }

    return (
        <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ touched, errors }) => (
                <Form>
                    <FormContainer>
                        <div className="flex items-center gap-2 flex-wrap">
                            <FormItem
                                label=""
                                invalid={(errors.name && touched.name) as boolean}
                                errorMessage={errors.name}
                                className='mb-0'
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Name"
                                    size="xs"
                                    component={Input}
                                />
                            </FormItem>

                            <div className="flex items-center gap-2 flex-wrap">
                                <Button
                                    variant='solid'
                                    color='slate-900'
                                    type='submit'
                                    size='xs'
                                    icon={<MdOutlineUploadFile />}
                                    loading={isLoading}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant='twoTone'
                                    color='red-500'
                                    type='button'
                                    size='xs'
                                    icon={<TbArrowBackUp />}
                                    disabled={isLoading}
                                    onClick={onGoBack}
                                >
                                    cancel
                                </Button>
                            </div>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}
export default EditName