import React, {useCallback, useState} from 'react';
import '../../../public/css/common/header.sass';
import {Avatar, Badge, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_MODAL_OPEN_ACTION} from "../../reducers/login";
import {RootState} from "../../reducers";
import { UserOutlined } from '@ant-design/icons';

const Header = () => {

    const {isLoggedIn} = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();

    const onHandleLoginModal = useCallback(() => {
        dispatch(LOGIN_MODAL_OPEN_ACTION());
    }, []);

    return (
        <header className="header_container">
            <div className="header_wrap">
                <h1>Poly Assignment</h1>
                {
                    isLoggedIn
                        ?
                        <span className="avatar-item">
                          <Badge count={0}>
                            <Avatar icon={<UserOutlined/>}/>
                          </Badge>
                        </span>
                        : <Button htmlType="button" onClick={onHandleLoginModal}>로그인</Button>
                }
            </div>
        </header>
    );
}

export default Header;