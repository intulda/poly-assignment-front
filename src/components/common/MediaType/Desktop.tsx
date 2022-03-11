import React from 'react';
import { useMediaQuery } from "react-responsive";

export interface ChildrenType {
    children: any
}

const Desktop = ({ children }: ChildrenType) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}

export default Desktop;