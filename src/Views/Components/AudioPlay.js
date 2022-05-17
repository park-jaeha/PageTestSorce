import * as React from "react";
/** Components Import */
import AudioService from "../../Services/AudioService";

const AudioPlayer = React.forwardRef((props, ref) => {
	const connectRef = React.useRef();
	const errorRef = React.useRef();
	const goodProcRef = React.useRef();
	const inputErrRef = React.useRef();
	const searchRef = React.useRef();
	const waitRef = React.useRef();
	const walLyoRef = React.useRef();

	React.useImperativeHandle(ref, () => ({
		// 연결되었습니다.
		PlayConnect() {
			connectRef.current.AudioPlaying(true);
			window.navigator.vibrate([100]);
		},

		// 에러가 발생하였습니다.
		PlayError() {
			errorRef.current.AudioPlaying(true);
			window.navigator.vibrate([200, 100, 200]);
		},

		// 정상적으로 처리되었습니다.
		PlayProccessing() {
			goodProcRef.current.AudioPlaying(true);
			window.navigator.vibrate([100]);
		},

		// 입력 오류입니다.
		PlayInputError() {
			inputErrRef.current.AudioPlaying(true);
			window.navigator.vibrate([200, 100, 200]);
		},

		// 조회 되었습니다.
		PlaySearch() {
			searchRef.current.AudioPlaying(true);
			window.navigator.vibrate([100]);
		},

		// 잠시만 기다려 주십시오.
		PlayWait() {
			waitRef.current.AudioPlaying(true);
		},

		// 완료되었습니다.
		PlayComplet() {
			walLyoRef.current.AudioPlaying(true);
			window.navigator.vibrate([100]);
		},
	}));

	return (
		<div style={{ display: "none" }}>
			<AudioService ref={connectRef} audioIdx={0} />
			<AudioService ref={errorRef} audioIdx={1} />
			<AudioService ref={goodProcRef} audioIdx={2} />
			<AudioService ref={inputErrRef} audioIdx={3} />
			<AudioService ref={searchRef} audioIdx={4} />
			<AudioService ref={waitRef} audioIdx={5} />
			<AudioService ref={walLyoRef} audioIdx={6} />
		</div>
	);
});

export default AudioPlayer;
