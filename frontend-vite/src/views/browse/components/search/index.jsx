import { Card, Input } from "components/ui"
import { AiOutlineSearch } from "react-icons/ai"
import { BiFilter } from "react-icons/bi"

const Search = () => {
    return (
        <Card className="flex" bodyClass="flex gap-2 w-full">
            <Input 
                placeholder="Search for services"
                prefix={<AiOutlineSearch className="text-2xl text-primary-500" />} 
            />

            <Card bordered clickable className="border-gray-300" bodyClass="p-0 w-10 flex flex-col h-full justify-center items-center">
                <BiFilter className="text-3xl text-primary-500" />
            </Card>
        </Card>
    )
}
export default Search