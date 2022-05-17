/**
 * open : Snack Bar Open State                          useState
 * onClose : Closed Snack Bar                           Func
 * time : Snack Bar 닫을 시간                            Number
 * article : Snack Bar 내용                             String
 * type : Snack Bar Type                                String(success, warning, error, info)
 */

import * as React from "react";
/** Components Import */
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageAreaSnack(props) {
	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={props.onClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar
				open={props.open}
				autoHideDuration={props.time}
				onClose={props.onClose}
				// message={props.article}
				action={action}
			>
				<Alert
					onClose={props.onClose}
					severity={props.type}
					sx={{ width: "100%" }}
				>
					{props.article}
				</Alert>
			</Snackbar>
			{/* <Alert severity="error">{props.article}</Alert>
            <Alert severity="warning">{props.article}</Alert>
            <Alert severity="info">{props.article}</Alert>
            <Alert severity="success">{props.article}</Alert> */}
		</Stack>
	);
}

MessageAreaSnack.defaultProps = {
	time: 6000,
	type: "success",
};
