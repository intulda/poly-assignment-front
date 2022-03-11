
interface initialStateType {
    isLoggedIn: boolean,
    isLoginLoading: boolean,
}

const initialState: initialStateType = {
    isLoggedIn: false,
    isLoginLoading: false
}

export const LOGIN_REQUEST: string = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAILURE";

const reducer = (state: initialStateType = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        return {
                isLoginLoading: true,
                ...state
            }
        default:
            return state;
    }
}