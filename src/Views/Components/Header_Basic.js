/**
 * name : Header 제목                  String
 */

import * as React from "react";
import {} from "react-dom";
/** CSS Import */
import "./../../CSS/Components/Header_Basic.css";
/** Image Import */
import LogoImg from "./../../Images/Logo/purple_logo.png";

const BasicHeader = (props) => {
    return (
        <header className="BasicHeader">
            <div className="BasicHeaderLogo">
                <img src={LogoImg} />
            </div>
            <div className="BasicHeaderContens">
                <span>{props.name}</span>
            </div>
            <div className="emptyBox" />
        </header>
    );
};

export default BasicHeader;
