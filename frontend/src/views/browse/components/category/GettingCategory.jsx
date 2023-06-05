import { Card, Checkbox, Radio, Skeleton } from "components/ui"
import { useState } from "react"

const GettingCategory = () => {
    const [value, setValue] = useState('All')

    const onChange = (val) => {
        setValue(val)
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 justify-between">
                <Skeleton height="24px" width="60%" />
                <Skeleton height="14px" width="20%" />
            </div>

            <div>
                <Card bodyClass="p-0">
                    <Skeleton height="200px" width="100%" />
                </Card>

                <div className="mt-4">
                    <div className="flex items-center">
                        <Radio.Group className="w-full flex items-center justify-between" value={value} onChange={onChange}>
                            <Radio customLabelClass="font-bold text-base" value={'All'}>All</Radio>
                            <Radio customLabelClass="font-bold text-base" value={'Online Now'}>Online Now</Radio>
                            <Radio customLabelClass="font-bold text-base" value={'Online 24hrs ago'}>Online 24hrs ago</Radio>
                        </Radio.Group>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                    <Card>
                        <div className="flex gap-4 justify-between">
                            <div className="flex items-center gap-4 w-3/4">
                                <div className="w-full">
                                    <Skeleton height="160px" width="100%" />
                                </div>
                                <div className="w-full">
                                    <Skeleton height="25px" width="70%" />
                                    <Skeleton className="mt-8" height="25px" width="60%" />
                                    <Skeleton className="mt-2" height="15px" width="60%" />
                                </div>
                            </div>
                            <Skeleton height="15px" width="10%" />
                        </div>
                    </Card>
                    <Card>
                        <div className="flex gap-4 justify-between">
                            <div className="flex items-center gap-4 w-3/4">
                                <div className="w-full">
                                    <Skeleton height="160px" width="100%" />
                                </div>
                                <div className="w-full">
                                    <Skeleton height="25px" width="70%" />
                                    <Skeleton className="mt-8" height="25px" width="60%" />
                                    <Skeleton className="mt-2" height="15px" width="60%" />
                                </div>
                            </div>
                            <Skeleton height="15px" width="10%" />
                        </div>
                    </Card>
                    <Card>
                        <div className="flex gap-4 justify-between">
                            <div className="flex items-center gap-4 w-3/4">
                                <div className="w-full">
                                    <Skeleton height="160px" width="100%" />
                                </div>
                                <div className="w-full">
                                    <Skeleton height="25px" width="70%" />
                                    <Skeleton className="mt-8" height="25px" width="60%" />
                                    <Skeleton className="mt-2" height="15px" width="60%" />
                                </div>
                            </div>
                            <Skeleton height="15px" width="10%" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default GettingCategory