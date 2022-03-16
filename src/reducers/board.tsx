interface boardActionType {
    type: string,
    data: any[],
}

interface initialStateType {
    common: {
        pageNumber: number,
        boardLoading: boolean,
        boardWriteLoading: boolean,
        status: string,
    },
    search: {
        keyword: string,
        searchType: string,
    },
    detail: {
        title: string,
        contents: string,
        regDate: string,
    },
    boards: any[],
}

const initialState: initialStateType= {
    common: {
        pageNumber: 0,
        boardLoading: false,
        boardWriteLoading: false,
        status: 'read',
    },
    search: {
        keyword: "",
        searchType: "all",
    },
    detail: {
        title: null,
        contents: null,
        regDate: null,
    },
    boards: [],
}

const READ = "READ";
const WRITE = "WRITE";
const UPDATE = "UPDATE";

export const GET_BOARD_ALL_REQUEST = "GET_BOARD_ALL_REQUEST";
export const GET_BOARD_ALL_SUCCESS = "GET_BOARD_ALL_SUCCESS";
export const GET_BOARD_ALL_FAILURE = "GET_BOARD_ALL_FAILURE";

export const GET_BOARD_BY_ID_REQUEST = "GET_BOARD_BY_ID_REQUEST";
export const GET_BOARD_BY_ID_SUCCESS = "GET_BOARD_BY_ID_SUCCESS";
export const GET_BOARD_BY_ID_FAILURE = "GET_BOARD_BY_ID_FAILURE";

export const CHANGE_BOARD_WRITE_MODE = "CHANGE_BOARD_WRITE_MODE";

export const BOARD_WRITE_REQUEST = "BOARD_WRITE_REQUEST";
export const BOARD_WRITE_SUCCESS = "BOARD_WRITE_SUCCESS";
export const BOARD_WRITE_FAILURE = "BOARD_WRITE_FAILURE";

export const BOARD_WRITE_REQUEST_ACTION = (param: object) => ({
    type: BOARD_WRITE_REQUEST,
    data: param,
})

export const GET_BOARD_ALL_REQUEST_ACTION = (pageNumber: number) => ({
    type: GET_BOARD_ALL_REQUEST,
    data: {pageNumber}
});

export const GET_BOARD_BY_ID_REQUEST_ACTION = (param: number) => ({
    type: GET_BOARD_BY_ID_REQUEST,
    data: param,
})

const reducer = (state: initialStateType = initialState, action: boardActionType) => {
    switch (action.type) {
        case BOARD_WRITE_REQUEST:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardWriteLoading: true,
                }
            }
        case BOARD_WRITE_FAILURE:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardWriteLoading: false,
                }
            }
        case BOARD_WRITE_SUCCESS:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardWriteLoading: false,
                }
            }
        case CHANGE_BOARD_WRITE_MODE:
            return {
                ...state,
                common: {
                    ...state.common,
                    status: WRITE,
                }
            }
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
                detail: action.data,
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
