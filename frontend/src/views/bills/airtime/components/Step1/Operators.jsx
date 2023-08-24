import { Avatar, Notification, toast } from "@/components/ui";
import { useEffect } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getProducts,
    setOperatorStatus,
    setProductStatus,
} from "../../store/dataSlice";
import { setOperator, setSelectedOperator } from "../../store/stateSlice";
import classNames from "classnames";
import { Loading } from "@/components/shared";

const Operators = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { operators, operatorStatus, productStatus, gettingOperators } =
        useSelector((state) => state.airtime.data);
    const { selectedOperator } = useSelector((state) => state.airtime.state);

    const onSelectOperator = (item) => {
        dispatch(setSelectedOperator(item.name));
        dispatch(setOperator(item.id));
        dispatch(
            getProducts({
                category: item.id,
            })
        );
    };

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
        if (operatorStatus === "error") {
            popNotification(
                "Oops! Something went wrong, please try again later.",
                "danger",
                "Error",
                5000
            );

            dispatch(setOperatorStatus("idle"));
            navigate(-1);
        }
    }, [dispatch, navigate, operatorStatus]);

    useEffect(() => {
        if (productStatus === "error") {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );

            dispatch(setProductStatus("idle"));
        }
    }, [dispatch, navigate, productStatus]);

    return (
        <div className="mb-8">
            {gettingOperators ? (
                <div className="h-[10vh]">
                    <Loading size={32} loading={true} />
                </div>
            ) : (
                <div>
                    <p className="text-sm font-semibold mb-4">
                        Choose a Network Operator
                    </p>

                    <div className="flex items-center gap-4 justify-around flex-wrap">
                        {operators?.map((item) => (
                            <div
                                key={item.id}
                                className={classNames(
                                    "flex flex-col gap-1 items-center cursor-pointer",
                                    productStatus === "success" &&
                                        selectedOperator === item.name &&
                                        "shadow-md px-4 py-2 bg-white rounded-lg border-b-2 border-primary-500"
                                )}
                                onClick={() => onSelectOperator(item)}
                            >
                                {item.name === "Airtel" && (
                                    <Avatar
                                        size="lg"
                                        src="/img/airtel.jpg"
                                        icon={<HiOutlineUser />}
                                    />
                                )}
                                {item.name === "9Mobile" && (
                                    <Avatar
                                        className="bg-white"
                                        size="lg"
                                        src="/img/9mobile.png"
                                        icon={<HiOutlineUser />}
                                    />
                                )}
                                {item.name === "Glo" && (
                                    <Avatar
                                        className="bg-white"
                                        size="lg"
                                        src="/img/Glo.png"
                                        icon={<HiOutlineUser />}
                                    />
                                )}
                                {item.name === "MTN" && (
                                    <Avatar
                                        className="bg-white"
                                        size="lg"
                                        src="/img/MTN.png"
                                        icon={<HiOutlineUser />}
                                    />
                                )}
                                <p className="text-sm">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Operators;
