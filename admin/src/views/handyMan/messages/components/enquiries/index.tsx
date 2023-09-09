import StatCards from "@/views/home/components/feed/StatCards"
import EnquiryList from "./EnquiryList"
import EnquiryTable from "./EnquiryTable"

const Enquiries = () => {
    return (
        <div>
            <StatCards />
            <div className="mt-4">
                {/* <EnquiryTable /> */}
                <EnquiryList />
            </div>
        </div>
    )
}
export default Enquiries