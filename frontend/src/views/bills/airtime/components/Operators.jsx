import { Avatar, Notification, toast } from "@/components/ui";
import { useEffect } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOperatorStatus } from "../store/dataSlice";
import { useState } from "react";

const Operators = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [airtel, setAirtel] = useState(null)
    const [nineMobile, setNineMobile] = useState(null)
    const [glo, setGlo] = useState(null)
    const [mtn, setMtn] = useState(null)
    console.log(airtel);
    console.log(nineMobile);
    console.log(glo);
    console.log(mtn);

    const { operators, operatorStatus } = useSelector((state) => state.airtime.data)

    const onAirtel = () => {
        const data = operators?.filter((operator) => operator.name === 'Airtel')
        setAirtel(data[0]?.id)
    }

    const onNineMobile = () => {
        const data = operators?.filter((operator) => operator.name === '9Mobile')
        setNineMobile(data[0]?.id)
    }

    const onGlo = () => {
        const data = operators?.filter((operator) => operator.name === 'Glo')
        setGlo(data[0]?.id)
    }

    const onMtn = () => {
        const data = operators?.filter((operator) => operator.name === 'MTN')
        setMtn(data[0]?.id)
    }

    const popNotification = (message, type, title, duration) => {
        toast.push(
            <Notification
                title={title || `${"Error"}`}
                type={type || `${"warning"}`}
                duration={duration || 3000}
            >
                {message}
            </Notification>,
            {
                placement: "top-center",
            }
        );
    };

    useEffect(() => {
        if (operatorStatus === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again later.",
                "danger",
                "Error",
                5000
            );

            dispatch(setOperatorStatus('idle'));
            navigate(-1)
        }
    }, [dispatch, navigate, operatorStatus])

    return (
        <div>
            <p className="text-base font-semibold mb-4">
                Choose a Network Operator
            </p>

            <div className="flex items-center gap-4 justify-around flex-wrap">
                <div
                    className="flex flex-col gap-1 items-center cursor-pointer"
                    onClick={onAirtel}
                >
                    <Avatar
                        size="lg"
                        src="/img/airtel.jpg"
                        icon={<HiOutlineUser />}
                    />
                    <p className="text-sm">Airtel</p>
                </div>

                <div onClick={onNineMobile} className="flex flex-col gap-1 items-center cursor-pointer">
                    <Avatar
                        className="bg-emerald-100"
                        size="lg"
                        src="/img/9mobile.png"
                        icon={<HiOutlineUser />}
                    />
                    <p className="text-sm">9Mobile</p>
                </div>

                <div onClick={onGlo} className="flex flex-col gap-1 items-center cursor-pointer">
                    <Avatar
                        className="bg-emerald-100"
                        size="lg"
                        src="/img/Glo.png"
                        icon={<HiOutlineUser />}
                    />
                    <p className="text-sm">glo</p>
                </div>

                <div onClick={onMtn} className="flex flex-col gap-1 items-center cursor-pointer">
                    <Avatar
                        className="bg-emerald-100"
                        size="lg"
                        src="/img/MTN.png"
                        icon={<HiOutlineUser />}
                    />
                    <p className="text-sm">MTN</p>
                </div>
            </div>
        </div>
    );
};
export default Operators;
