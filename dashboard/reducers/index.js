import { combineReducers } from "redux";
import OptionsReducer from "./reducer_options";
import ActiveOption from "./reducer_active_option";

const rootReducer = combineReducers({
    options: OptionsReducer,
    activeOption: ActiveOption
});

export default rootReducer;