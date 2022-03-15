interface boardActionType {
    type: string,
    data: any[],
}

interface initialStateType {
    common: {
        pageNumber: number,
        boardLoading: boolean,
    },
    search: {
        keyword: string,
        searchType: string,
    },
    board: object,
    boards: any[],
}

const initialState: initialStateType= {
    common: {
        pageNumber: 0,
        boardLoading: false,
    },
    search: {
        keyword: "",
        searchType: "all",
    },
    board: {},
    boards: [],
}

export const GET_BOARD_ALL_REQUEST = "GET_BOARD_ALL_REQUEST";
export const GET_BOARD_ALL_SUCCESS = "GET_BOARD_ALL_SUCCESS";
export const GET_BOARD_ALL_FAILURE = "GET_BOARD_ALL_FAILURE";

export const GET_BOARD_BY_ID_REQUEST = "GET_BOARD_BY_ID_REQUEST";
export const GET_BOARD_BY_ID_SUCCESS = "GET_BOARD_BY_ID_SUCCESS";
export const GET_BOARD_BY_ID_FAILURE = "GET_BOARD_BY_ID_FAILURE";

export const GET_BOARD_ALL_REQUEST_ACTION = () => ({
    type: GET_BOARD_ALL_REQUEST
});

export const GET_BOARD_BY_ID_REQUEST_ACTION = (param: number) => ({
    type: GET_BOARD_BY_ID_REQUEST,
    data: param,
})

const reducer = (state: initialStateType = initialState, action: boardActionType) => {
    switch (action.type) {
        case GET_BOARD_BY_ID_REQUEST:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardLoading: true,
                }
            }
        case GET_BOARD_BY_ID_SUCCESS:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardLoading: false,
                },
                board: action.data,
            }
        case GET_BOARD_BY_ID_FAILURE:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardLoading: false,
                },
            }
        case GET_BOARD_ALL_REQUEST:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardLoading: true,
                }
            }
        case GET_BOARD_ALL_SUCCESS:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardLoading: false,
                },
                boards: action?.data,
            }
        case GET_BOARD_ALL_FAILURE:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardLoading: true,
                },
            }
        default:
            return state
    }
}

export default reducer;