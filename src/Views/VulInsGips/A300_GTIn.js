import * as React from "react";
/** Components Import */
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Switch } from "@mui/material";
import BasicButton from "../Components/Button_Basic";
import BasicInput from "./../Components/Input_Basic";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const A300_GTIn = React.forwardRef((props, ref) => {
    const [text, setText] = React.useState(""); // 바코드 입력 String
    const [inputMode, setInputMode] = React.useState("none"); // Keyboard on/off 상태 지정
    const [switchChecked, setSwitchChecked] = React.useState(false); // 키보드 전환 state
    const inputRef = React.useRef(); // 바코드창 포커싱 ref
    const [barcode, setBarcode] = React.useState(""); // Barcode
    const [gtCode, setGtCode] = React.useState(""); // item code
    const [gtName, setGtName] = React.useState(""); // item name
    const [line, setLine] = React.useState(""); // line
    const [equipCode, setEquipCode] = React.useState(""); // equip
    const [equipName, setEquipName] = React.useState(""); // equip
    const [location, setLocation] = React.useState(""); // equip location

    React.useEffect(() => {
        setBarcode(props.gtInBarcode);
        setGtCode(props.gtInItemCode);
        setGtName(props.gtInItemName);
        setLine(props.gtInLine);
        setEquipCode(props.gtInEquipCode);
        setEquipName(props.gtInEquipName);
        setLocation(props.gtInEquipLocation);
    });

    React.useImperativeHandle(ref, () => ({
        ClearAll() {
            setText("");
            setInputMode("none");
            setSwitchChecked(false);
        },
    }));

    // Keyboard on/off Switch 이벤트
    const ChangeSwitch = () => {
        setSwitchChecked(!switchChecked);
        if (inputMode == "none") {
            setInputMode("text");
        } else {
            setInputMode("none");
        }
        inputRef.current.focus();
        setText("");
    };

    // Enter 입력 이벤트
    const onKeyPress = (e) => {
        if (e.key == "Enter") {
            props.GtInScanLogic(text);
            setText("");
        }
    };

    return (
        <div className="A100">
            <Dialog
                fullScreen
                open={props.open}
                onClose={props.onClose}
                TransitionComponent={Transition}
            >
                <AppBar
                    sx={{ position: "relative" }}
                    style={{
                        backgroundColor: "#7f1085",
                    }}
                >
                    <Toolbar>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            가류 GT 투입
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className="CheckPoint" style={{ marginTop: "10px" }}>
                    <Card>
                        <CardContent style={{ pdding: "5px" }}>
                            <div className="PressingBarcordArea">
                                <BasicInput
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="바코드를 스캔하세요."
                                    onKeyPress={onKeyPress}
                                    changedMode={inputMode}
                                    inputRef={inputRef}
                                />
                                <div
                                    className="SwitchWrap"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <p
                                        className="SwitchName"
                                        style={{
                                            color: "#7f1085",
                                            fontSize: "0.688em",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        키보드
                                    </p>
                                    <Switch
                                        checked={switchChecked}
                                        onChange={() => {
                                            ChangeSwitch();
                                        }}
                                        inputProps={{
                                            "aria-label": "controlled",
                                        }}
                                        color="secondary"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="CheckPoint">
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "8vh",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="Barcode"
                                            variant="standard"
                                            value={barcode}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardContent style={{ padding: "5px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "8vh",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="G/T 코드"
                                            variant="standard"
                                            value={gtCode}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardContent style={{ padding: "5px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "8vh",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="G/T 명"
                                            variant="standard"
                                            value={gtName}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardContent style={{ padding: "5px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "8vh",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="라인정보"
                                            variant="standard"
                                            value={line}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardContent style={{ padding: "5px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "8vh",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="설비정보"
                                            variant="standard"
                                            value={equipName}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardContent style={{ padding: "5px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "8vh",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="투입위치"
                                            variant="standard"
                                            value={location}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="CheckPointFooter">
                        <Card
                        // style={{
                        //     marginTop: "60px",
                        // }}
                        >
                            <CardContent>
                                <div className="VulInsGipButtons">
                                    <BasicButton
                                        name="GIP 확인"
                                        fontSize="17pt"
                                        buttonPress={() => {
                                            props.GtInLogicValidation();
                                            inputRef.current.focus();
                                        }}
                                        width="90%"
                                        height={50}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Dialog>
        </div>
    );
});

export default A300_GTIn;
