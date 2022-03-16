import React from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Layout from "../common/layout/Layout";

const BoardWrite = () => {

    return (
        <>
            <Layout>
                <Editor
                    initialValue="hello react editor world!"
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                />
            </Layout>
        </>
    )
}

export default BoardWrite;