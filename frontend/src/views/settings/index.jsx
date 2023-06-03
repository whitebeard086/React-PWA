import NewCategory from "./components/NewCategory"
import reducer from "./store";
import { injectReducer } from "store/index";

injectReducer("settings", reducer);

const Settings = () => {
    return (
        <div>
            {/* <NewCategory /> */}
        </div>
    )
}
export default Settings