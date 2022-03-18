import { all, fork } from 'redux-saga/effects';
import LoginSaga from './login';
import BoardSaga from './board';

export default function* rootSaga() {
    yield all([
        fork(LoginSaga),
        fork(BoardSaga),
    ]);
}