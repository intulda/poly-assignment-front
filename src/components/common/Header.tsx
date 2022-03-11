import React, {useState} from 'react';
import '../../../public/css/common/header.sass';
import {Button} from "antd";

const Header = () => {

    const onHandleLoginModal = () => {
        
    }

    return (
        <header className="header_container">
            {/*TODO: MENU ITEM, LOGIN*/}
            <div className="header_wrap">
                <h1>Poly Assignment</h1>
                <Button onClick={onHandleLoginModal}>로그인</Button>
            </div>
        </header>
    )
}

export default Header;