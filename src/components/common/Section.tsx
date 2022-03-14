import React from 'react';
import '../../../public/css/section.sass';
import LoginModal from "../LoginModal";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers";

interface sectionTypes {
    children: React.ReactNode,
}

const Section = ({children}: sectionTypes) => {

    const {isLoginModalOpen} = useSelector((state: RootState) => state.login);

    return (
        <div className="section_container">
            <div className="section_wrap">
                {children}
            </div>
            {
                isLoginModalOpen
                && <LoginModal />
            }
        </div>
    )
}

export default Section;