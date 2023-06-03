import classNames from "classnames";
import { Avatar, Upload } from "components/ui";
import appConfig from "configs/app.config";
import { HiOutlineUser } from "react-icons/hi";
import { useSelector } from "react-redux"
import UploadImage from "./UploadImage";

const User = () => {
    const { imagePath } = appConfig

    const { profile, gettingUser } = useSelector((state) => state.auth.user)

    return (
        <div className="flex flex-col justify-center items-center mb-8">
            <div className={classNames('flex items-center flex-row gap-2 cursor-pointer relative')}>
                {gettingUser ? (
                    <Avatar size={150} icon={<HiOutlineUser />} />
                ) : (
                    <div className="relative">
                        <Avatar
                            size={150}
                            className="relative"
                            icon={!profile?.image ? <HiOutlineUser /> : null}
                            src={profile?.image ? `${imagePath}/${profile.image}` : null}
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
    )
}
export default User