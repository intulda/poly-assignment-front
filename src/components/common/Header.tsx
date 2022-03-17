import React, {useCallback} from 'react';
import '../../../public/css/common/header.sass';
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_MODAL_OPEN_ACTION} from "../../reducers/login";
import {RootState} from "../../reducers";
import User from "../login/User";
import {Link} from "react-router-dom";

const Header = () => {

    const {isLoggedIn} = useSelector((state: RootState) => state.login.common);
    const dispatch = useDispatch();

    const onHandleLoginModal = useCallback(() => {
        dispatch(LOGIN_MODAL_OPEN_ACTION());
    }, []);

    return (
        <header className="header_container">
            <div className="header_wrap">
                <h1>
                    <Link to={"/"}>폴리 과제용</Link>
                </h1>
                {
                    isLoggedIn
                        ? <User />
                        : <Button htmlType="button" onClick={onHandleLoginModal}>로그인</Button>
                }
            </div>

        </header>
    );
}

export default Header;