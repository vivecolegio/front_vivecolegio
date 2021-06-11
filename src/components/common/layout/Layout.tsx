import React from "react";
import Basic from "./basic/Basic";
import Main from "./main/Main";

const Layout = (props:any) =>{
    return (
        <>
            {props.permissionS ? <Main> {props.children}</Main> : <Basic> {props.children}</Basic>}
        </>
    );
};

export default Layout;