import * as React from "react";
/** Components Import */
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChoiceList from "../Components/List_Choice";
import BasicButton from "../Components/Button_Basic";
import BindingSelect from "../Components/Select_Binding";
import DataGrid from "../Components/DataGrid_Basic";
import axios from "axios";
import SnackBar from "./../../Views/Components/MessageArea_Snack";
import TableCell from "@mui/material/TableCell";
import AudioPlay from "./../../Views/Components/AudioPlay";

const Global = require("../../Global");

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const A700_LocPop = (props) => {
    const [itemData, setItemData] = React.useState("");
    const [itemArray, setItemArray] = React.useState([]);
    const [procData, setProcData] = React.useState("");
    const [procArray, setProcArray] = React.useState([]);
    const [listArr, setListArr] = React.useState([]);
    const [selectedCount, setSelectedCount] = React.useState(null);
    const audioRef = React.useRef();
    const [type, setType] = React.useState("success");
    const [typeToggle, setTypeToggle] = React.useState([
        "success",
        "warning",
        "error",
        "info",
    ]);

    const [snackToggle, setSnackToggle] = React.useState(false);
    const [snackArticle, setSnackArticle] = React.useState(null);

    const OpenSnack = (_message) => {
        setSnackArticle(
            _message.map((items, index) => <li key={index}>{items}</li>)
        );
        setSnackToggle(true);
    };

    const CloseSnack = () => {
        setSnackToggle(false);
    };

    const GridRef = React.useRef(); // Grid ref
    const gridTitles = [
        {
            id: "asLocId",
            label: "LOC_ID",
            width: 70,
            align: "left",
        },
        {
            id: "asLocDesc",
            label: "?????????",
            width: 300,
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
                    {_items.asLocId}
                </TableCell>
                <TableCell align="left">{_items.asLocDesc}</TableCell>
            </>
        );
    };
    let tempItem;
    let tempProc;

    React.useEffect(async () => {
        //?????? ???????????? ?????????
        await axios
            .get(
                Global.useUrl +
                    Global.detailUrl._Commons.A700._ComboboxBindingSelect,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("LoginInfo")).token,
                    },
                    params: {
                        PlantId: Global._common._DefaultParams._PlantId,
                        SysCodeId: "CM",
                        KindCodeId: "17",
                        CodeId: "",
                    },
                }
            )
            .then((Response) => {
                let resData = Response.data;
                let dataCount = Response.data.length;

                if (dataCount > 0) {
                    setItemArray(resData);
                }
            })
            .catch((Error) => {
                setType(typeToggle[2]);
                OpenSnack(["Error : " + Error]);
                audioRef.current.PlayError();
            });
        // ?????? ???????????? ?????????
        await axios
            .get(
                Global.useUrl +
                    Global.detailUrl._Commons.A700._ComboboxBindingSelect,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("LoginInfo")).token,
                    },
                    params: {
                        PlantId: Global._common._DefaultParams._PlantId,
                        SysCodeId: "CM",
                        KindCodeId: "14",
                        CodeId: "",
                    },
                }
            )
            .then((Response) => {
                let resData = Response.data;
                let dataCount = Response.data.length;

                if (dataCount > 0) {
                    setProcArray(resData);
                }
            })
            .catch((Error) => {
                setType(typeToggle[2]);
                OpenSnack(["Error : " + Error]);
                return false;
            });
    }, []);

    // ???????????? 1 (????????????)
    const SelectChange1 = (e) => {
        setItemData(e.target.value);
        tempItem = e.target.value;
        ComboboxChanged();
    };

    // ???????????? 2 (??????)
    const SelectChange2 = (e) => {
        setProcData(e.target.value);
        tempProc = e.target.value;
        ComboboxChanged();
    };

    // ?????? ????????? (Combobox ?????? ???)
    const ComboboxChanged = async () => {
        await axios
            .get(
                Global.useUrl + Global.detailUrl._Commons.A700._LocNoDataSelect,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("LoginInfo")).token,
                    },
                    params: {
                        LocId: "",
                        LocDesc: "",
                        UseYn: "Y",
                        ItemGrp: tempItem,
                        ProcId: tempProc,
                        FactId: "",
                    },
                }
            )
            .then((Response) => {
                let resData = Response.data;
                let dataCount = Response.data.length;

                setListArr(resData);
            })
            .catch((Error) => {
                setType(typeToggle[2]);
                OpenSnack(["Error : " + Error]);
                audioRef.current.PlayError();
                return false;
            });
    };

    return (
        <div className="A950_Container_CheckPoint">
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
                            LOC ??????
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
                <Card>
                    <CardContent style={{ padding: "15px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <BindingSelect
                                label="????????????"
                                variant="standard"
                                minWidth={150}
                                name="????????????"
                                value={itemData}
                                SelectChange={SelectChange1}
                                array={itemArray}
                            />
                            <BindingSelect
                                minWidth={150}
                                marginLeft={"10px"}
                                name="??????"
                                value={procData}
                                label="??????"
                                SelectChange={SelectChange2}
                                array={procArray}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent style={{ padding: "15px", height: "67vh" }}>
                        <DataGrid
                            name="?????? ??????"
                            titles={gridTitles}
                            rows={listArr}
                            gridHeight="50vh"
                            setSelectedCount={setSelectedCount}
                            SettingTableCells={SettingTableCells}
                            ref={GridRef}
                            onClick={() => {
                                return true;
                            }}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent style={{ padding: "10px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <BasicButton
                                name="??????"
                                fontSize="16pt"
                                buttonPress={() => {
                                    if (
                                        GridRef.current.SendSelected().length ==
                                        0
                                    ) {
                                        setType(typeToggle[1]);
                                        OpenSnack(["???????????? ??????????????????"]);
                                        audioRef.current.PlayError();
                                        return;
                                    }
                                    if (
                                        GridRef.current.SendSelected().length >
                                        1
                                    ) {
                                        setType(typeToggle[1]);
                                        OpenSnack([
                                            "????????? ???????????? ??????????????????",
                                        ]);
                                        audioRef.current.PlayError();
                                        return;
                                    } else {
                                        props.setLocNo(
                                            listArr[
                                                GridRef.current.SendSelected()
                                            ].asLocId
                                        );
                                        setItemData("");
                                        setProcData("");
                                        setListArr([]);
                                        props.onClose();
                                    }
                                }}
                                width="90%"
                            />
                        </div>
                    </CardContent>
                </Card>
            </Dialog>
            <SnackBar
                open={snackToggle}
                onClose={CloseSnack}
                time={3500}
                type={type}
                article={snackArticle}
            />
            <AudioPlay ref={audioRef} />
        </div>
    );
};

export default A700_LocPop;
