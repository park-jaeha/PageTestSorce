import * as React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
/** Component Import */
import Drawer from "../../Views/Accounts/DrawerScreen";

const Center = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:center;
    ...theme.mixins.Appbar;
`;

const DrawerController = (props) => {
    return (
        <div className="DrawerController">
            <Drawer />
            <Center>
                <Outlet />
            </Center>
        </div>
    );
};
export default DrawerController;
