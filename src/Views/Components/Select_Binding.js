/**
 * minWidth : 최소 넓이                         number
 * name : name(Label)                          string
 * value : value                               useState 변수
 * label : select label                        string
 * SelectChange : select 변경 함수              Func
 * marginLeft : maginLeft                      string
 * array : Select List Array                   Array
 */

import * as React from "react";
/** Components Import */
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const BindingSelect = (props) => {
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
                label={props.label}
            >
                {props.array.map((items, index) => (
                    <MenuItem key={index + 1} value={items.asCodeId}>
                        {items.asCodeName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

BindingSelect.defaultProps = {
    marginLeft: "0px",
    marginRight: "0px",
};

export default BindingSelect;
