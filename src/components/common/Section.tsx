import React from 'react';
import '../../../public/css/section.sass';

interface sectionTypes {
    children: React.ReactNode,
}

const Section = ({children}: sectionTypes) => {
    return (
        <div className="section_container">
            <div className="section_wrap">
                {children}
            </div>
        </div>
    )
}

export default Section;