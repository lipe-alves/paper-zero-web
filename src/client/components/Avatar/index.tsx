import { useMemo } from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { User } from "@shared/models";
import { stringToColor } from "@shared/utils";
import React from "react";

interface AvatarProps {
    user: User;
}

function Avatar(props: AvatarProps) {
    const { user } = props;

    const nameInitials = useMemo(() => {
        const names = user.name.split(" ");
        const initials = names.map((name) => name[0]);
        return initials.join("").toUpperCase();
    }, [user.name]);

    const color = stringToColor(nameInitials);

    return (
        <MuiAvatar sx={{ backgroundColor: color }}>{nameInitials}</MuiAvatar>
    );
}

export default Avatar;
export { Avatar };
export type { AvatarProps };
