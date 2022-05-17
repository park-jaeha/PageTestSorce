/**
 * audioIdx : 재생할 소리                                                             Number
 *  case) 0 : 연결되었습니다.
 *        1 : 에러가 발생하였습니다.
 *        2 : 정상적으로 처리되었습니다.
 *        3 : 입력 오류입니다.
 *        4 : 조회 되었습니다.
 *        5 : 잠시만 기다려 주십시오.
 *        6 : 완료되었습니다.
 *
 */

import * as React from "react";
/** Components Import */
/** Audios Import */
import ConnectSound from "./../Sounds/Connect.wav";
import ErrorSound from "./../Sounds/Error.wav";
import GoodProcSound from "./../Sounds/GoodProc.wav";
import InputErrSound from "./../Sounds/InputErr.wav";
import SearchSound from "./../Sounds/Search.wav";
import WaitSound from "./../Sounds/Wait.wav";
import WalLyoSound from "./../Sounds/WalLyo.wav";

const AudioService = React.forwardRef((props, ref) => {
	const audioArr = [
		ConnectSound,
		ErrorSound,
		GoodProcSound,
		InputErrSound,
		SearchSound,
		WaitSound,
		WalLyoSound,
	];
	const [audio] = React.useState(new Audio(audioArr[props.audioIdx]));

	React.useImperativeHandle(ref, () => ({
		AudioPlaying(_playing) {
			if (_playing) {
				audio.play();
			} else {
				audio.pause();
			}
		},
	}));

	return <></>;
});

export default AudioService;
