/**
 *
 * const [loading,setLoading]                   loading on/off 를 위해 사용
 *
 * JSX파일에 밑의 문장 추가
 * {loading && <Loading />}
 *
 */

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
/** CSS Import */
import "./../../CSS/Components/Loading_Basic.css";

export default function CircularColor() {
    return (
        <div className="Loading">
            <CircularProgress className="LoadingCircle" color="secondary" />
        </div>
    );
}
