import React, {createRef, useEffect, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import {Button, Form, Input, message, PageHeader, Space} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {
    BOARD_UPDATE_REQUEST_ACTION,
    BOARD_WRITE_REQUEST_ACTION,
    GET_BOARD_BY_ID_REQUEST_ACTION,
    UPDATE,
    WRITE
} from "../../reducers/board";

const BoardWrite = () => {

    const markdownRef:React.Ref<Editor> = createRef();
    const [form] = Form.useForm();
    let params = useParams();
    const navi = useNavigate();
    const {isLoggedIn} = useSelector((state: RootState) => state.login.common);
    const {status} = useSelector((state: RootState) => state.board.common);
    const {board}:any = useSelector((state: RootState) => state.board.detail);
    const dispatch = useDispatch();

    const [boardContents, setContents] = useState(board[0]?.contents || "");
    const [title, setTitle] = useState(board[0]?.title || "");

    useEffect(() => {
        if (!isLoggedIn) {
            navi("/");
        }

        if (status === WRITE) {
            initBoard();
        }

        if (status === UPDATE) {
            dispatch(GET_BOARD_BY_ID_REQUEST_ACTION(Number(params.boardId)));
        }

    }, [status, params, isLoggedIn])

    const onChangeHandler = () => {
        setContents(markdownRef.current.getInstance().getMarkdown());
    }

    const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
        form.validateFields()
            .then(values => {
                form.resetFields();

                if (status === WRITE) {
                    const data = {...values, boardContents};
                    message.success("작성에 성공하였습니다.");
                    setTimeout(() => {
                        dispatch(BOARD_WRITE_REQUEST_ACTION(data));
                    }, 500)

                }

                if (status === UPDATE) {
                    const data = {boardId: params.boardId, ...values, boardContents};
                    message.success("수정되었습니다.");
                    setTimeout(() => {
                        dispatch(BOARD_UPDATE_REQUEST_ACTION(data));
                    }, 500)


                }

            }).catch(info => {
            console.log('validate failed', info);
        })
    }

    const onFinishFailHandler = () => {
        message.error(`[글작성 실패]: 제목 또는 내용을 입력해주세요.`);
    }

    const initBoard = () => {
        markdownRef.current.getInstance().reset();
        setTitle("");
    }

    return (
        <>
            <Form form={form}
                  name="basic"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                  initialValues={{remember: false}}
                  autoComplete="off"
                  onFinish={onSubmitHandler}
                  onFinishFailed={onFinishFailHandler}
            >
                <Space direction="vertical" size="middle">
                    <PageHeader
                        className="site-page-header"
                        onBack={() => navi("/")}
                        title={
                            status === WRITE ? '게시글 작성'
                                : '게시글 수정'
                        }
                    />
                    <Form.Item name="boardTitle" initialValue={title} rules={[{required: true, message: '제목을 입력해주세요!'}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="boardContents" rules={[{required: true, message: '내용을 입력해주세요!'}]}>
                        <Editor
                            previewStyle="vertical"
                            height="600px"
                            initialEditType="markdown"
                            initialValue={boardContents}
                            useCommandShortcut={true}
                            placeholder="내용을 입력해주세요!"
                            ref={markdownRef}
                            onChange={onChangeHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{float: 'right'}} htmlType={"submit"}>
                            {
                                status === WRITE ? `글쓰기` : '수정하기'
                            }
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </>
    )
}

export default BoardWrite;
