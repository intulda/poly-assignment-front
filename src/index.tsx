import React, {useEffect} from 'react';
import '../public/css/common/reset.sass';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {GET_USER_INFO_REQUEST_ACTION} from "./reducers/login";
import Write from "./components/board/Write";
import {RootState} from "./reducers";
import {GET_BOARD_ALL_REQUEST_ACTION} from "./reducers/board";
import {Routes, Route} from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import Main from "./components/common/layout/Main";
import BoardDetail from "./components/board/BoardDetail";

const App = () => {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector((state: RootState) => state.login.common);
    useEffect(() => {
        dispatch(GET_BOARD_ALL_REQUEST_ACTION());
        const loggedInfo = localStorage.getItem("refreshToken");
        if (loggedInfo == null) {
            return;
        }
        try {
            dispatch(GET_USER_INFO_REQUEST_ACTION());
        } catch (e) {
            localStorage.removeItem("refreshToken");
        }

    }, []);

    return (
      <>
          <Layout>
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path={`/board/:boardId`} element={<BoardDetail />}></Route>
              </Routes>
          </Layout>
          {
              isLoggedIn && <Write />
          }
      </>
  )
};

export default App;