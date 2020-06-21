import * as actionTypes from '../actions/actionTypes';

const initialState= {
    isLoggedIn: null,
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {...state, isLoggedIn: true};
        case actionTypes.LOGOUT:
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
}

export default authReducer;