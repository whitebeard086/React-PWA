import { User, UserWithService } from '@/@types/common'
import { ConfirmDialog } from '@/components/shared'
import { usePayProvider } from '@/views/handyMan/hooks'
import { useEffect } from 'react'

type Props = {
    payProvider: boolean
    setPayProvider: (value: boolean) => void
    uid: string
    provider: Partial<UserWithService>
}

const PayProvider = ({ payProvider, provider, setPayProvider, uid }: Props) => {
    const {
        mutate,
        isSuccess,
        isLoading,
    } = usePayProvider({ uid })

    
    const onCloseDialog = () => {
        setPayProvider(false)
    }

    useEffect(() => {
        if (isSuccess) {
            onCloseDialog()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    const onPayProvider = () => {
        mutate()
    }

    return (
        <ConfirmDialog
            isOpen={payProvider}
            type="warning"
            title={`Pay This Provider?`}
            confirmButtonColor="amber-600"
            loading={isLoading}
            onClose={onCloseDialog}
            onRequestClose={onCloseDialog}
            onCancel={onCloseDialog}
            onConfirm={onPayProvider}
        >
            <p>
                Confirm that you want to release payment to{' '}
                {provider?.service?.title}
            </p>
        </ConfirmDialog>
    )
}
export default PayProvider