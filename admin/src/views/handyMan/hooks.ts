import { Category, InvoiceItem, Service, User } from '@/@types/common';
import { apiGetDispute, apiGetDisputes } from '@/services/HandymanService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetDisputeRequest, GetDisputeResponse, GetDisputesResponse } from './types';
import { useEffect, useState } from 'react';

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