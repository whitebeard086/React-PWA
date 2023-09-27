import { SystemConfigurations } from '@/@types/common'
import { setEditBonus, useAppDispatch } from '../../store'
import { useCallback } from 'react'
import { Field, Formik, Form, FieldProps } from 'formik'
import * as Yup from 'yup'
import { TbArrowBackUp } from 'react-icons/tb'
import { Button, FormContainer, FormItem } from '@/components/ui'
import { MdOutlineUploadFile } from 'react-icons/md'
import { useUpdateSystemConfigurations } from '@/views/system/utils/hooks'
import { FormNumericInput } from '@/components/shared'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

type FormFields = {
    bonus: number
}

const EditBonus = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()
    const { mutate: updateBonus, isLoading } = useUpdateSystemConfigurations()

    const validationSchema = Yup.object().shape({
        bonus: Yup.string().required('Enter Referral Bonus'),
    })

    const initialData: FormFields = {
        bonus: systemConfig?.referral_bonus ?? 0
    }

    const onGoBack = useCallback(() => {
        dispatch(setEditBonus(false))
    }, [dispatch])

    const handleSubmit = (values: FormFields) => {
        const { bonus } = values
        updateBonus({ bonus })
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
                                invalid={(errors.bonus && touched.bonus) as boolean}
                                errorMessage={errors.bonus}
                                className='mb-0'
                            >
                                <Field name="bonus">
                                    {({ field, form }: FieldProps) => {
                                        return (
                                            <FormNumericInput
                                                thousandSeparator={true}
                                                form={form}
                                                field={field}
                                                placeholder="Referral Bonus"
                                                decimalScale={2}
                                                value={field.value}
                                                inputPrefix={
                                                    <span className="font-semibold">
                                                        ₦
                                                    </span>
                                                }
                                                onValueChange={(e) => {
                                                    form.setFieldValue(field.name, e.floatValue)
                                                }}
                                            />
                                        )
                                    }}
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
export default EditBonus