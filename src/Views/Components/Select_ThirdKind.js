/**
 * minWidth : 최소 넓이                         number
 * name : name(Label)                          string
 * value : value                               useState 변수
 * label : select label                        string
 * SelectChange : select 변경 함수              Func
 * marginLeft : maginLeft                      string
 * itemValue1 : first item value               string or number
 * itemLabel1 : first item label               string
 * itemValue2 : second item value              string or number
 * itemLabel2 : second item label              string
 * itemValue3 : third item value              string or number
 * itemLabel3 : third item label              string
 */

import * as React from "react";
/** CSS Import */
/** Components Import */
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const ThirdKindSelect = (props) => {
    return (
        <FormControl
            variant="standard"
            sx={{ minWidth: props.minWidth }}
            style={{
                top: "2px",
                marginLeft: props.marginLeft,
                marginRight: props.marginRight,
            }}
        >
            <InputLabel id="demo-simple-select-standard-label">
                {props.name}
            </InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props.value}
                onChange={props.SelectChange}
                label="props.label"
            >
                <MenuItem value={props.itemValue1}>{props.itemLabel1}</MenuItem>
                <MenuItem value={props.itemValue2}>{props.itemLabel2}</MenuItem>
                <MenuItem value={props.itemValue3}>{props.itemLabel3}</MenuItem>
            </Select>
        </FormControl>
    );
};

ThirdKindSelect.defaltvalue = {
    marginLeft: "0px",
    marginRight: "0px",
};

export default ThirdKindSelect;
