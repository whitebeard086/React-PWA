import classNames from "classnames"
import { Avatar, Button, Dropdown, ScrollBar, Tooltip } from "components/ui"
import { HiOutlineLogout, HiOutlineMailOpen, HiOutlineUser } from "react-icons/hi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useAuth from "utils/hooks/useAuth"
import useResponsive from "utils/hooks/useResponsive"

const notificationHeight = 'h-72'

const Header = ({ className }) => {
    const { handleSignOut } = useAuth();

    const { larger } = useResponsive();

    const { profile } = useSelector((state) => state.auth.user)

    const loading = false

    const dropdownItemList = [
        {
            label: "Profile",
            icon: ""
        }
    ]

    const UserAvatar = (
		<div className={classNames(className, 'flex items-center flex-row gap-2 cursor-pointer')}>
			{loading ? (
				<Avatar size={35} shape="circle" icon={<HiOutlineUser />} />
			) : (
				<Avatar
					size={35}
					shape="circle"
					icon={!profile?.image ? <HiOutlineUser /> : null}
					// src={profile?.image ? `${image}/${profile.image}` : null}
				/>
			)}
		</div>
	);

    const NotificationToggle = () => {
        return (
            <div className="cursor-pointer transition duration-500 hover:bg-gray-200 h-9 w-9 rounded-full grid place-content-center">
                <div className="relative w-full h-full">
                    <div className="h-2 w-2 animate-ping rounded-full bg-primary-500 absolute left-3" />
                    <div className="h-2 w-2 rounded-full bg-primary-500 absolute left-3" />
                    <IoMdNotificationsOutline className="text-2xl" />
                </div>
            </div>
        )
    }

    return (
        <div className="p-5 flex w-full justify-between items-center sticky top-0 bg-white z-10">
            <h2 className="text-lg font-bold text-primary-500">
                Hey {profile?.username}!
            </h2>

            <div className="flex gap-3 items-center">
                <Dropdown
                    renderTitle={<NotificationToggle />}
                    menuClass="p-0 min-w-[280px] md:min-w-[340px]"
                    placement="bottom-end"
                >
                    <Dropdown.Item variant="header">
                        <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
                            <h6 className="font-bold text-lg">Notifications</h6>
                            <Tooltip title="Mark all as read">
                                <Button 
                                    variant="plain" 
                                    shape="circle" 
                                    size="sm" 
                                    icon={<HiOutlineMailOpen className="text-xl"/>}
                                    // onClick={onMarkAllAsRead}
                                />
                            </Tooltip>
                        </div>
                    </Dropdown.Item>

                    <div className={classNames('overflow-y-auto', notificationHeight)}>
                        <ScrollBar direction="ltr">
                            <div className={classNames('flex items-center justify-center', notificationHeight)}>
                                <div className="text-center">
                                    {/* <img className="mx-auto mb-2 max-w-[150px]" src="/img/others/no-notification.png" alt="no-notification" /> */}
                                    <h6 className="font-semibold">No notifications!</h6>
                                    <p className="mt-1">Please check again later</p>
                                </div>
                            </div>
                        </ScrollBar>
                    </div>
                </Dropdown>
                {/* <div className="cursor-pointer transition duration-500 hover:bg-gray-200 h-9 w-9 rounded-full grid place-content-center">
                    <Avatar shape="circle" size="sm" icon={<HiOutlineUser />} />
                </div> */}

                <Dropdown
                    menuStyle={{ minWidth: 240 }}
                    renderTitle={UserAvatar}
                    placement="bottom-end"
                    className="cursor-pointer"
                >
                    <Dropdown.Item variant="header">
                        <div className="py-2 px-3 flex items-center gap-2">
                            {loading ? (
                                <Avatar shape="circle" icon={<HiOutlineUser />} />
                            ) : (
                                <Avatar
                                    shape="circle"
                                    icon={!profile?.image ? <HiOutlineUser /> : null}
                                    // src={profile?.image ? `${image}/${profile.image}` : null}
                                />
                            )}
                            <div>
                                <div className="font-bold text-primary-500">
                                    {profile?.username}
                                </div>
                                <div className="text-xs font-semibold text-primary-500">{profile?.email}</div>
                            </div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item variant="divider" />
                    <Dropdown.Item
                        eventKey="Profile"
                        key="Profile"
                        className="mb-1"
                    >
                        <Link className="flex gap-2 items-center w-full" to="/profile">
                            <span className="text-xl opacity-50"><HiOutlineUser /></span>
							<span className="">Profile</span>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item variant="divider" />
                    <Dropdown.Item onClick={handleSignOut} eventKey="Sign Out" className="gap-2">
                        <span className="text-xl text-red-500 opacity-50">
                            <HiOutlineLogout />
                        </span>
                        <span className="w-full text-red-500">Sign Out</span>
				    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    )
}
export default Header