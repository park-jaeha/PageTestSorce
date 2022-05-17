import * as React from "react";
import axios from "axios";
// import {  } from 'react-dom';
import { Link } from "react-router-dom";
/** CSS Import */
import "./../../CSS/reset.css";
import "./../../CSS/Accounts/LoginScreen.css";
/** Component Import */
import BasicButton from "../Components/Button_Basic";
/** Image Import */
import Logo from "./../../Images/Logo/purple_logo.png";
import idImg from "./../../Images/Shared/avatar.png";
import pwImg from "./../../Images/Shared/password.png";

const LoginScreen = (props) => {
	const [userId, setUserId] = React.useState("");
	const [userPw, setUserPw] = React.useState("");

	const SelectedText = () => {
		const input = document.getElementById("getInput");
		input.select();
		input.focus();
	};

	// Enter 입력 이벤트, controller의 SelectTbInMCart 연결
	const onKeyPress = (e) => {
		if (e.key == "Enter") {
			props.LoginLogic(userId);
			setUserId("");
		}
	};

	return (
		<div className="LoginScreen">
			<header className="LoginHeader">
				<div className="LoginLogo">
					<img src={Logo} />
				</div>
				<input
					type="button"
					value="Setting"
					style={{
						position: "absolute",
						top: 0,
						right: 0,
						color: "#7f1085",
						border: "#7f1085",
						backgroundColor: "#7f1085",
					}}
					onClick={() => {
						props.UrlDialogOpen();
					}}
				/>
			</header>
			<div className="Contents">
				<div className="ContentBox">
					<div className="Content_getInfo">
						<img src={idImg} />
						<input
							autoComplete="off"
							id="getInput"
							className="getInput"
							style={{
								width: "8em",
								fontSize: "1.2em",
								fontWeight: "bold",
							}}
							defaultValue={userId}
							onChange={(e) => {
								setUserId(e.target.value);
							}}
							onClick={SelectedText}
							onKeyPress={onKeyPress}
							inputMode="decimal"
						/>
					</div>
					<BasicButton
						name="로그인"
						width="11.25em"
						height="2em"
						fontSize="1.5em"
						buttonPress={() => {
							props.LoginLogic(userId);
						}}
					/>
				</div>
			</div>
			<footer className="LoginFooter">
				<div className="footerText">{props.versionText}</div>
			</footer>
		</div>
	);
};

export default LoginScreen;
