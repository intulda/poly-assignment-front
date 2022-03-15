import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import axios from "axios";
import {
    GET_BOARD_ALL_FAILURE,
    GET_BOARD_ALL_REQUEST,
    GET_BOARD_ALL_SUCCESS, GET_BOARD_BY_ID_FAILURE,
    GET_BOARD_BY_ID_REQUEST, GET_BOARD_BY_ID_SUCCESS
} from "../reducers/board";

function findBoardAllAPI() {
    return axios.get("http://localhost:8082/api/v1/boards");
}

function findBOARDAPI(action) {

    return axios.get(`http://localhost:8082/api/v1/board/${action.data}`);
}

function* findBoardAll() {
    try {
        const result = yield call(findBoardAllAPI);
        yield put({
            type: GET_BOARD_ALL_SUCCESS,
            data: result.data
        });
    } catch (err) {
        yield put({
            type: GET_BOARD_ALL_FAILURE,
            data: {
                message: '로그인 실패'
            }
        });
    }
}

function* findBoard(action) {
    try {
        const result = yield call(findBOARDAPI, action);
        yield put({
           type: GET_BOARD_BY_ID_SUCCESS,
           data: result.data
        });
    } catch (err) {
        yield put({
            type: GET_BOARD_BY_ID_FAILURE,
        })
    }
}

function* watchFindBoardAll() {
    yield takeLatest(GET_BOARD_ALL_REQUEST, findBoardAll);
}

function* watchFindBoard() {
    yield takeLatest(GET_BOARD_BY_ID_REQUEST, findBoard);
}

export default function* boardSaga() {
    yield all([
        fork(watchFindBoardAll),
        fork(watchFindBoard)
    ])
}
