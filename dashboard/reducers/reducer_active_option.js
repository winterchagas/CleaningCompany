import {OPTION_SELECTED} from '../actions'
// State argument is not application state, only the state
// this reducer is responsible for
export default function(state = 'Hi!', action) {
    switch (action.type) {
        case OPTION_SELECTED:
            return action.payload;
    }

    return state;
}