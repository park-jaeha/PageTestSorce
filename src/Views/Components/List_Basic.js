/**
 * array                리스트 데이터                                            array
 * ListPress            List Pres Event                                         Func
 * primary : 대이름 Binding                                                     Func
 * secondary: 소이름 Binding                                                    Func
 */

import * as React from "react";
/** Components Import */
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AlignItemsList(props) {
    const [listColor, setListColor] = React.useState("#fff");

    return (
        <List
            sx={{
                width: "100%",
                height: props.height ? props.height : "30vh",
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 250,
            }}
        >
            {props.array
                .map((menus, index) => (
                    <div
                        key={index + 1}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginRight: "15px",
                            borderBottom: "1px solid #e6e6e6",
                            backgroundColor: listColor,
                        }}
                    >
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
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            size="large"
                            color="error"
                            onClick={() => {
                                props.ListPress(index);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Divider />
                    </div>
                ))
                .reverse()}
        </List>
    );
}
