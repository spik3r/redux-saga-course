import { Types } from '../actions/users';

const INITIAL_STATE = {
    items: [],
    error: ""
};

export default function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        //in a more complex app or one with loading states there would be a reducer for ever action, not just the success/fail
        // eg for. `GET_USERS_REQUEST` there could be one that returns the {
        //                 ...state,
        //                 loading: true
        //             }
        //             and so on, etc...
        case Types.GET_USERS_SUCCESS: {
            return {
                ...state,
                items: action.payload.items
            }
        }case Types.USERS_ERROR: {
            console.log(action.payload.error);
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: {
            return state;
        }
    }
}