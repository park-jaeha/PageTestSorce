/**
 * name : Dialog Name                       string
 * open : Dialog Open State                 Boolean
 * onClose : Dialog Close Event             Func
 * buttonCancel : Dialog cancel Event       Func
 * ChangedUrl : Change Combo Data           Func
 * buttonName : Button name                 string
 */

import * as React from "react";
import { useNavigate } from "react-router-dom";
/** Components Import */
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import ThirdKindSelect from "./Select_ThirdKind";
import BasicButton from "./Button_Basic";

const Global = require("../../Global");

const UrlDialog = (props) => {
    const [urlNum, setUrlNum] = React.useState(0);
    const navigate = useNavigate();

    const ChangedUrlNum = (e) => {
        setUrlNum(e.target.value);
    };

    return (
        <div className="InputDialog">
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    style={{
                        width: "12.2em",
                        height: "3.125em",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#7f1085",
                        color: "#fff",
                    }}
                >
                    {props.name}
                </DialogTitle>
                <DialogContent
                    style={{
                        height: "18em",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 24,
                        padding: 0,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <ThirdKindSelect
                            minWidth={110}
                            name="URL"
                            value={urlNum}
                            label="URL"
                            SlectChange={ChangedUrlNum}
                            itemValue1={0}
                            itemLabel1="Localhost"
                            itemValue2={1}
                            itemLabel2="Dev"
                            itemValue3={2}
                            itemLabel3="Operation"
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <BasicButton
                            name="to A600"
                            buttonPress={() => {
                                navigate("/A600");
                            }}
                        />
                        <BasicButton
                            name="to A1100"
                            buttonPress={() => {
                                navigate("/A1100");
                            }}
                        />
                    </div>
                    <div>
                        <p style={{ marginBottom: "10px" }}>
                            Develope : {Global.devVersion}
                        </p>
                        <p>Operation : {Global.OperVersion}</p>
                    </div>
                </DialogContent>
                <DialogActions
                    style={{
                        paddingTop: 0,
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingBottom: 8,
                    }}
                >
                    <Button
                        style={{ color: "#e877ef" }}
                        onClick={props.buttonCancel}
                    >
                        취소
                    </Button>
                    <Button
                        style={{ color: "#e877ef" }}
                        onClick={() => {
                            props.ChangedUrl(urlNum);
                            props.buttonCancel();
                        }}
                        autoFocus
                    >
                        {props.buttonName}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UrlDialog;
