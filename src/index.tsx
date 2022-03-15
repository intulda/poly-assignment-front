import React, {useEffect} from 'react';
import '../public/css/common/reset.sass';
import 'antd/dist/antd.css';
import Header from "./components/common/Header";
import Section from "./components/common/Section";
import Board from "./components/board/Board";
import {useDispatch} from "react-redux";
import {GET_USER_INFO_REQUEST_ACTION} from "./reducers/login";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
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
      <div>
          <Header />
          <Section>
              <Board />
          </Section>
      </div>
  )
};

export default App;