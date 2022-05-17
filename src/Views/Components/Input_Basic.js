/**
 * value : Input Value                        string
 * onChange : value Change Function           Func
 * placeholder : Placeholder                  string
 * changedMode : Input Mode                   string
 * width : width                              string
 * fontSize : fontSize                        string
 * autoFocus : Input autoFocus                boolean
 * inputRef : Input React.useRef              React.useRef
 * disabled : Input 사용 여부                  boolean
 */
import * as React from "react";

const BasicInput = React.forwardRef(function BasicInput(props, forwardedRef) {
    const [text, setText] = React.useState("");

    React.useEffect(() => {
        setText(props.value);
    });

    const SelectedText = () => {
        const input = document.getElementById("BasicInput");
        input.select();
        input.focus();
    };

    return (
        <div className="BasicInput">
            <input
                autoComplete="off"
                disabled={props.disabled}
                id="BasicInput"
                type="text"
                style={{
                    width: props.width,
                    paddingTop: "5px",
                    paddingLeft: "8px",
                    paddingBottom: "5px",
                    fontSize: props.fontSize,
                    border: 0,
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    boxShadow: "2px 2px 2px",
                }}
                inputMode={props.changedMode}
                placeholder={props.placeholder}
                value={text}
                onChange={props.onChange}
                onClick={SelectedText}
                onKeyPress={props.onKeyPress}
                autoFocus={props.autoFocus}
                ref={props.inputRef}
            />
        </div>
    );
});

BasicInput.defaultProps = {
    changedMode: "none",
    width: "11em",
    fontSize: "1.15em",
    autoFocus: true,
};

export default BasicInput;
