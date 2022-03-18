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
        type: string,
    },
    detail: {
        title: string,
        contents: string,
        regDate: string,
        board: object[],
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
        type: "all",
    },
    detail: {
        title: null,
        contents: null,
        regDate: null,
        board: [],
    },
    boards: [],
}

export const READ = "READ";
export const WRITE = "WRITE";
export const UPDATE = "UPDATE";

export const GET_BOARD_ALL_REQUEST = "GET_BOARD_ALL_REQUEST";
export const GET_BOARD_ALL_SUCCESS = "GET_BOARD_ALL_SUCCESS";
export const GET_BOARD_ALL_FAILURE = "GET_BOARD_ALL_FAILURE";

export const GET_BOARD_BY_ID_REQUEST = "GET_BOARD_BY_ID_REQUEST";
export const GET_BOARD_BY_ID_SUCCESS = "GET_BOARD_BY_ID_SUCCESS";
export const GET_BOARD_BY_ID_FAILURE = "GET_BOARD_BY_ID_FAILURE";

export const CHANGE_BOARD_WRITE_MODE = "CHANGE_BOARD_WRITE_MODE";
export const CHANGE_BOARD_UPDATE_MODE = "CHANGE_BOARD_UPDATE_MODE";

export const BOARD_WRITE_REQUEST = "BOARD_WRITE_REQUEST";
export const BOARD_WRITE_SUCCESS = "BOARD_WRITE_SUCCESS";
export const BOARD_WRITE_FAILURE = "BOARD_WRITE_FAILURE";

export const BOARD_UPDATE_REQUEST = "BOARD_UPDATE_REQUEST";
export const BOARD_UPDATE_SUCCESS = "BOARD_UPDATE_SUCCESS";
export const BOARD_UPDATE_FAILURE = "BOARD_UPDATE_FAILURE";

export const BOARD_DELETE_REQUEST =  "BOARD_DELETE_REQUEST";
export const BOARD_DELETE_SUCCESS = "BOARD_DELETE_SUCCESS";
export const BOARD_DELETE_FAILURE = "BOARD_DELETE_FAILURE";

export const BOARD_DELETE_REQUEST_ACTION = (param: number) => ({
    type: BOARD_DELETE_REQUEST,
    data: param,
})


export const BOARD_UPDATE_REQUEST_ACTION = (param: object) => ({
    type: BOARD_UPDATE_REQUEST,
    data: param,
})

export const CHANGE_BOARD_UPDATE_MODE_ACTION = (param: number) => ({
    type: CHANGE_BOARD_UPDATE_MODE,
    data: param,
})

export const CHANGE_BOARD_WRITE_MODE_ACTION = () => ({
    type: CHANGE_BOARD_WRITE_MODE,
})

export const BOARD_WRITE_REQUEST_ACTION = (param: object) => ({
    type: BOARD_WRITE_REQUEST,
    data: param,
})

export const GET_BOARD_ALL_REQUEST_ACTION = (pageNumber: number = 0, type: string = "all", keyword: string = "") => ({
    type: GET_BOARD_ALL_REQUEST,
    data: {
        pageNumber,
        type,
        keyword
    }
});

export const GET_BOARD_BY_ID_REQUEST_ACTION = (param: number) => ({
    type: GET_BOARD_BY_ID_REQUEST,
    data: param,
})

const reducer = (state: initialStateType = initialState, action: boardActionType) => {
    switch (action.type) {
        case BOARD_DELETE_REQUEST:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardDeleteLoading: true
                }
            }
        case BOARD_DELETE_SUCCESS:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardDeleteLoading: false
                }
            }
        case BOARD_DELETE_FAILURE:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardDeleteLoading: false
                }
            }
        case BOARD_UPDATE_REQUEST:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardWriteLoading: true,
                }
            }
        case BOARD_UPDATE_SUCCESS:
            return {
                ...state,
                common: {
                    ...state.common,
                    status: READ,
                    boardWriteLoading: false,
                },
                detail: {
                    ...state.detail,
                    board: action.data,
                }
            }
        case BOARD_UPDATE_FAILURE:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardWriteLoading: false,
                }
            }
        case CHANGE_BOARD_UPDATE_MODE:
            return {
                ...state,
                common: {
                    ...state.common,
                    status: UPDATE,
                }
            }
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
                    status: READ,
                    boardWriteLoading: false,
                },
            }
        case CHANGE_BOARD_WRITE_MODE:
            return {
                ...state,
                common: {
                    ...state.common,
                    status: WRITE,
                },
                detail: {
                    ...state.detail,
                    board: [],
                }
            }
        case GET_BOARD_BY_ID_REQUEST:
            return {
                ...state,
                common: {
                    ...state.common,
                    boardLoading: true,
                },
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
                },
                detail: {
                    ...state.detail,
                    board: [],
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
