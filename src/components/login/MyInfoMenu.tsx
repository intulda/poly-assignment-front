import {Menu} from "antd";
import React from "react";


const MyInfoMenu = ({onClickHandler}: any) => {

    return (
        <Menu onClick={onClickHandler}>
            <Menu.ItemGroup title="계정 설정">
                <Menu.Item key="myInfo" disabled>내정보 (개발중)</Menu.Item>
                <Menu.Item key="logout">로그아웃</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    )
}

export default MyInfoMenu;