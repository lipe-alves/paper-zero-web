"use client";

import React from "react";
import { Menu as MuiMenu } from "@mui/material";
import type { MenuProps as MuiMenuProps } from "@mui/material";
import { classNames } from "@shared/utils";
import styles from "./styles.module.scss";

interface MenuProps extends MuiMenuProps {}

function Menu(props: MenuProps) {
    const { className = "", children, slotProps = {}, ...rest } = props;

    return (
        <MuiMenu
            {...rest}
            className={classNames(styles.Menu, className)}
            slotProps={{
                ...slotProps,
                paper: {
                    ...slotProps?.paper,
                    className: classNames(styles.MenuPaper),
                },
            }}
        >
            {children}
        </MuiMenu>
    );
}

export default Menu;
export { Menu };
export type { MenuProps };
