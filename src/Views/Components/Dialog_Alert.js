/**
 * name : Dialog Name                      string
 * article : Dialog Article                string
 * buttonName : Right Button Name          string
 * open : Boolean 값을 받을 변수            useState type boolean
 * onClose : Dialog Close Func             Function
 */

import * as React from "react";
/** Components Import */
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const AlertDialog = (props) => {
    return (
        <div className="AlertDialog">
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    style={{
                        width: props.width,
                        height: props.height,
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: props.backColor,
                        color: props.color,
                    }}
                >
                    {props.name}
                </DialogTitle>
                <DialogContent
                    style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 24,
                        padding: 0,
                    }}
                >
                    <DialogContentText id="alert-dialog-description">
                        {props.article}
                    </DialogContentText>
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
                        onClick={props.onClose}
                        autoFocus
                    >
                        {props.buttonName}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

AlertDialog.defaultProps = {
    width: "12.4em",
    height: "2.125em",
    backColor: "#7f1085",
    color: "#fff",
};

export default AlertDialog;
