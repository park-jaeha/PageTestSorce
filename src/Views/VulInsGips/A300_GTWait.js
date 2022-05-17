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
import ChangedTitle from "./../Components/Title_Changed";
import BasicList from "../Components/List_Basic";
import DataGrid from "../Components/DataGrid_Once";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const A300_GTWait = React.forwardRef((props, ref) => {
    const [text, setText] = React.useState(""); // 바코드 입력 String
    const [inputMode, setInputMode] = React.useState("none"); // Keyboard on/off 상태 지정
    const [switchChecked, setSwitchChecked] = React.useState(false); // 키보드 전환 state
    const inputRef = React.useRef(); // 바코드창 포커싱 ref
    const [titleIdx, setTitleIdx] = React.useState(0); // title 선택 Index
    const [titleColor, setTitleColor] = React.useState("#fff");
    const [line, setLine] = React.useState("");
    const [equip, setEquip] = React.useState("");
    const [listArr, setListArr] = React.useState([]); // 좌측 대기열
    const [listArr2, setListArr2] = React.useState([]); // 우측 대기열
    const TitleArr = ["좌측 대기열", "우측 대기열"]; // 화면 리스트
    const dataGridRef = React.useRef(); // Grid ref

    React.useEffect(() => {
        setTitleIdx(props.gtWaitListIdx);
        setLine(props.gtWaitLineName);
        setEquip(props.gtWaitEquipName);
        setListArr(props.gtWaitLList);
        setListArr2(props.gtWaitRList);

        if (props.gtWaitListIdx == 0) {
            setTitleColor("#caeed1");
        } else if (props.gtWaitListIdx == 1) {
            setTitleColor("#adb0e1");
        }
    });

    React.useEffect(() => {
        if (titleIdx == 0) {
            setTitleColor("#caeed1");
        } else if (titleIdx == 1) {
            setTitleColor("#adb0e1");
        }
    }, [titleIdx]);

    React.useImperativeHandle(ref, () => ({
        ClearAll() {
            setText("");
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
            props.GtWaitScanLogic(text);
            setText("");
        }
    };

    // 화면 전환 버튼 이벤트
    const TitlePressed = () => {
        props.setGtWaitListIdx((props.gtWaitListIdx + 1) % 2);
        setText("");
        inputRef.current.focus();
    };

    const gridTitles = [
        {
            field: "asBarcodeNo",
            headerName: "바코드",
            width: 120,
            align: "left",
        },
        {
            field: "asItemId",
            headerName: "품번코드",
            width: 110,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "asEventTime",
            headerName: "투입일시",
            width: 170,
            align: "left",
        },
    ];

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
                            가류 GT 대기열 조회
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
                <div className="CheckPoint">
                    <Card>
                        <CardContent style={{ padding: "8px" }}>
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
                                            label="라인"
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
                                            label="설비"
                                            variant="standard"
                                            value={equip}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="CheckPoint">
                        <Card>
                            <CardContent>
                                <ChangedTitle
                                    name={TitleArr}
                                    titleIdx={titleIdx}
                                    buttonPress={TitlePressed}
                                    backColor={titleColor}
                                />
                            </CardContent>
                            <CardContent>
                                {titleIdx == 0 && (
                                    <DataGrid
                                        titles={gridTitles}
                                        rows={listArr}
                                        getRowId={(row) => row.asBarcodeNo}
                                        onClick={() => {
                                            return true;
                                        }}
                                        height={250}
                                    />
                                )}
                                {titleIdx == 1 && (
                                    <DataGrid
                                        titles={gridTitles}
                                        rows={listArr2}
                                        getRowId={(row) => row.asBarcodeNo}
                                        onClick={() => {
                                            return true;
                                        }}
                                        height={250}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Dialog>
        </div>
    );
});

export default A300_GTWait;
