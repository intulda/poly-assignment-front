export interface LoginRootStateType {
    isLoggedIn: boolean,
    isLoginLoading: boolean,
    isLoginError: boolean,
    isLoginModalOpen: boolean,
}

const initialState: LoginRootStateType = {
    isLoggedIn: false,
    isLoginLoading: false,
    isLoginError: false,
    isLoginModalOpen: false,
}

interface actionType {
    type: string,
}

export const LOGIN_REQUEST: string = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAILURE";

export const LOGIN_MODAL_OPEN: string = "LOGIN_MODAL_OPEN";
export const LOGIN_MODAL_CLOSE: string = "LOGIN_MODAL_CLOSE";

export const LOGIN_MODAL_OPEN_ACTION = () => ({
    type: LOGIN_MODAL_OPEN,
})

export const LOGIN_MODAL_CLOSE_ACTION = () => ({
    type: LOGIN_MODAL_CLOSE,
})

const reducer = (state: LoginRootStateType = initialState, action: actionType) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        return {
                ...state,
                isLoginLoading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoginLoading: false,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoginLoading: false,
                isLoginError: true,
            }
        case LOGIN_MODAL_OPEN:
            return {
                ...state,
                isLoginModalOpen: true,
            }
        case LOGIN_MODAL_CLOSE:
            return {
                ...state,
                isLoginModalOpen: false,
            }
        default:
            return state;
    }
}

export default reducer;