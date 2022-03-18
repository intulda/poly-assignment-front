import React from "react";
import Header from "../Header";
import Section from "../Section";

interface LayoutType {
    children: React.ReactNode
}

const Layout = ({children}: LayoutType) => {
    return (
        <>
            <Header />
            <Section>
                {children}
            </Section>
        </>

    )
}

export default Layout;