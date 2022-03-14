import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers";
import {LOGIN_MODAL_CLOSE_ACTION} from "../reducers/login";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

const LoginModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const {isLoginLoading} = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();

    const handleOk = (values: Values) => {



        console.log(values);
        setIsModalVisible(false);
        dispatch(LOGIN_MODAL_CLOSE_ACTION());
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        dispatch(LOGIN_MODAL_CLOSE_ACTION());
    };

    const [form] = Form.useForm();

    return (
        <>
            <Modal title="로그인" visible={isModalVisible}
                   onOk={() => {
                            form.validateFields()
                                .then(values => {
                                    form.resetFields();
                                    handleOk(values);
                                }).catch(info => {
                                    console.log('validate failed', info);
                                })
                   }}
                   onCancel={handleCancel}
                   okText="로그인"
                   okButtonProps={{
                       loading: isLoginLoading,
                   }}
                   cancelText="취소"
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                >
                    <Form.Item
                        label="아이디"
                        name="username"
                        rules={[{required: true, message: '아이디를 입력해주세요!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="비밀번호"
                        name="password"
                        rules={[{required: true, message: '비밀번호를 입력해주세요!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default LoginModal