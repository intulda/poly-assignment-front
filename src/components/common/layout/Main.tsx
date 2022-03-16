import React from "react";
import Board from "../../board/Board";
import Search from "antd/es/input/Search";
import {Select, Space} from "antd";

const { Option } = Select;

const Main = () => {

    const onSearch = () => {

    };

    return (
        <>
            <div className="section_header">
                <h1>최신 게시글</h1>
                <Space align="center">
                    <Search addonBefore={
                        <Select defaultValue="전체" className="select-before">
                            <Option value="all">전체</Option>
                            <Option value="title">제목</Option>
                        </Select>
                    } placeholder="검색" onSearch={onSearch} enterButton />
                </Space>
            </div>
            <Board />
        </>
    )
}
export default Main;