import { AuthTypes } from "../constants/auth-types"

const initSate = {
    token: null,
}

export const authReducer = (state=initSate, {type, payload}) => {
    switch(type) {
        case AuthTypes.SET_AUTH_TOKEN:
            return state;
        case AuthTypes.DEL_AUTH_TOKEN:
            return state;
        default:
            return state;
    }
}