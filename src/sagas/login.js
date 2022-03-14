import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import {
    GET_USER_INFO_FAILURE,
    GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS,
    LOGIN_FAILURE, LOGIN_MODAL_CLOSE,
    LOGIN_REQUEST,
    LOGIN_REQUEST_ACTION,
    LOGIN_SUCCESS
} from "../reducers/login";
import axios from "axios";

function loginAPI(action) {
    return axios.post("http://localhost:8082/api/v1/account/login", action.data);
}

function getUserInfoAPI() {
    const token = localStorage.getItem("refreshToken");
    const config = {
        headers: { Authorization: token },
    }
    return axios.get("http://localhost:8082/api/v1/account", config);
}

function* login(action) {
    const result = yield call(loginAPI, action);
    try {
        yield put({
            type: LOGIN_SUCCESS,
            data: {
                status: result.status,
                token: result.data?.token
            }
        });
        yield put({
            type: LOGIN_MODAL_CLOSE,
        })
    } catch (err) {
        yield put({
            type: LOGIN_FAILURE,
            data: {
                message: '로그인 실패'
            }
        });
    }
}

function* getUserInfo() {
    const result = yield call(getUserInfoAPI);
    try {
        console.log(result);
        yield put({
            type: GET_USER_INFO_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: GET_USER_INFO_FAILURE,
            data: {
                message: '유저정보없음',
            }
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login);
}

function* watchGetUserInfo() {
    yield takeLatest(GET_USER_INFO_REQUEST, getUserInfo);
}

// function* watchLogout() {
//     yield takeLatest(LOGOUt, logout)
// }

export default function* loginSaga() {
    yield all([
        fork(watchLogin),
        fork(watchGetUserInfo),
    ])
}
