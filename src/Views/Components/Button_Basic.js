/**
 * name : 버튼에 들어갈 Text                        string
 * buttonPress : 버튼 클릭 시 이벤트                function()
 * width : width                                  string
 * height : height                                string
 * color : color                                  string
 * fontSize : fontsize                            string
 * fontWeight: fontWeight                         string
 * backColor : backColor                          string
 */

import * as React from "react";

const BasicButton = (props) => {
    const isPress = () => {
        props.buttonPress();
    };

    return (
        <div
            className="BasicButton"
            style={{
                width: props.width,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <input
                className="BasicButtonInput"
                style={{
                    width: "100%",
                    height: props.height,
                    color: props.color,
                    textAlign: "center",
                    fontSize: props.fontSize,
                    fontWeight: props.fontWeight,
                    border: 0,
                    borderRadius: "5px",
                    boxShadow: "3px 3px 3px #c2c2c2",
                    backgroundColor: props.disabled == true ? "#CFCFCF" : props.backColor,
                    cursor: "pointer",
                }}
                type="button"
                defaultValue={props.name}
                onClick={isPress}
                disabled={props.disabled == true ? true : false}
            />
        </div>
    );
};

BasicButton.defaultProps = {
    width: "11.25em",
    height: "2em",
    color: "#fff",
    fontSize: "1.5em",
    fontWeight: "0",
    backColor: "#7f1085",
};

export default BasicButton;
