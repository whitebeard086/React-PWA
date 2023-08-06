import { Card } from "@/components/ui";

const Stats = ({ bookingsCount, profile }) => {
    return (
        <>
            <Card className="w-1/2 min-w-[18rem] h-40" bodyClass="h-full">
                <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
                    <h4 className="text-gray-600">All Profile Views</h4>
                    <h4 className="font-semibold">
                        {profile?.profile_views?.toLocaleString()}
                    </h4>
                </div>
            </Card>
            <Card className="w-1/2 min-w-[18rem] h-40" bodyClass="h-full">
                <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
                    <h4 className="text-gray-600">All Service Requests</h4>
                    <h4 className="font-semibold">
                        {bookingsCount?.toLocaleString()}
                    </h4>
                </div>
            </Card>
        </>
    );
};
export default Stats;
