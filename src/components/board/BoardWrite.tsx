import React, {createRef, useEffect, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import {Button, Form, Input, message, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {BOARD_WRITE_REQUEST_ACTION} from "../../reducers/board";

const BoardWrite = () => {

    const markdownRef:React.Ref<Editor> = createRef();
    const [form] = Form.useForm();
    const [contents, setContents] = useState("");
    const navi = useNavigate();
    const {isLoggedIn} = useSelector((state: RootState) => state.login.common);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            navi("/");
        }
    }, [isLoggedIn]);


    const onChangeHandler = () => {
        setContents(markdownRef.current.getInstance().getMarkdown());
    }

    const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
        form.validateFields()
            .then(values => {
                form.resetFields();
                const data = {...values, contents};
                dispatch(BOARD_WRITE_REQUEST_ACTION(data));

            }).catch(info => {
            console.log('validate failed', info);
        })
    }

    const onFinishFailHandler = () => {
        message.error(`[글작성 실패]: 제목 또는 내용을 입력해주세요.`);
    }


    return (
        <>
            <Form form={form}
                  name="basic"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                  initialValues={{remember: true}}
                  autoComplete="off"
                  onFinish={onSubmitHandler}
                  onFinishFailed={onFinishFailHandler}
            >
                <Space direction="vertical" size="middle">
                    <PageHeader
                        className="site-page-header"
                        onBack={() => navi(-1)}
                        title="게시글 작성"
                    />
                    <Form.Item name="title" rules={[{required: true, message: '제목을 입력해주세요!'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="contents" rules={[{required: true, message: '내용을 입력해주세요!'}]}>
                        <Editor
                            previewStyle="vertical"
                            height="600px"
                            initialEditType="markdown"
                            initialValue={contents}
                            useCommandShortcut={true}
                            placeholder="내용을 입력해주세요!"
                            ref={markdownRef}
                            onChange={onChangeHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{float: 'right'}} htmlType={"submit"}>글쓰기</Button>
                    </Form.Item>
                </Space>
            </Form>
        </>
    )
}

export default BoardWrite;
