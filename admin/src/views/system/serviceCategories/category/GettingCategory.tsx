import { Button, Card, Skeleton } from '@/components/ui'
import { BiEditAlt } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'

const GettingCategory = () => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Skeleton height={17} width='10%' />
                <h4 className=""> Category</h4>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <Card>
                        <Card
                            bodyClass='p-0 h-full'
                            className='h-48 lg:h-60 xl:h-[22rem] relative'
                        >
                            <Skeleton className='h-48 lg:h-60 xl:h-[22rem]' />
                        </Card>
                        <div className="mt-6">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-base">
                                    Category Name: 
                                </h4>
                                <Skeleton height={15} width='10%' />
                            </div>
                        </div>
                    </Card>

                    <Card className='mt-4'>
                        <div>
                            <h4 className="text-base mb-4">Sub Categories</h4>

                            <div className="flex flex-col gap-2">
                                <Card bordered>
                                    <div className="flex items-center gap-4 justify-between flex-wrap w-full">
                                        <div className="flex flex-col w-[70%] gap-1">
                                            <Skeleton height={15} width='20%' />
                                            <div className="flex items-center gap-2">
                                                <Skeleton height={12} width='2%' />
                                                <p className="text-base">
                                                    Services
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="slate-900"
                                                icon={<BiEditAlt />}
                                            />
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="red-500"
                                                icon={<MdDeleteOutline />}
                                            />
                                        </div>
                                    </div>
                                </Card>
                                <Card bordered>
                                    <div className="flex items-center gap-4 justify-between flex-wrap w-full">
                                        <div className="flex flex-col w-[70%] gap-1">
                                            <Skeleton height={15} width='20%' />
                                            <div className="flex items-center gap-2">
                                                <Skeleton height={12} width='2%' />
                                                <p className="text-base">
                                                    Services
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="slate-900"
                                                icon={<BiEditAlt />}
                                            />
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="red-500"
                                                icon={<MdDeleteOutline />}
                                            />
                                        </div>
                                    </div>
                                </Card>
                                <Card bordered>
                                    <div className="flex items-center gap-4 justify-between flex-wrap w-full">
                                        <div className="flex flex-col w-[70%] gap-1">
                                            <Skeleton height={15} width='20%' />
                                            <div className="flex items-center gap-2">
                                                <Skeleton height={12} width='2%' />
                                                <p className="text-base">
                                                    Services
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="slate-900"
                                                icon={<BiEditAlt />}
                                            />
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="red-500"
                                                icon={<MdDeleteOutline />}
                                            />
                                        </div>
                                    </div>
                                </Card>
                                <Card bordered>
                                    <div className="flex items-center gap-4 justify-between flex-wrap w-full">
                                        <div className="flex flex-col w-[70%] gap-1">
                                            <Skeleton height={15} width='20%' />
                                            <div className="flex items-center gap-2">
                                                <Skeleton height={12} width='2%' />
                                                <p className="text-base">
                                                    Services
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="slate-900"
                                                icon={<BiEditAlt />}
                                            />
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="red-500"
                                                icon={<MdDeleteOutline />}
                                            />
                                        </div>
                                    </div>
                                </Card>
                                <Card bordered>
                                    <div className="flex items-center gap-4 justify-between flex-wrap w-full">
                                        <div className="flex flex-col w-[70%] gap-1">
                                            <Skeleton height={15} width='20%' />
                                            <div className="flex items-center gap-2">
                                                <Skeleton height={12} width='2%' />
                                                <p className="text-base">
                                                    Services
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="slate-900"
                                                icon={<BiEditAlt />}
                                            />
                                            <Button
                                                shape="circle"
                                                variant="solid"
                                                size="sm"
                                                color="red-500"
                                                icon={<MdDeleteOutline />}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1 h-full">
                    <Card>
                        <div>
                            <h4 className="text-base mb-4">Services</h4>

                            <div className="mt-4 flex flex-col gap-2">
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit">
                                        <Skeleton variant='circle' />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <Skeleton height={12} width='30%' />
                                        <Skeleton height={12} width='20%' />
                                    </div>
                                </div>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit">
                                        <Skeleton variant='circle' />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <Skeleton height={12} width='28%' />
                                        <Skeleton height={12} width='22%' />
                                    </div>
                                </div>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit">
                                        <Skeleton variant='circle' />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <Skeleton height={12} width='20%' />
                                        <Skeleton height={12} width='25%' />
                                    </div>
                                </div>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit">
                                        <Skeleton variant='circle' />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <Skeleton height={12} width='18%' />
                                        <Skeleton height={12} width='27%' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default GettingCategory