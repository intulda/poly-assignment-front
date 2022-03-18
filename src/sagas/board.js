import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import axios from "axios";
import {
    BOARD_DELETE_FAILURE,
    BOARD_DELETE_REQUEST, BOARD_DELETE_SUCCESS,
    BOARD_UPDATE_FAILURE,
    BOARD_UPDATE_REQUEST, BOARD_UPDATE_SUCCESS,
    BOARD_WRITE_FAILURE,
    BOARD_WRITE_REQUEST, BOARD_WRITE_SUCCESS,
    GET_BOARD_ALL_FAILURE,
    GET_BOARD_ALL_REQUEST,
    GET_BOARD_ALL_SUCCESS, GET_BOARD_BY_ID_FAILURE,
    GET_BOARD_BY_ID_REQUEST, GET_BOARD_BY_ID_SUCCESS
} from "../reducers/board";
import {message} from "antd";

function findBoardAllAPI(action) {
    return axios.get("http://localhost:8082/api/v1/boards", {
        params: action.data,
    });
}

function findBoardAPI(action) {
    return axios.get(`http://localhost:8082/api/v1/board/${action.data}`);
}

function writeBoardAPI(action) {
    const token = localStorage.getItem("refreshToken");
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(`http://localhost:8082/api/v1/board`, action.data, config);
}

function updateBoardAPI(action) {
    const token = localStorage.getItem("refreshToken");
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`http://localhost:8082/api/v1/board`, action.data, config);
}

function deleteBoardAPI(action) {
    const token = localStorage.getItem("refreshToken");
    const config = {
        data: {
            boardId: action.data,
        },
        headers: { Authorization: token },
    }
    return axios.delete(`http://localhost:8082/api/v1/board`, config);
}

function* findBoardAll(action) {
    try {
        const result = yield call(findBoardAllAPI, action);
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
        const result = yield call(findBoardAPI, action);
        yield put({
           type: GET_BOARD_BY_ID_SUCCESS,
           data: result.data
        });
    } catch (err) {
        yield put({
            type: GET_BOARD_BY_ID_FAILURE,
        })

        location.href = "/";
    }
}

function* writeBoard(action) {
    try {
        const result = yield call(writeBoardAPI, action);
        yield put({
            type: BOARD_WRITE_SUCCESS,
        });
        location.href = `/board/${result.data}`;
    } catch (err) {
        yield put({
            type: BOARD_WRITE_FAILURE,
        })
        message.error("글작성에 실패하였습니다. 관리자에게 문의바랍니다.").then(() => {
            location.href="/";
        })
    }
}

function* updateBoard(action) {
    try {
        const result = yield call(updateBoardAPI, action);
        yield put({
            type: BOARD_UPDATE_SUCCESS,
            data: result.data
        });
        location.href = `/board/${result.data.id}`;
    } catch (err) {
        yield put({
            type: BOARD_UPDATE_FAILURE,
        })
        message.error("글수정에 실패하였습니다. 관리자에게 문의바랍니다.")

    }
}

function* deleteBoard(action) {
    try {
        const result = yield call(deleteBoardAPI, action);
        yield put({
            type: BOARD_DELETE_SUCCESS,
            data: result.data,
        });
        location.href="/";

    } catch (err) {
        yield put({
            type: BOARD_DELETE_FAILURE,
        })
        message.error("삭제 실패하였습니다. 관리자에게 문의바랍니다.").then(() => {
            location.href = "/";
        })
    }
}

function* watchFindBoardAll() {
    yield takeLatest(GET_BOARD_ALL_REQUEST, findBoardAll);
}

function* watchFindBoard() {
    yield takeLatest(GET_BOARD_BY_ID_REQUEST, findBoard);
}

function* watchWriteBoard() {
    yield takeLatest(BOARD_WRITE_REQUEST, writeBoard);
}

function* watchUpdateBoard() {
    yield takeLatest(BOARD_UPDATE_REQUEST, updateBoard);
}

function* watchDeleteBoard() {
    yield takeLatest(BOARD_DELETE_REQUEST, deleteBoard);
}

export default function* boardSaga() {
    yield all([
        fork(watchFindBoardAll),
        fork(watchFindBoard),
        fork(watchWriteBoard),
        fork(watchUpdateBoard),
        fork(watchDeleteBoard),
    ])
}
