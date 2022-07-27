import { AuthTypes } from "../constants/auth-types"

export const setAuthToken = (token) => {
    return {
        type: AuthTypes.SET_AUTH_TOKEN,
        payload: token,
    }
}

export const delAuthToken = () => {
    return {
        type: AuthTypes.DEL_AUTH_TOKEN,
        payload: null,
    }
}