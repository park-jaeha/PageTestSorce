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
import GroupButton from "../Components/Button_Group";
import Button from "@mui/material/Button";
import BasicButton from "../Components/Button_Basic";
import BindingSelect from "../Components/Select_Binding";
import AlertDialog from "../Components/Dialog_Alert";
import DataGrid from "../Components/DataGrid_Once";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const A1100_DecisionPop = (props) => {
    const [listArr, setListArr] = React.useState([]); // list array State
    const [selector, setSeclector] = React.useState(""); // 가용/불용 Select state
    const [selectorList, setSeclectorList] = React.useState([]); // 가용/불용 Select List state
    const [selectItem, setSelectItem] = React.useState(null); // List 선택 항목
    const [alertOpen, setAlertOpen] = React.useState(false); // Alert Dialog Toggle
    const dataGridRef = React.useRef(); // Grid ref

    React.useEffect(() => {
        setListArr(props.decisionList);
        setSeclectorList(props.decisionSelectList);
    });

    const gridTitles = [
        {
            field: "asSysCodeId",
            headerName: "SYS",
            width: 60,
            align: "left",
            sortable: false,
        },
        {
            field: "asKindCodeId",
            headerName: "KIND",
            width: 65,
            headerAlign: "center",
            align: "center",
            sortable: false,
        },
        {
            field: "asCodeId",
            headerName: "판정 ",
            width: 60,
            headerAlign: "center",
            align: "center",
            sortable: false,
        },
        {
            field: "asCodeName",
            headerName: "판정 명",
            width: 230,
            align: "left",
            sortable: false,
        },
        {
            field: "asRel01",
            headerName: "가용구분",
            width: 100,
            align: "left",
            sortable: false,
        },
    ];

    const GridClicked = (_selected) => {
        for (let i = 0; i < listArr.length; i++) {
            if (_selected == listArr[i].asCodeId) {
                setSelectItem(i);
                if (listArr[i].asRel01 == "Y") {
                    setSeclector("Y");
                } else if (listArr[i].asRel01 == "N") {
                    setSeclector("N");
                } else {
                    setSeclector("");
                }
            }
        }
        // console.log(_selected);
    };

    const SelectedSelector = (e) => {
        setSeclector(e.target.value);
    };

    const OpenAlert = () => {
        setAlertOpen(true);
    };

    const CloseAlert = () => {
        setAlertOpen(false);
    };

    const ClearDialog = () => {
        setSeclector("");
        setSelectItem(null);
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
                            판정
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
                    <Card
                        style={{
                            marginTop: "5px",
                            marginLeft: "5px",
                            marginRight: "5px",
                        }}
                    >
                        <CardContent style={{ padding: "5px" }}>
                            <DataGrid
                                titles={gridTitles}
                                rows={listArr}
                                ref={dataGridRef}
                                height="59vh"
                                getRowId={(row) => row.asCodeId}
                                onClick={GridClicked}
                            />
                        </CardContent>
                    </Card>
                    <Card
                        style={{
                            marginTop: "5px",
                            marginLeft: "5px",
                            marginRight: "5px",
                            marginBottom: "10px",
                        }}
                    >
                        <CardContent style={{ padding: "0px" }}>
                            <div className="A100TextArea">
                                <div className="A160SelectedLocation">
                                    <BindingSelect
                                        minWidth={250}
                                        name="가용/불용"
                                        value={selector}
                                        label="가용/불용"
                                        SelectChange={SelectedSelector}
                                        array={selectorList}
                                        marginRight="5px"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="CheckPointFooter">
                    <Card
                        style={{
                            marginLeft: "5px",
                            marginRight: "5px",
                        }}
                    >
                        <CardContent
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <BasicButton
                                name="확인"
                                buttonPress={() => {
                                    if (selector == "" || selectItem == null) {
                                        OpenAlert(true);
                                    } else {
                                        props.DecisionConfirm(
                                            selectItem,
                                            selector,
                                            listArr[selectItem].asCodeId
                                        );
                                        ClearDialog();
                                        props.onClose();
                                    }
                                }}
                                width="18em"
                                fontSize="1.3em"
                            />
                        </CardContent>
                    </Card>
                </div>
            </Dialog>
            <AlertDialog
                name="경고"
                article="선택항목을 확인해세요."
                buttonName="확인"
                open={alertOpen}
                onClose={CloseAlert}
            />
        </div>
    );
};

export default A1100_DecisionPop;
