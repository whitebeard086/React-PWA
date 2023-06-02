import { Button } from "components/ui"
import Banner from "./components/Banner"
import ServiceCard from "./components/ServiceCard"
import { BiEditAlt } from "react-icons/bi"

const Profile = () => {
    return (
        <div className="mt-4 mb-8">
            <Banner />
            <ServiceCard />
            <div className="mt-4">
                <Button
                    variant="solid"
                    block
                    icon={<BiEditAlt />}
                >
                    Edit Service
                </Button>
            </div>
        </div>
    )
}
export default Profile