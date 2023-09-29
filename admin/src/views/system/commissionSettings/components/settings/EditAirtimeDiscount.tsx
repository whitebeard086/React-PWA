import { SystemConfigurations } from '@/@types/common'
import { useCallback } from 'react'
import { Field, Formik, Form, FieldProps } from 'formik'
import * as Yup from 'yup'
import { TbArrowBackUp } from 'react-icons/tb'
import { Button, FormContainer, FormItem } from '@/components/ui'
import { MdOutlineUploadFile } from 'react-icons/md'
import { FormNumericInput } from '@/components/shared'
import { NumberFormatValues } from 'react-number-format'
import { setAirtimeDiscount, useAppDispatch } from '../../store'
import { useUpdateSystemConfigurations } from '@/views/system/utils/hooks'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

type FormFields = {
    airtimeDiscount: number
}

const EditAirtimeDiscount = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()
    const { mutate: updateAirtimeDiscount, isLoading } = useUpdateSystemConfigurations()

    const validationSchema = Yup.object().shape({
        airtimeDiscount: Yup.number().required('Enter Airtime Discount'),
    })

    const initialData: FormFields = {
        airtimeDiscount: systemConfig?.airtime_discount ?? 0
    }

    const onGoBack = useCallback(() => {
        dispatch(setAirtimeDiscount(false))
    }, [dispatch])

    const handleSubmit = (values: FormFields) => {
        const { airtimeDiscount } = values
        if (values.airtimeDiscount === 0) {
            updateAirtimeDiscount({ zeroAirtime: true })
        } else {
            updateAirtimeDiscount({ airtimeDiscount })
        }
    }

    const isAllowed = (field: NumberFormatValues) => {
        const { floatValue } = field
        if (floatValue === undefined || floatValue <= 100) return true

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
                                invalid={(errors.airtimeDiscount && touched.airtimeDiscount) as boolean}
                                errorMessage={errors.airtimeDiscount}
                                className='mb-0'
                            >
                                <Field name="airtimeDiscount">
                                    {({ field, form }: FieldProps) => {
                                        return (
                                            <FormNumericInput
                                                thousandSeparator={true}
                                                form={form}
                                                // size="sm"
                                                field={field}
                                                placeholder="Enter Airtime Discount"
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
export default EditAirtimeDiscount