import { useAppSelector } from "../store"

const Stats = () => {
    const { allBookings, allClients, allProviders } = useAppSelector((state) => state.home.data)
    return (
        <div>Stats</div>
    )
}
export default Stats