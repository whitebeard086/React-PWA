import { SubCategory } from '@/@types/common'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { TbArrowBackUp } from 'react-icons/tb'
import { Button, Card, FormContainer, FormItem, Input } from '@/components/ui'
import { setEditSubCategory, useAppDispatch } from '../../store'
import { useUpdateSubCategory } from '@/views/system/utils/hooks'
import { MdOutlineUploadFile } from 'react-icons/md'

type Props = {
    slug: string
    subCategory: Partial<SubCategory>
}

type FormFields = {
    name: string
}

const EditName = ({ slug, subCategory }: Props) => {
    const dispatch = useAppDispatch()
    const { mutate: update, isLoading } = useUpdateSubCategory()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Enter Sub-Category Name'),
    })

    const initialData: FormFields = {
        name: subCategory.name ?? '',
    }

    const onGoBack = useCallback(() => {
        dispatch(setEditSubCategory(0))
    }, [dispatch])

    const handleSubmit = (values: FormFields) => {
        const { name } = values
        update({ slug, name })
    }

    return (
        <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ touched, errors  }) => (
                <Form>
                    <FormContainer>
                        <Card 
                            bordered 
                            className=""
                            bodyClass=''
                        >
                            <FormItem
                                label="Sub Category Name"
                                invalid={(errors.name && touched.name) as boolean}
                                errorMessage={errors.name}
                                className='mb-0'
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Name"
                                    size="sm"
                                    component={Input}
                                />
                            </FormItem>

                            <div className="flex items-center gap-2 mt-4">
                                <Button
                                    block
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
                                    block
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
                        </Card>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}
export default EditName