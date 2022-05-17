/**
 * name : Name Array                    Array
 * titleIdx : Name Index                Number
 * buttonPress : Button Event           Func
 * backColor : BackgroundColor          string
 */

import * as React from "react";

const ChangedTitle = (props) => {
    const isPress = () => {
        props.buttonPress();
    };

    return (
        <div className="ChangedTitle">
            <input
                type="button"
                value={props.name[props.titleIdx]}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "5vh",
                    marginTop: "15px",
                    marginBottom: "0.5em",
                    fontSize: "1em",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    boxShadow: "3px 3px 3px #c2c2c2",
                    backgroundColor: props.backColor,
                }}
                onClick={isPress}
            />
        </div>
    );
};

ChangedTitle.defaultProps = {
    backColor: "#fff",
};

export default ChangedTitle;
