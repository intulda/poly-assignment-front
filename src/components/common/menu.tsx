import {Menu} from "antd";
import React from "react";
import {useDispatch} from "react-redux";
import {LOGOUT_REQUEST_ACTION} from "../../reducers/login";

const MyInfoMenu = () => {
    const dispatch = useDispatch();

    const onHandleLogout = (e: any) => {
        e.prventDefault();
        dispatch(LOGOUT_REQUEST_ACTION());
    }

    return (
        <Menu>
            <Menu.ItemGroup title="계정 설정">
                <Menu.Item>내정보</Menu.Item>
                <Menu.Item onClick={onHandleLogout}>로그아웃</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    )

}

export default MyInfoMenu;