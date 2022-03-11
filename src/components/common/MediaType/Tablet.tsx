import React from 'react';
import { useMediaQuery } from "react-responsive";
import {ChildrenType} from "./Desktop";

const Tablet = ({ children }: ChildrenType) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null;
}

export default Tablet;