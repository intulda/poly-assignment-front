import {LoginValues} from "../components/login/LoginModal";

export interface LoginRootStateType {
    common: {
        isLoggedIn: boolean,
        isLoginLoading: boolean,
        isLoginError: boolean,
        isLoginModalOpen: boolean,
    },
    loginRequest: {
        username: string,
        password: string
    },
    loginResponse: {
        status: number,
        token: string,
        user: object,
    }
}

const initialState: LoginRootStateType = {
    common: {
        isLoggedIn: false,
        isLoginLoading: false,
        isLoginError: false,
        isLoginModalOpen: false,
    },
    loginRequest: {
        username: null,
        password: null,
    },
    loginResponse: {
        status: null,
        token: null,
        user: null,
    }
}

interface actionType {
    data: {
        status: number,
        token: string
    },
    type: string,
}

export const LOGIN_REQUEST: string = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAILURE";

export const LOGOUT_REQUEST: string = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: string = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE: string = "LOGOUT_FAILURE";
export const CHANGE_LOGIN_ERROR: string = "CHANGE_LOGIN_ERROR";

export const LOGIN_MODAL_OPEN: string = "LOGIN_MODAL_OPEN";
export const LOGIN_MODAL_CLOSE: string = "LOGIN_MODAL_CLOSE";

export const GET_USER_INFO_REQUEST: string = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS: string = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE: string = "GET_USER_INFO_FAILURE";

export const LOGOUT_REQUEST_ACTION = () => ({
    type: LOGOUT_REQUEST,
})

export const GET_USER_INFO_REQUEST_ACTION = () => ({
    type: GET_USER_INFO_REQUEST,
})

export const LOGIN_REQUEST_ACTION = (data: LoginValues) => ({
    type: LOGIN_REQUEST,
    data: data
})

export const LOGIN_MODAL_OPEN_ACTION = () => ({
    type: LOGIN_MODAL_OPEN,
})

export const LOGIN_MODAL_CLOSE_ACTION = () => ({
    type: LOGIN_MODAL_CLOSE,
})

const reducer = (state: LoginRootStateType = initialState, action: actionType) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return {
                ...state
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem("refreshToken");
            return {
                ...state,
                common: {
                    ...state.common,
                    isLoggedIn: false,
                },
                loginResponse: {
                    ...state.loginResponse,
                    user: null,
                    token: null
                }
            }
        case CHANGE_LOGIN_ERROR:
            return {
                ...state,
                common: {
                    ...state.common,
                    isLoginError: false,
                }

            }
        case LOGIN_REQUEST:
        return {
                ...state,
                common: {
                    ...state.common,
                    isLoginLoading: true,
                },
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("refreshToken", `Bearer ${action.data?.token}`);
            return {
                ...state,
                common: {
                    ...state.common,
                    isLoggedIn: true,
                    isLoginLoading: false,
                },
                loginResponse: {
                    ...action.data
                }
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                common: {
                    ...state.common,
                    isLoginLoading: false,
                    isLoginError: true,
                },
                loginRequest: {
                    username: null,
                    password: null,
                },

            }
        case LOGIN_MODAL_OPEN:
            return {
                ...state,
                common: {
                    ...state.common,
                    isLoginModalOpen: true,
                },

            }
        case LOGIN_MODAL_CLOSE:
            return {
                ...state,
                common: {
                    ...state.common,
                    isLoginModalOpen: false,
                },

            }
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                loginResponse: {
                    ...state.loginResponse,
                    user: action.data,
                }
            }
        case GET_USER_INFO_SUCCESS:
            console.log(action);

            return {
                ...state,
                common: {
                    ...state.common,
                    isLoggedIn: true
                },
                loginResponse: {
                    ...state.loginResponse,
                    user: action.data,
                }
            }
        case GET_USER_INFO_FAILURE:
            return {
                ...state,
                common: {
                    ...state.common,
                    isLoggedIn: false,
                }
            }
        default:
            return state;
    }
}

export default reducer;