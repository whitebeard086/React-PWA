import { SystemConfigurations } from '@/@types/common'
import { setEditPitch, useAppDispatch } from '../../store'
import { useCallback } from 'react'
import { Field, Formik, Form, FieldProps } from 'formik'
import { TbArrowBackUp } from 'react-icons/tb'
import { Button, FormContainer, FormItem } from '@/components/ui'
import { MdOutlineUploadFile } from 'react-icons/md'
import * as Yup from 'yup'
import { useUpdateSystemConfigurations } from '@/views/system/utils/hooks'
import { RichTextEditor } from '@/components/shared'
import ReactHtmlParser from 'html-react-parser'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

type FormFields = {
    pitch: string
}

const EditPitch = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()
    const { mutate: updatePitch, isLoading } = useUpdateSystemConfigurations()

    const validationSchema = Yup.object().shape({
        pitch: Yup.string().required('Enter Referral Pitch'),
    })

    const initialData: FormFields = {
        pitch: systemConfig?.referral_pitch ?? ''
    }

    const onGoBack = useCallback(() => {
        dispatch(setEditPitch(false))
    }, [dispatch])

    const handleSubmit = (values: FormFields) => {
        const { pitch } = values
        updatePitch({ pitch })
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
                        <div className="flex flex-col gap-6">
                            <FormItem
                                label=""
                                className="mb-0"
                                labelClass="!justify-start"
                                invalid={errors.pitch && touched.pitch}
                                errorMessage={errors.pitch}
                            >
                                <Field name="pitch">
                                    {({ field, form }: FieldProps) => (
                                        <RichTextEditor
                                            value={field.value}
                                            className=''
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <div className="flex items-center gap-2">
                                <Button
                                    block
                                    variant='solid'
                                    color='slate-900'
                                    type='submit'
                                    size='sm'
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
                                    size='sm'
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
export default EditPitch