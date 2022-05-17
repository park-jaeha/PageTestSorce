/**
 * name : Calendar에 적용할 이름                  String
 * fromDate : 기간 중 첫번째 State                 state
 * setfromDate : 첫번째 날짜 변경 Func             state Func
 * toDate : 기간 중 두번째 날자                     state
 * setToDate : 두번째 날자 변경 Func                state Func
 * disabled : 날짜 변경 불가 State      true/false      기본값 false
 */

import * as React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import koLocale from "date-fns/locale/ko";
import { MobileDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
/** CSS Import */
import "../../CSS/Components/DatePicker_Basic.css";

const BasicDatePicker = (props) => {
    const [calOpen, setCalOpen] = React.useState(false);
    const [calOpen2, setCalOpen2] = React.useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
            <div
                className="CalendarContent"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <MobileDatePicker
                    label={props.name}
                    value={props.fromDate}
                    inputFormat={"yyyy-MM-dd"}
                    onChange={(newValue) => {
                        // setDate(newValue);
                    }}
                    mask={"____-__-__"}
                    onAccept={(newValue) => {
                        props.setFromDate(newValue);
                    }}
                    disabled={props.disabled}
                    open={calOpen}
                    onClose={() => {
                        setCalOpen(false);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{ width: props.width }}
                            onClick={() => {
                                setCalOpen(true);
                            }}
                            id="standard-basic"
                            variant="standard"
                        />
                    )}
                />
                <div
                    style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                    }}
                >
                    -
                </div>
                <MobileDatePicker
                    label={props.name}
                    value={props.toDate}
                    inputFormat={"yyyy-MM-dd"}
                    onChange={(newValue) => {
                        // setDate(newValue);
                    }}
                    mask={"____-__-__"}
                    onAccept={(newValue) => {
                        props.setToDate(newValue);
                    }}
                    disabled={props.disabled}
                    open={calOpen2}
                    onClose={() => {
                        setCalOpen2(false);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{ width: props.width }}
                            onClick={() => {
                                setCalOpen2(true);
                            }}
                            id="standard-basic"
                            variant="standard"
                        />
                    )}
                />
            </div>
        </LocalizationProvider>
    );
};

BasicDatePicker.defaultProps = {
    width: "40%",
};

export default BasicDatePicker;
