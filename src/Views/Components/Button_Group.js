/**
 * buttons : Button Object                              Object
 * size : Button Group Size                             string('small', 'medium', 'large')
 * width : Button Width                                 string
 * marginTop : Button MarginTop                         string
 * marginLeft : Button MarginLeft                       string
 * marginRight : Button MarginRight                     string
 * marginBottom : Button MarginBottom                   string
 *
 * 부모 Component에 아래 라이브러리 Import 필요
 * import Button from "@mui/material/Button";
 */

import * as React from "react";
/** Components Import */
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

const GroupButton = (props) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                    m: 1,
                },
            }}
        >
            <ButtonGroup
                color="secondary"
                size={props.size}
                aria-label="secondary button group"
                fullWidth={props.fullWidth}
                style={{
                    width: props.width,
                    marginTop: props.marginTop,
                    marginLeft: props.marginLeft,
                    marginRight: props.marginRight,
                    marginBottom: props.marginBottom,
                }}
            >
                {props.buttons}
            </ButtonGroup>
        </Box>
    );
};

GroupButton.defaultProps = {
    size: "medium",
    fullWidth: false,
    width: "100%",
    marginTop: "8px",
    marginLeft: "8px",
    marginRight: "8px",
    marginBottom: "8px",
};

export default GroupButton;
