import React, {useEffect} from 'react';
import '../public/css/common/reset.sass';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {GET_USER_INFO_REQUEST_ACTION, USER_RESET_REQUEST_ACTION} from "./reducers/login";
import IconWrite from "./components/board/IconWrite";
import {RootState} from "./reducers";
import {Routes, Route} from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import Main from "./components/common/layout/Main";
import BoardDetail from "./components/board/BoardDetail";
import BoardWrite from "./components/board/BoardWrite";

const App = () => {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector((state: RootState) => state.login.common);
    useEffect(() => {
        const token = localStorage.getItem("refreshToken");
        if (token == null) {
            dispatch(USER_RESET_REQUEST_ACTION());
            return;
        }
        dispatch(GET_USER_INFO_REQUEST_ACTION());
    }, []);

    return (
      <>
          <Layout>
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path={`/board/:boardId`} element={<BoardDetail />}></Route>
                  <Route path={`/board/write`} element={<BoardWrite />}>
                      <Route path={`/board/write/:boardId`} element={<BoardWrite />} />
                  </Route>
              </Routes>
          </Layout>
          {
              isLoggedIn && <IconWrite />
          }
      </>
  )
};

export default App;
