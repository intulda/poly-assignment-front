import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import {
    CHANGE_LOGIN_ERROR,
    GET_USER_INFO_FAILURE,
    GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS,
    LOGIN_FAILURE, LOGIN_MODAL_CLOSE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS
} from "../reducers/login";
import axios from "axios";
import {message} from "antd";

function loginAPI(action) {
    return axios.post("http://localhost:8082/api/v1/account/login", action.data);
}

function logoutAPI() {
    const token = localStorage.getItem("refreshToken");
    const config = {
        headers: { Authorization: token },
    }
    return axios.post("http://localhost:8082/api/v1/account/logout", {}, config);
}


function getUserInfoAPI() {
    const token = localStorage.getItem("refreshToken");
    const config = {
        headers: { Authorization: token },
    }
    return axios.get("http://localhost:8082/api/v1/account", config);
}

function* login(action) {
    try {
        const result = yield call(loginAPI, action);
        yield put({
            type: LOGIN_SUCCESS,
            data: {
                status: result.status,
                token: result.data?.token
            }
        });
        message.success("로그인 되었습니다.");
        yield put({
            type: LOGIN_MODAL_CLOSE,
        })
        yield put({
            type: GET_USER_INFO_REQUEST,
        })
    } catch (err) {
        yield put({
            type: LOGIN_FAILURE,
            data: {
                message: '로그인 실패'
            }
        });
        message.error("아이디와 비밀번호를 확인해주세요.");
        yield put({
            type: CHANGE_LOGIN_ERROR,
        })
    }
}

function* getUserInfo() {
    try {
        const result = yield call(getUserInfoAPI);
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
        location.href = "/";
    }
}

function* logout() {
    try {
        yield call(logoutAPI);
        yield put({
            type: LOGOUT_SUCCESS,
        });
        message.success("로그아웃 되었습니다.");
    } catch (err) {
        yield put({
            type: LOGOUT_FAILURE,
            data: {
                message: '로그아웃 실패'
            }
        });
    }
}

function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login);
}

function* watchGetUserInfo() {
    yield takeLatest(GET_USER_INFO_REQUEST, getUserInfo);
}

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* loginSaga() {
    yield all([
        fork(watchLogin),
        fork(watchGetUserInfo),
        fork(watchLogout),
    ])
}
