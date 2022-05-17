/**
 *
 * name : Calendar에 적용할 이름        String
 * date : 날짜 저장할 State             state
 * setDate : 날짜 변경 Func             state Func
 * disabled : 날짜 변경 불가 State      true/false      기본값 false
 * width : 크기 설정                    Number
 * disable : 달력 아이콘 사용 설정       true/false
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
    const [date, setDate] = React.useState(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
            <div className="CalendarContent">
                <MobileDatePicker
                    label={props.name}
                    value={props.date}
                    onChange={(newValue) => {
                        // setDate(newValue);
                    }}
                    inputFormat={"yyyy-MM-dd"}
                    mask={"____-__-__"}
                    onAccept={(newValue) => {
                        props.setDate(newValue);
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
                {!props.disable &&
                <button
                    className="CalendarButton"
                    onClick={() => {
                        setCalOpen(true);
                    }}
                    disabled={props.disabled}
                >
                    
                    <CalendarTodayIcon
                        sx={{
                            justifyContent: "center",
                            marginLeft: 1,
                            paddingTop: 1.5,
                            width: 30,
                            height: 40,
                        }}
                    />
                </button>
                }
            </div>
        </LocalizationProvider>
    );
};

BasicDatePicker.defaultProps = {
    width: "85%",
};

export default BasicDatePicker;
