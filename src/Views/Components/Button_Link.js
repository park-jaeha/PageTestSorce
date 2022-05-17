/**
 * name : 버튼에 들어갈 Text                        string
 * width
 * height
 * color
 * fontSize
 * backColor
 * route : 이동할 경로 url                         String
 *
 */

import * as React from "react";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
    return (
        <div className="BasicButton">
            <Link className="BasicButtonLink" to={"/" + props.route}>
                <input
                    className="BasicButtonInput"
                    style={{
                        width: props.width,
                        height: props.height,
                        color: props.color,
                        textAlign: "center",
                        fontSize: props.fontSize,
                        border: 0,
                        boxShadow: "3px 3px 3px #c2c2c2",
                        backgroundColor: props.backColor,
                    }}
                    defaultValue={props.name}
                />
            </Link>
        </div>
    );
};

LinkButton.defaultProps = {
    width: "11.25em",
    height: "2em",
    color: "#fff",
    fontSize: "1.5em",
    backColor: "#fff",
};

export default LinkButton;
