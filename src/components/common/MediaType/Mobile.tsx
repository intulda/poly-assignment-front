import React from 'react';
import { useMediaQuery } from "react-responsive";
import {ChildrenType} from "./Desktop";

const Mobile = ({ children }: ChildrenType) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}

export default Mobile;