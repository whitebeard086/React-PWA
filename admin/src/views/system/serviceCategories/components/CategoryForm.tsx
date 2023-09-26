import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { useNewCategory } from '../../utils/hooks'
import { MdOutlineUploadFile } from 'react-icons/md'

type FormFields = {
    name: string
}

const CategoryForm = () => {
    const { mutate: createCategory, isLoading } = useNewCategory()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Enter Category Name'),
    })

    const initialData: FormFields = {
        name: ''
    }

    const handleSubmit = (values: FormFields) => {
        const { name } = values
        createCategory({ name })
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
                        <FormItem
                            label="Category Name"
                            invalid={(errors.name && touched.name) as boolean}
                            errorMessage={errors.name}
                            className='mb-0'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="name"
                                placeholder="Name"
                                component={Input}
                            />
                        </FormItem>

                        <Button
                            block
                            variant='solid'
                            color='slate-900'
                            type='submit'
                            // size='md'
                            className='mt-6'
                            icon={<MdOutlineUploadFile />}
                            loading={isLoading}
                        >
                            Save
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}
export default CategoryForm