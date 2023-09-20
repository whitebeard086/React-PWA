import { User } from '@/@types/common'
import { ConfirmDialog } from '@/components/shared'
import { useRefundClient } from '@/views/handyMan/hooks'
import { useEffect } from 'react'

type Props = {
    refundOpen: boolean
    setRefundOpen: (value: boolean) => void
    uid: string
    client: User | undefined
}

const RefundClient = ({ refundOpen, setRefundOpen, uid, client }: Props) => {
    const {
        mutate: refundClient,
        isSuccess: refundClientSuccess,
        isLoading: refundingClient,
    } = useRefundClient({ uid })

    const onCloseDialog = () => {
        setRefundOpen(false)
    }

    useEffect(() => {
        if (refundClientSuccess) {
            onCloseDialog()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refundClientSuccess])
    
    const onRefundClient = () => {
        refundClient()
    }

    return (
        <ConfirmDialog
            isOpen={refundOpen}
            type="warning"
            title={`Refund Client?`}
            confirmButtonColor="amber-600"
            loading={refundingClient}
            onClose={onCloseDialog}
            onRequestClose={onCloseDialog}
            onCancel={onCloseDialog}
            onConfirm={onRefundClient}
        >
            <p>
                Confirm that you want to refund{' '}
                {`${client?.first_name} ${client?.last_name}`}
            </p>
        </ConfirmDialog>
    )
}
export default RefundClient