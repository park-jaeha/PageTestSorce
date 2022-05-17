/**
 * array                리스트 데이터                                            array
 * primary : 대이름 Binding                                                  Func
 * secondary: 소이름 Binding                                                 Func
 * Selected : Select Item Click Event                                       Func
 */

import * as React from "react";
/** Components Import */
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { Checkbox } from "@mui/material";

const ChoiceList = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [checked, setChecked] = React.useState([]);
    const [backColor, setBackColor] = React.useState("#fff");

    React.useEffect(() => {
        props.Selected(checked);
    }, [checked]);

    React.useEffect(() => {
        setChecked([]);
    }, [props.array]);

    const handleToggle = (menus) => () => {
        const currentIndex = checked.indexOf(menus);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(menus);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // console.log(checked);
        setChecked(newChecked);
        // props.Selected(checked);
    };
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        //  props.Selected(index);
    };

    return (
        <List
            sx={{
                width: "100%",
                height: props.height ? props.height : "30vh",
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: props.maxHeight ? props.maxHeight : 250,
            }}
        >
            {props.array.map((menus, index) => {
                const labelId = `checkbox-list-label-${menus}`;
                return (
                    <div
                        key={index + 1}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginRight: "15px",
                            borderBottom: "1px solid #e6e6e6",
                            backgroundColor: backColor,
                        }}
                    >
                        <ListItemButton
                            selected={selectedIndex === index + 1}
                            onClick={(event) => {
                                handleListItemClick(event, index + 1);
                            }}
                        >
                            <Checkbox
                                edge="start"
                                onChange={handleToggle(menus)}
                                checked={checked.indexOf(menus) !== -1}
                                tabIndex={-1}
                                // disabledRipple
                                inputProps={{ "aria-labelledby": labelId }}
                            />
                            <ListItemText
                                primary={props.primary(index)}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: "inline" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {props.secondary(index)}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>

                        <Divider />
                    </div>
                );
            })}
        </List>
    );
};

export default ChoiceList;
