import { setNewSubCategory, useAppDispatch } from '../../store'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TbArrowBackUp } from 'react-icons/tb'
import { Button, Card, FormContainer, FormItem, Input } from '@/components/ui'
import { MdOutlineUploadFile } from 'react-icons/md'
import { useNewSubCategory } from '@/views/system/utils/hooks'
import { useCallback } from 'react'

type Props = {
    slug: string
}

type FormFields = {
    name: string
}

const NewSubCategory = ({ slug }: Props) => {
    const dispatch = useAppDispatch()
    const { mutate: newSubCategory, isLoading } = useNewSubCategory()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Enter Category Name'),
    })

    const initialData: FormFields = {
        name: ''
    }

    const onGoBack = useCallback(() => {
        dispatch(setNewSubCategory(false))
    }, [dispatch])

    const handleSubmit = (values: FormFields) => {
        const { name } = values
        newSubCategory({ slug, name })
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
                        <Card bordered>
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
export default NewSubCategory