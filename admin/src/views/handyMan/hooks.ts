import { Category, InvoiceItem, Service, User } from '@/@types/common';
import { apiGetDispute, apiGetDisputes, apiPayProvider, apiRefundClient } from '@/services/HandymanService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetDisputeRequest, GetDisputeResponse, GetDisputesResponse, RefundClientResponse } from './types';
import { useEffect, useState } from 'react';
import { popNotification } from '@/components/ui/Notification/toast';
import { useNavigate } from 'react-router-dom';

export const useGetDisputes = () => {
	return useQuery({
		queryKey: ['disputes'],
        queryFn: async () => {
			const response = await apiGetDisputes<GetDisputesResponse>();
			return response.data;
		},
		staleTime: 5000,
		// cacheTime: 10000,
		refetchInterval: 5 * 1000,
	});
};

export const useGetDispute = (data: GetDisputeRequest) => {
	return useQuery({
		queryKey: ['disputes', data],
        queryFn: async () => {
			const response = await apiGetDispute<GetDisputeResponse, GetDisputeRequest>(data);
			return response.data;
		},
		staleTime: 60 * 1000,
		refetchInterval: 60 * 1000,
	});
};

export const useRefundClient = (data: GetDisputeRequest) => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	return useMutation({
		mutationKey: ['disputes'],
		mutationFn: async () => {
			const response = await apiRefundClient<RefundClientResponse, GetDisputeRequest>(data)
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['disputes'])
			popNotification(
                'Success',
                'Client has been refunded.',
                'success',
            )
			setTimeout(() => {
				navigate('/handy-man/bookings-in-dispute')
			}, 2000)
		},
		onError: () => {
			popNotification(
                'Error',
                'Something went wrong, please try again.',
                'danger'
            )
		},
	});
};

export const usePayProvider = (data: GetDisputeRequest) => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	return useMutation({
		mutationKey: ['disputes'],
		mutationFn: async () => {
			const response = await apiPayProvider<RefundClientResponse, GetDisputeRequest>(data)
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['disputes'])
			popNotification(
                'Success',
                'Provider paid.',
                'success',
            )
			setTimeout(() => {
				navigate('/handy-man/bookings-in-dispute')
			}, 2000)
		},
		onError: () => {
			popNotification(
                'Error',
                'Something went wrong, please try again.',
                'danger'
            )
		},
	});
};

export const useInvoiceData = (invoiceData: InvoiceItem[]) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const sum = invoiceData?.reduce((total, item) => total + Number(item.price), 0)
            setTotalPrice(sum)
        }

        calculateTotalPrice();
    }, [invoiceData])

    return {
        totalPrice,
    }
}