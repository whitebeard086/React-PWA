import { useEffect } from "react";
import reducer from "../store";
import { injectReducer } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/dataSlice";
import {
    setFridayValue,
    setFridayValue2,
    setMondayValue,
    setMondayValue2,
    setSaturdayValue,
    setSaturdayValue2,
    setSundayValue,
    setSundayValue2,
    setThursdayValue,
    setThursdayValue2,
    setTuesdayValue,
    setTuesdayValue2,
    setWednesdayValue,
    setWednesdayValue2,
} from "../store/stateSlice";
import EditServiceForm from "./EditServiceForm";

injectReducer("service", reducer);

const EditService = () => {
    const dispatch = useDispatch();

    const { profile } = useSelector((state) => state.auth.user);

    const workday = profile.service?.workdays;

    const mondayStart = workday?.monday_start;
    const mondayEnd = workday?.monday_end;
    const tuesdayStart = workday?.tuesday_start;
    const tuesdayEnd = workday?.tuesday_end;
    const wednesdayStart = workday?.wednesday_start;
    const wednesdayEnd = workday?.wednesday_end;
    const thursdayStart = workday?.thursday_start;
    const thursdayEnd = workday?.thursday_end;
    const fridayStart = workday?.friday_start;
    const fridayEnd = workday?.friday_end;
    const saturdayStart = workday?.saturday_start;
    const saturdayEnd = workday?.saturday_end;
    const sundayStart = workday?.sunday_start;
    const sundayEnd = workday?.sunday_end;

    useEffect(() => {
        dispatch(getCategories());
        dispatch(setMondayValue(mondayStart));
        dispatch(setMondayValue2(mondayEnd));
        dispatch(setTuesdayValue(tuesdayStart));
        dispatch(setTuesdayValue2(tuesdayEnd));
        dispatch(setWednesdayValue(wednesdayStart));
        dispatch(setWednesdayValue2(wednesdayEnd));
        dispatch(setThursdayValue(thursdayStart));
        dispatch(setThursdayValue2(thursdayEnd));
        dispatch(setFridayValue(fridayStart));
        dispatch(setFridayValue2(fridayEnd));
        dispatch(setSaturdayValue(saturdayStart));
        dispatch(setSaturdayValue2(saturdayEnd));
        dispatch(setSundayValue(sundayStart));
        dispatch(setSundayValue2(sundayEnd));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex h-full justify-center items-center p-8">
            <div className="w-full h-full">
                <h1 className="font-bold text-xl text-center">
                    Your Service Details
                </h1>

                <EditServiceForm />
            </div>
        </div>
    );
};
export default EditService;
