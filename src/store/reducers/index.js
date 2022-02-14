import { ADD_USER } from "../constants/index";

const initialState = {
    user: {}
};
  
function rootReducer(state = initialState, action) {
    if ( action.type === ADD_USER ) {
        return Object.assign({}, state, {
            user : action.payload
        })
    }
    return state;
};
  
export default rootReducer;