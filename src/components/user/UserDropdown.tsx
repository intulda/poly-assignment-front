import React from "react";
import MyInfoMenu from "../login/MyInfoMenu";
import {Avatar, Badge, Dropdown} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {LOGOUT_REQUEST_ACTION} from "../../reducers/login";
import {useDispatch} from "react-redux";

const UserDropdown = () => {

    const dispatch = useDispatch();
    const onClickHandler = (e: any) => {
        if (e.key === 'logout') {
            dispatch(LOGOUT_REQUEST_ACTION());
        }
    }

    return (
        <Dropdown overlay={<MyInfoMenu onClickHandler={onClickHandler} />} placement="bottom">
            <a>
                <span>
                  <Badge count={0}>
                    <Avatar size={"large"} icon={<UserOutlined/>}/>
                  </Badge>
                </span>
            </a>
        </Dropdown>
    )
}

export default UserDropdown;