"use client";

import React, { useState, Fragment } from "react";
import {
    Drawer,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@mui/material";

import { useI18n, useNavigation } from "@client/providers";
import { APP_DRAWER_BUTTONS } from "../../_constants";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import styles from "./styles.module.scss";

function AppDrawer() {
    const { t } = useI18n();
    const { navigate, isCurrentRoute } = useNavigation();
    const [open, setOpen] = useState(false);

    const handleToggleDrawer = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Drawer
            className={styles.AppDrawer}
            variant="permanent"
            open={open}
            data-open={open}
            PaperProps={{
                className: styles.AppDrawerPaper,
            }}
        >
            <header className={styles.AppDrawerHeader}>
                <IconButton onClick={handleToggleDrawer}>
                    {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </header>

            {APP_DRAWER_BUTTONS.map((section) => (
                <Fragment key={section.key}>
                    <Divider />
                    {section.items.length > 0 && (
                        <List className={styles.AppDrawerList}>
                            {section.items.map((item) => {
                                const listItem = (
                                    <ListItem
                                        key={item.key}
                                        disablePadding
                                        className={styles.AppDrawerListItem}
                                        onClick={() => navigate(item.path)}
                                    >
                                        <ListItemButton
                                            className={
                                                styles.AppDrawerListItemButton
                                            }
                                            selected={isCurrentRoute(item.path)}
                                        >
                                            <ListItemIcon
                                                className={
                                                    styles.AppDrawerListItemIcon
                                                }
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                className={
                                                    styles.AppDrawerListItemText
                                                }
                                                primary={t(item.label)}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );

                                return !open ? (
                                    <Tooltip title={t(item.label)}>
                                        {listItem}
                                    </Tooltip>
                                ) : (
                                    listItem
                                );
                            })}
                        </List>
                    )}
                </Fragment>
            ))}
        </Drawer>
    );
}

export default AppDrawer;
export { AppDrawer };
