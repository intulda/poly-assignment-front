import React, {useCallback, useState} from "react";
import Board from "../../board/Board";
import Search from "antd/es/input/Search";
import {Select, Space} from "antd";
import {useDispatch} from "react-redux";
import {GET_BOARD_ALL_REQUEST_ACTION} from "../../../reducers/board";

const { Option } = Select;

const Main = () => {
    const [type, setType] = useState("all");

    const dispatch = useDispatch();

    const onChangeSearchHandler = useCallback((value) => {
        setType(value);
    }, [type])

    const onSearch = (keyword: string) => {
        dispatch(GET_BOARD_ALL_REQUEST_ACTION(0, type, keyword));
    };

    return (
        <>
            <div className="section_header">
                <h1>최신 게시글</h1>
                <Space align="center">
                    <Search addonBefore={
                        <Select defaultValue="all" className="select-before" onChange={onChangeSearchHandler}>
                            <Option value="all">전체</Option>
                            <Option value="title">제목</Option>
                            <Option value="name">이름</Option>
                        </Select>
                    } placeholder="검색" onSearch={onSearch} enterButton />
                </Space>
            </div>
            <Board />
        </>
    )
}
export default Main;