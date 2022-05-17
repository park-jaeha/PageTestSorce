/**
 * array : List 데이터                                  array
 */
import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function AlignItemsList(props) {
    let replaced_str;
    return (
        <List
            sx={{
                width: "100%",
                height: "50vh",
                // maxWidth: 360,
                bgcolor: "background.paper",
                //  position: "relative",
                overflow: "auto",
                maxHeight: 250,
                // '& ul':{padding :0},
            }}
        >
            {props.array.length > 0 && (
                <div>
                    <ListItemText
                        primary={
                            "운반구 ID : " +
                            props.array[props.array.length - 1].cartId
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {"일시 : " +
                                        props.array[
                                            props.array.length - 1
                                        ].prodDt
                                            .toString()
                                            .replace(/T/gi, " ")}
                                </Typography>
                            </React.Fragment>
                        }
                    ></ListItemText>
                    <ListItemText
                        secondary={
                            "   | 상태 : " +
                            props.array[props.array.length - 1].eventType +
                            " | 세부상태 : " +
                            props.array[props.array.length - 1].eventTypeDetail
                        }
                    />
                </div>
            )}
            {props.array.length > 0 && <Divider />}
            {props.array.map((menus, index) => (
                <div key={index}>
                    {menus.lotId != null && menus.lotId != "" && (
                        <ListItem sx={{ pl: 1 }}>
                            <List component="nav" disablePadding key={index}>
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: "inline" }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {"LOTID : " + menus.lotId}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemText
                                    secondary={" | 품목명 : " + menus.itemName}
                                />
                                <ListItemText
                                    secondary={
                                        " | 생산유형 : " + menus.prodType
                                    }
                                />
                                <ListItemText
                                    secondary={
                                        " | 생산일시 : " +
                                        menus.prodDt
                                            .toString()
                                            .replace(/T/gi, " ")
                                    }
                                />
                            </List>
                        </ListItem>
                    )}
                    <Divider />
                </div>
            ))}
        </List>
    );
}
