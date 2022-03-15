import { all, fork } from 'redux-saga/effects';
import LoginSaga from './login';

export default function* rootSaga() {
    yield all([
        fork(LoginSaga),
    ]);
}