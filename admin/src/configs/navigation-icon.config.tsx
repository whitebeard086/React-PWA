import {
    HiOutlineViewGridAdd,
    HiOutlineHome,
} from 'react-icons/hi'
import { TbReportMoney, TbSettingsBolt, TbUsersGroup } from 'react-icons/tb'
import { MdOutlineHandyman, MdOutlineVerified } from 'react-icons/md'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    users: <TbUsersGroup />,
    handyMan: <MdOutlineHandyman />,
    finance: <TbReportMoney />,
    kyc: <MdOutlineVerified />,
    system: <TbSettingsBolt />,
}

export default navigationIcon
