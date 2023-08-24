import { Card, Skeleton } from "@/components/ui";

const GettingFeed = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card bodyClass="w-full">
                <div className="flex">
                    <div className="flex flex-col gap-6 w-full">
                        <Skeleton variant="circle" height="80px" width="80px" />
                        <Skeleton height="20px" width="60%" />
                    </div>
                    <Skeleton height="20px" width="40%" />
                </div>
            </Card>
            <Card bodyClass="w-full">
                <div className="flex">
                    <div className="flex flex-col gap-6 w-full">
                        <Skeleton variant="circle" height="80px" width="80px" />
                        <Skeleton height="20px" width="60%" />
                    </div>
                    <Skeleton height="20px" width="40%" />
                </div>
            </Card>
            <Card bodyClass="w-full">
                <div className="flex">
                    <div className="flex flex-col gap-6 w-full">
                        <Skeleton variant="circle" height="80px" width="80px" />
                        <Skeleton height="20px" width="60%" />
                    </div>
                    <Skeleton height="20px" width="40%" />
                </div>
            </Card>
            <Card bodyClass="w-full">
                <div className="flex">
                    <div className="flex flex-col gap-6 w-full">
                        <Skeleton variant="circle" height="80px" width="80px" />
                        <Skeleton height="20px" width="60%" />
                    </div>
                    <Skeleton height="20px" width="40%" />
                </div>
            </Card>
        </div>
    );
};
export default GettingFeed;
