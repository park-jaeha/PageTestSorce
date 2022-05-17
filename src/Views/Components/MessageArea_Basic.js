/**
 * message : Message Value                  state
 * MessageChange : Message Value Changed    Func
 */

import * as React from "react";
import {} from "react-dom";
/** CSS Import */
import "./../../CSS/Components/MessageArea_Basic.css";

const MessageArea = (props) => {
    return (
        <div>
            <footer className="MessageArea">
                <textarea
                    className="MATextArea"
                    style={{
                        fontSize: props.fontSize,
                        fontWeight: props.fontWeight,
                    }}
                    disabled
                    value={props.message}
                    onChange={props.MessageChange}
                />
            </footer>
        </div>
    );
};

MessageArea.defaultProps = {
    fontSize: "0.85em",
    fontWeight: "bold",
};

export default MessageArea;
