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
import AlertDialog from "../Components/Dialog_Alert";
import DataGrid from "../Components/DataGrid_Once";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const A1100_DecResonPop = (props) => {
    const [listArr, setListArr] = React.useState([]); // list array State
    const [selectItem, setSelectItem] = React.useState(null); // List 선택 항목
    const [alertOpen, setAlertOpen] = React.useState(false); // Alert Dialog Toggle
    const dataGridRef = React.useRef(); // Grid ref

    React.useEffect(() => {
        setListArr(props.decReasonList);
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
            headerName: "사유 ",
            width: 60,
            headerAlign: "center",
            align: "center",
            sortable: false,
        },
        {
            field: "asCodeName",
            headerName: "사유 명",
            width: 230,
            align: "left",
            sortable: false,
        },
    ];

    const GridClicked = (_selected) => {
        for (let i = 0; i < listArr.length; i++) {
            if (_selected == listArr[i].asCodeId) {
                setSelectItem(i);
            }
        }
        // console.log(_selected);
    };

    const OpenAlert = () => {
        setAlertOpen(true);
    };

    const CloseAlert = () => {
        setAlertOpen(false);
    };

    const ClearDialog = () => {
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
                            판정사유
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
                            marginBottom: "10px",
                        }}
                    >
                        <CardContent style ={{padding:"5px"}}>
                            <DataGrid
                                titles={gridTitles}
                                rows={listArr}
                                ref={dataGridRef}
                                height="75vh"
                                getRowId={(row) => row.asCodeId}
                                onClick={GridClicked}
                            />
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
                                padding:"10px"
                            }}
                        >
                            <BasicButton
                                name="확인"
                                buttonPress={() => {
                                    if (selectItem == null) {
                                        OpenAlert(true);
                                    } else {
                                        props.decResonConfirm(
                                            selectItem,
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
                article="항목을 선택해주세요."
                buttonName="확인"
                open={alertOpen}
                onClose={CloseAlert}
            />
        </div>
    );
};

export default A1100_DecResonPop;
