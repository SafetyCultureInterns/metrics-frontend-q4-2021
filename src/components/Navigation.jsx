import React from "react";

import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material"
import { useAuth } from "../hooks/auth2";

export function Navigation() {
    const { authenticated, logout } = useAuth();
    if (!authenticated) {
        return <></>;
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Metrics Frontend
                    </Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
