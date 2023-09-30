import { AnimatedDiv, Card, Skeleton } from '@/components/ui'

const GettingData = () => {
    return (
        <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
            <AnimatedDiv layoutId='getting referral data'>
                <Card className='h-full'>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-base">
                                Service Commission 
                            </h4>
                            <Skeleton height={12} width='10%' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-base">
                                Airtime Discount
                            </h4>
                            <Skeleton height={12} width='10%' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-base">
                                Data Discount
                            </h4>
                            <Skeleton height={12} width='10%' />
                        </div>
                    </div>
                </Card>
            </AnimatedDiv>

            <AnimatedDiv layoutId='getting latest referrals'>
                <Card>
                    <div>
                        <h4 className="">Recent Commissions</h4>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <div className='flex gap-4 justify-between w-full'>
                            <div className='flex gap-4 justify-between w-full'>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit grid place-content-center">
                                        <Skeleton variant='circle' />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Skeleton height={12} width='50%' />
                                        <Skeleton height={10} width='20%' />
                                    </div>
                                </div>
                            </div>

                            <Skeleton height={12} width='10%' />
                        </div>
                        <div className='flex gap-4 justify-between w-full'>
                            <div className='flex gap-4 justify-between w-full'>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit grid place-content-center">
                                        <Skeleton variant='circle' />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Skeleton height={12} width='50%' />
                                        <Skeleton height={10} width='20%' />
                                    </div>
                                </div>
                            </div>

                            <Skeleton height={12} width='10%' />
                        </div>
                        <div className='flex gap-4 justify-between w-full'>
                            <div className='flex gap-4 justify-between w-full'>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit grid place-content-center">
                                        <Skeleton variant='circle' />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Skeleton height={12} width='50%' />
                                        <Skeleton height={10} width='20%' />
                                    </div>
                                </div>
                            </div>

                            <Skeleton height={12} width='10%' />
                        </div>
                        <div className='flex gap-4 justify-between w-full'>
                            <div className='flex gap-4 justify-between w-full'>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit grid place-content-center">
                                        <Skeleton variant='circle' />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Skeleton height={12} width='50%' />
                                        <Skeleton height={10} width='20%' />
                                    </div>
                                </div>
                            </div>

                            <Skeleton height={12} width='10%' />
                        </div>
                    </div>
                </Card>
            </AnimatedDiv>
        </div>
    )
}
export default GettingData