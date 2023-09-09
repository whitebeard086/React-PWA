import StatCards from "@/views/home/components/feed/StatCards"
import EnquiryList from "./EnquiryList"

const Enquiries = () => {
    return (
        <div>
            <StatCards />
            <div className="mt-4">
                <EnquiryList />
            </div>
        </div>
    )
}
export default Enquiries