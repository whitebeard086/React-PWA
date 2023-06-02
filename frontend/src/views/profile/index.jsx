import { Button } from "components/ui"
import Banner from "./components/Banner"
import ServiceCard from "./components/ServiceCard"
import { BiEditAlt } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="mt-4 mb-8">
            <Banner />
            <ServiceCard />
            <div className="mt-4">
                <Button
                    variant="solid"
                    block
                    icon={<BiEditAlt />}
                    onClick={() => navigate('/service/edit')}
                >
                    Edit Service Information
                </Button>
            </div>
        </div>
    )
}
export default Profile