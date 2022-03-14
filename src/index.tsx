import React from 'react';
import '../public/css/common/reset.sass';
import 'antd/dist/antd.css';
import Desktop from "./components/common/MediaType/Desktop";
import Tablet from "./components/common/MediaType/Tablet";
import Mobile from "./components/common/MediaType/Mobile";
import Header from "./components/common/Header";
import Section from "./components/common/Section";
import Board from "./components/board/Board";

const App = () => {
    return (
      <div>
          {/*<Desktop>*/}
              <Header />
              <Section>
                  <Board />
              </Section>
          {/*</Desktop>*/}
          {/*<Tablet>*/}
          {/*    <Header />*/}
          {/*    <Section>*/}
          {/*        <Board />*/}
          {/*    </Section>*/}
          {/*</Tablet>*/}
          {/*<Mobile>*/}
          {/*    <Header />*/}
          {/*    <Section>*/}
          {/*        <Board />*/}
          {/*    </Section>*/}
          {/*</Mobile>*/}
      </div>
  )
};

export default App;