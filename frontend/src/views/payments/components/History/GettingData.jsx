import { Card, Skeleton } from "@/components/ui";

const GettingData = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <div className="flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="21%" />
                    <Skeleton height="1rem" width="21%" />
                </div>
                <div className="mt-2 flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="18%" />
                    <Skeleton height="1rem" width="28%" />
                </div>
            </Card>
            <Card>
                <div className="flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="21%" />
                    <Skeleton height="1rem" width="21%" />
                </div>
                <div className="mt-2 flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="18%" />
                    <Skeleton height="1rem" width="28%" />
                </div>
            </Card>
            <Card>
                <div className="flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="21%" />
                    <Skeleton height="1rem" width="21%" />
                </div>
                <div className="mt-2 flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="18%" />
                    <Skeleton height="1rem" width="28%" />
                </div>
            </Card>
            <Card>
                <div className="flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="21%" />
                    <Skeleton height="1rem" width="21%" />
                </div>
                <div className="mt-2 flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="18%" />
                    <Skeleton height="1rem" width="28%" />
                </div>
            </Card>
            <Card>
                <div className="flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="21%" />
                    <Skeleton height="1rem" width="21%" />
                </div>
                <div className="mt-2 flex items-center gap-4 justify-between">
                    <Skeleton height="1rem" width="18%" />
                    <Skeleton height="1rem" width="28%" />
                </div>
            </Card>
        </div>
    );
};
export default GettingData;
