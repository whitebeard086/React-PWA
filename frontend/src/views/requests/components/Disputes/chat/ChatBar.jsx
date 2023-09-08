import { Button, Dropdown } from "@/components/ui";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";

const ChatBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="p-4 flex items-center gap-4 justify-between bg-white border-t-2 sticky top-[4.7rem] z-10">
            <Button
                icon={<IoMdArrowRoundBack className="text-lg" />}
                className="!bg-gray-900 hover:!bg-black"
                variant="solid"
                size="sm"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>

            <Dropdown 
                placement="bottom-end"
                renderTitle={
                    <div className="flex items-center gap-1 p-2 shadow-sm cursor-pointer rounded-md bg-primary-500">
                        <p className="text-sm text-white font-semibold">
                            Dispute Resolution
                        </p>

                        <BiMenuAltLeft className="text-white text-2xl" />
                    </div>
                }
            >

            </Dropdown>
        </div>
    )
}
export default ChatBar