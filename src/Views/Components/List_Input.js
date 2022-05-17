/**
 * array            : 리스트 데이타                                             array
 * cartState        : 수리상태                                                  array
 * ListPress            List Pres Event                                         Func
 *
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

    const SetColor = (idx) => {
        if ((idx + 1) % 2 == 0) {
            setListColor("#000");
        } else if ((idx + 1) % 2 == 1) {
            setListColor("#fff");
        }
    };

    return (
        <List
            sx={{
                width: "100%",
                height: props.height,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 250,
            }}
        >
            {props.array
                .map((menus, index) => (
                    <div key={index}>
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
                            <div>
                                <ListItemText
                                    primary={"운반구 ID : " + menus[0].asCartId}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: "inline" }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {"작업장 : " +
                                                    menus[0].asWcId +
                                                    " | 공정 : " +
                                                    menus[0].asProcId}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: "inline" }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {"수리상태 : " +
                                                    props.cartState[index]}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </div>
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
                        </div>
                        <Divider />
                    </div>
                ))
                .reverse()}
        </List>
    );
}

AlignItemsList.defaultProps = {
    height: "30vh",
};
