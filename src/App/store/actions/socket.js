import * as actionTypes from './actionTypes';

export const disconnected = () => {
    return {type: actionTypes.DISCONNECTED};
};

export const connected = () => {
    return {type: actionTypes.CONNECTED};
};