import { injectReducer } from "@/store"
import reducer from "../store"

injectReducer('users', reducer)

const Providers = () => {
    return (
        <div>Providers</div>
    )
}
export default Providers