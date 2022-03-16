import React, {useCallback, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Avatar, Button, Descriptions, Form, PageHeader, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {GET_BOARD_BY_ID_REQUEST_ACTION} from "../../reducers/board";
import {RootState} from "../../reducers";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";


const BoardDetail = () => {
    let params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // @ts-ignore
    const {account_id, board} = useSelector((state: RootState) => state.board.detail);
    const {user}: any = useSelector((state: RootState) => state.login.loginResponse);
    const [contentsDetail, setContents] = useState(board[0].contents);

    useEffect(() => {
        dispatch(GET_BOARD_BY_ID_REQUEST_ACTION(Number(params.boardId)));
    }, [params])

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => {navigate(-1)}}
                title={`${board[0].title}`}
                subTitle={
                    <Space>
                        {board[0].regDate}
                        <Avatar style={{ verticalAlign: 'middle' }} size="large">
                            {board[0].author}
                        </Avatar>
                    </Space>
                }
                extra={
                account_id == user?.id &&
                    [<Button key="1" type="primary">수정</Button>]}
            >
                <br />
                <Form form={form}>
                    <Typography>
                        <Title>{board[0].title}</Title>
                        <Paragraph>
                           {contentsDetail}
                        </Paragraph>
                    </Typography>
                </Form>
            </PageHeader>
        </>
    )
}

export default BoardDetail;