import React from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import './App.css';
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./hooks/auth";
import { MetricsRouter } from "./Router";
import { Box } from "@mui/material";



function App() {
    return (
        <StyledContainer maxWidth="lg">
            <BrowserRouter>
                <AuthProvider>
                    <Navigation/>
                    <Box sx={{
                        padding: '1rem'
                    }}>
                     <MetricsRouter/>
                    </Box>

                </AuthProvider>
            </BrowserRouter>
        </StyledContainer>
    );
}

export default App;

const StyledContainer = styled.div`
  height: 100vh;
`
