import * as React from "react";
/** Components Import */
import A700_LocPop from "./A700_LocPop";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Switch,
    TextField,
} from "@mui/material";
import BasicInput from "./../Components/Input_Basic";
import BasicDatePicker from "../Components/DatePicker_Basic";
import BasicButton from "../Components/Button_Basic";
import DataGrid from "../Components/DataGrid_Basic";
import TableCell from "@mui/material/TableCell";
import AudioPlay from "./../../Views/Components/AudioPlay";

const A700 = React.forwardRef((props, ref) => {
    const [text, setText] = React.useState(""); // 바코드 입력 데이터
    const [switchChecked, setSwitchChecked] = React.useState(false); // 키보드 switch 상태
    const [inputMode, setInputMode] = React.useState("none"); // keyboard on/off 상태
    const inputRef = React.useRef(); // 포커싱 용 ref
    const [date, setDate] = React.useState(new Date()); // 날짜 입력 String
    const [locNo, setLocNo] = React.useState(""); // 위치 입력 String
    const [locPopDialogOpen, setLocPopDialogOpen] = React.useState(false); // 위치 팝업 toggle State
    const [listArr, setListArr] = React.useState([]); // 조회 데이터
    const [selectedCount, setSelectedCount] = React.useState(null);
    const GridRef = React.useRef(); // Grid ref
    const audioRef = React.useRef();
    const gridTitles = [
        {
            id: "asSeq",
            label: "NO",
            width: 30,
            align: "left",
        },
        {
            id: "asBarcode",
            label: "BARCODE_NO",
            width: 130,
            align: "left",
        },
        {
            id: "asLocNo",
            label: "위치",
            width: 100,
            align: "left",
        },
        {
            id: "asItemName",
            label: "기준일자",
            width: 120,
            align: "left",
        },
        {
            id: "asCustName",
            label: "스캔시간",
            width: 170,
            align: "left",
        },
    ];

    const SettingTableCells = (_items, _index) => {
        const labelId = `enhanced-table-checkbox-${_index}`;

        return (
            <>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    style={{
                        width: 100,
                        height: props.tableCellHeight,
                        fontSize: props.tableCellFontSize,
                    }}
                    align="left"
                >
                    {_index + 1}
                </TableCell>
                <TableCell align="left">{_items.asBarcode}</TableCell>
                <TableCell align="left">{_items.asLocNo}</TableCell>
                <TableCell align="left">{_items.asStandDt}</TableCell>
                <TableCell align="left">{_items.asScanTm}</TableCell>
            </>
        );
    };

    React.useEffect(() => {
        if (props.date != null && props.date != "") {
            setDate(props.date);
        }
    }, [props.date]);

    React.useEffect(() => {
        setListArr(props.listArr);
    }, [props.listArr]);

    // keyboard switch 이벤트
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

    React.useImperativeHandle(ref, () => ({
        ButtonClear() {
            setListArr([]);
            setLocNo("");
        },
    }));

    // Enter 입력 이벤트, controller의 SelectTbInMCart 연결
    const onKeyPress = (e) => {
        if (e.key == "Enter") {
            props.SelectLogic(text, locNo);
            setText("");
        }
    };

    // locNo Toggle
    const OpenLocPopDialog = () => {
        setLocPopDialogOpen(true);
    };

    const CloseLocPopDialog = () => {
        setLocPopDialogOpen(false);
    };

    return (
        <div className="A100" style={{ marginTop: "10px" }}>
            <Container
                maxWidth="xl"
                className="A100Container"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
            >
                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "10px" }}>
                                <div className="PressingBarcordArea">
                                    <BasicInput
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        placeholder="바코드를 스캔하세요."
                                        changedMode={inputMode}
                                        onKeyPress={onKeyPress}
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
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    <div style={{ width: "90%" }}>
                                        <BasicDatePicker
                                            disabled
                                            name="실사 월의 말일"
                                            date={date}
                                            setDate={setDate}
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // paddingBottom: "10px",
                                        // width:"90%"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                        }}
                                    >
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="위치"
                                            variant="standard"
                                            value={locNo}
                                            color="secondary"
                                            sx={{ width: "80%" }}
                                            onChange={(e) =>
                                                setLocNo(e.target.value)
                                            }
                                            // onClick={() => {
                                            // }}
                                        />
                                        <BasicButton
                                            name="조회"
                                            fontSize="15pt"
                                            buttonPress={() => {
                                                OpenLocPopDialog();
                                                inputRef.current.focus();
                                            }}
                                            width={80}
                                            // height={70}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Card>
                            <CardContent
                                style={{ padding: "10px", height: "43vh" }}
                            >
                                <DataGrid
                                    name="스캔 목록"
                                    titles={gridTitles}
                                    rows={listArr}
                                    SettingTableCells={SettingTableCells}
                                    setSelectedCount={setSelectedCount}
                                    DeleteLogic={props.GridDeleteLogic}
                                    ref={GridRef}
                                    onClick={() => {
                                        return true;
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "10px" }}>
                                <div className="A100Buttons">
                                    <BasicButton
                                        name="초기화"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            setText("");
                                            props.setListArr([]);
                                            setListArr([]);
                                            setLocNo("");
                                            props.setType("info");
                                            props.OpenSnack([
                                                "초기화 되었습니다.",
                                            ]);
                                            audioRef.current.PlayComplet();
                                            inputRef.current.focus();
                                        }}
                                        width="30%"
                                    />
                                    <BasicButton
                                        name="조회"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            props.SelectLogic(text, locNo);
                                            setText("");
                                            inputRef.current.focus();
                                        }}
                                        width="30%"
                                    />
                                    <BasicButton
                                        name="저장"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            props.SaveLogic(
                                                GridRef.current.SendSelected()
                                            );
                                            setText("");
                                            inputRef.current.focus();
                                        }}
                                        width="30%"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <A700_LocPop
                open={locPopDialogOpen}
                onClose={CloseLocPopDialog}
                setLocNo={setLocNo}
            />
            <AudioPlay ref={audioRef} />
        </div>
    );
});

export default A700;
