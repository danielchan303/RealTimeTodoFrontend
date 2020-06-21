import * as actionTypes from '../actions/actionTypes';

const initialState= {
    connected: null,
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.CONNECTED:
            return {connected: true};
        case actionTypes.DISCONNECTED:
            return {connected: false};
        default:
            return state;
    }
}

export default authReducer;