import React, {useCallback, useEffect, useState} from 'react';
import '../../../public/css/common/header.sass';
import {Avatar, Badge, Button, Dropdown, Menu, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_MODAL_OPEN_ACTION, LOGOUT_REQUEST_ACTION} from "../../reducers/login";
import {RootState} from "../../reducers";
import { UserOutlined } from '@ant-design/icons';
import MyInfoMenu from "../login/MyInfoMenu";

interface MyInfoType {
    onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header = () => {

    const {isLoggedIn} = useSelector((state: RootState) => state.login.common);
    const dispatch = useDispatch();

    const onHandleLoginModal = useCallback(() => {
        dispatch(LOGIN_MODAL_OPEN_ACTION());
    }, []);

    const onClickHandler = (e: any) => {
        if (e.key === 'logout') {
            dispatch(LOGOUT_REQUEST_ACTION());
        }
    }

    return (
        <header className="header_container">
            <div className="header_wrap">
                <h1>폴리 과제용</h1>
                {
                    isLoggedIn
                        ?
                        <>
                            <Dropdown overlay={<MyInfoMenu onClickHandler={onClickHandler} />} placement="bottom">
                                <a>
                                        <span className="1">
                                          <Badge count={0}>
                                            <Avatar icon={<UserOutlined/>}/>
                                          </Badge>
                                        </span>
                                </a>
                            </Dropdown>
                        </>
                        : <Button htmlType="button" onClick={onHandleLoginModal}>로그인</Button>
                }
            </div>

        </header>
    );
}

export default Header;