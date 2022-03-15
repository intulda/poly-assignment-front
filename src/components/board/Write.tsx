import { Button } from 'antd';
import React from 'react';
import {EditOutlined, EditTwoTone} from "@ant-design/icons";
import "../../../public/css/board.sass";

const Write = () => {
    return (
        <Button className="board__write-wrap" type="primary" shape="circle" icon={<EditOutlined />} />
    )
}

export default Write;