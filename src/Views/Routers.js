import * as React from "react";
import styled from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
/** Component Import */
import Login from "../Controllers/Accounts/LoginController";
import DrawerMenu from "../Controllers/Accounts/DrawerController";
// import Dashboard from "../Controllers/SubMenus/DashboardController";
/** 가류/검사/GIP */
import A1030 from "../Controllers/VulInsGips/A1030";
import A900 from "../Controllers/VulInsGips/A900";
import A300 from "../Controllers/VulInsGips/A300";
import A1100 from "../Controllers/VulInsGips/A1100"; // 코발트 설비 도입(신규)
import A1200 from "../Controllers/VulInsGips/A1200"; // 압출투입구 투입(신규)
/** 공통 관리 */
import A600 from "../Controllers/Commons/A600_Selected";
import A700 from "../Controllers/Commons/A700";
import Test from "./Test";

const Routers = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<DrawerMenu />}>
                    <Route path="/Test" element={<Test />} />
                    /** 가류/검사/GIP */
                    <Route path="/A1030" element={<A1030 />} />
                    <Route path="/A900" element={<A900 />} />
                    <Route path="/A300" element={<A300 />} />
                    <Route path="/A1100" element={<A1100 />} />
                    <Route path="/A1200" element={<A1200 />} />
                    /** 공통 관리 */
                    <Route path="/A600" element={<A600 />} />
                    <Route path="/A700" element={<A700 />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default Routers;
