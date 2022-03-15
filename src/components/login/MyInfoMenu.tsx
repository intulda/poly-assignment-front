import {Menu} from "antd";
import React from "react";


const MyInfoMenu = ({onClickHandler}: any) => {

    return (
        <Menu onClick={onClickHandler}>
            <Menu.ItemGroup title="계정 설정">
                <Menu.Item key="myInfo">내정보</Menu.Item>
                <Menu.Item key="logout">로그아웃</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    )
}

export default MyInfoMenu;