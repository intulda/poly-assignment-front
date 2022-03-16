import { Button } from 'antd';
import React from 'react';
import {EditOutlined} from "@ant-design/icons";
import "../../../public/css/board.sass";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const IconWrite = () => {
    const navi = useNavigate();
    const onClickWriteHandler = () => {
        navi("/board/write");
    }

    return (
        <Button className="board__write-wrap" type="primary" shape="circle" icon={<EditOutlined />}
            onClick={onClickWriteHandler}
        />
    )
}

export default IconWrite;
