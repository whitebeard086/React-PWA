import classNames from "classnames";
import { Avatar, Upload } from "@/components/ui";
import appConfig from "@/configs/app.config";
import { HiOutlineUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import UploadImage from "./UploadImage";
import { Loading } from "@/components/shared";

const User = () => {
    const { imagePath } = appConfig;

    const { profile, gettingUser } = useSelector((state) => state.auth.user);
    const { uploading } = useSelector((state) => state.settings.data);

    return (
        <div className="flex flex-col justify-center items-center mb-8">
            <div
                className={classNames(
                    "flex items-center flex-row gap-2 cursor-pointer relative"
                )}
            >
                {gettingUser || uploading ? (
                    <div className="relative">
                        <Avatar
                            size={150}
                            icon={<HiOutlineUser />}
                            src={
                                profile?.image
                                    ? `${imagePath}/${profile.image}`
                                    : null
                            }
                        />
                        <div className="absolute top-0 w-full h-full grid place-content-center bg-black/50 rounded-lg">
                            <Loading loading={true} />
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <Avatar
                            size={150}
                            className="relative"
                            icon={!profile?.image ? <HiOutlineUser /> : null}
                            src={
                                profile?.image
                                    ? `${imagePath}/${profile.image}`
                                    : null
                            }
                        />
                        <UploadImage />
                    </div>
                )}
            </div>

            <div className="flex flex-col justify-center items-center">
                <h4 className="text-lg font-bold text-primary-500">
                    {profile.username}
                </h4>
                <p className="text-base font-semibold text-primary-500">
                    {profile.email}
                </p>
            </div>
        </div>
    );
};
export default User;
