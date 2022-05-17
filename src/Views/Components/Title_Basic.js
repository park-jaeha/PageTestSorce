/**
 * name : 버튼에 들어갈 Text                        string
 * backColor: Background Color                     string
 */

import * as React from "react";

const BasicTitle = (props) => {
    return (
        <div className="BasicTitle">
            <div
                style={{
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
            >
                {props.name}
            </div>
        </div>
    );
};

BasicTitle.defaultProps = {
    backColor: "#fff",
};

export default BasicTitle;
