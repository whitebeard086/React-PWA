import { SystemConfigurations } from '@/@types/common'
import { setCommission, useAppDispatch } from '../../store'
import { useUpdateSystemConfigurations } from '@/views/system/utils/hooks'
import { useCallback } from 'react'
import { Field, Formik, Form, FieldProps } from 'formik'
import * as Yup from 'yup'
import { TbArrowBackUp } from 'react-icons/tb'
import { Button, FormContainer, FormItem } from '@/components/ui'
import { MdOutlineUploadFile } from 'react-icons/md'
import { FormNumericInput } from '@/components/shared'
import { NumberFormatValues } from 'react-number-format'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

type FormFields = {
    commission: number
}

const EditCommission = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()
    const { mutate: updateCommission, isLoading } = useUpdateSystemConfigurations()

    const validationSchema = Yup.object().shape({
        commission: Yup.string().required('Enter Service Commission'),
    })

    const initialData: FormFields = {
        commission: systemConfig?.service_commission ?? 0
    }

    const onGoBack = useCallback(() => {
        dispatch(setCommission(false))
    }, [dispatch])

    const handleSubmit = (values: FormFields) => {
        const { commission } = values
        updateCommission({ commission })
    }

    const isAllowed = (field: NumberFormatValues) => {
        const { floatValue } = field
        if (floatValue === undefined || floatValue <= 100 ) return true

        return false
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
                                invalid={(errors.commission && touched.commission) as boolean}
                                errorMessage={errors.commission}
                                className='mb-0'
                            >
                                <Field name="commission">
                                    {({ field, form }: FieldProps) => {
                                        return (
                                            <FormNumericInput
                                                thousandSeparator={true}
                                                form={form}
                                                // size="sm"
                                                field={field}
                                                placeholder="Enter Service Commission"
                                                isAllowed={isAllowed}
                                                decimalScale={2}
                                                value={field.value}
                                                inputSuffix={
                                                    <span className="font-semibold">%</span>
                                                }
                                                onValueChange={(e) => {
                                                    form.setFieldValue(field.name, e.floatValue);
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
export default EditCommission