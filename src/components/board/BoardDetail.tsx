import React, {useCallback, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import {Avatar, Button, message, PageHeader, Popconfirm, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    BOARD_DELETE_REQUEST_ACTION,
    CHANGE_BOARD_UPDATE_MODE_ACTION,
    GET_BOARD_BY_ID_REQUEST_ACTION
} from "../../reducers/board";
import {RootState} from "../../reducers";
import {Viewer} from "@toast-ui/react-editor";

const BoardDetail = () => {
    let params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // @ts-ignore
    const {account_id, board} = useSelector((state: RootState) => state.board.detail);
    const {user}: any = useSelector((state: RootState) => state.login.loginResponse);

    const onClickUpdateHandler = useCallback(() => {
        dispatch(CHANGE_BOARD_UPDATE_MODE_ACTION(board[0]?.boardId));
    }, [board]);

    const onClickDeleteHandler = useCallback(() => {
        message.success("삭제되었습니다");
        setTimeout(() => {
            dispatch(BOARD_DELETE_REQUEST_ACTION(board[0]?.id));
        }, 500)
    }, [board])

    useEffect(() => {
        dispatch(GET_BOARD_BY_ID_REQUEST_ACTION(Number(params.boardId)));
    }, [params]);

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => {navigate("/")}}
                title={`${board[0]?.title}`}
                subTitle={
                    <Space>
                        {board[0]?.regDate}
                        <Avatar style={{ verticalAlign: 'middle' }} size="large">
                            {board[0]?.author}
                        </Avatar>
                    </Space>
                }
                extra={
                account_id == user?.id &&
                    [
                        <Space size="middle">
                            <Popconfirm placement="top" title={"정말 삭제하시겠습니까?"} onConfirm={onClickDeleteHandler} okText="삭제" cancelText="취소">
                                <Button danger >삭제</Button>
                            </Popconfirm>
                            <Link to={`/board/write/${params.boardId}`}>
                                <Button key="1" type="primary" onClick={onClickUpdateHandler}>수정</Button>
                            </Link>
                        </Space>
                    ]}
            >
                <br />
                {
                    board.length > 0 && <Viewer initialValue={board[0]?.contents}/>
                }
            </PageHeader>
        </>
    )
};
export default BoardDetail;