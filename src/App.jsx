import React from "react";
import {BrowserRouter} from "react-router-dom";
import styled from "styled-components"
import { Box } from "@mui/material";

import './App.css';
import {MetricsRouter} from "./Router";
import { Navigation } from "./components/Navigation";

function App() {
    return (
        <StyledContainer maxWidth="lg">
            <BrowserRouter>
                <Navigation/>
                <Box sx={{
                    padding: '1rem'
                }}>
                    <MetricsRouter/>
                </Box>
            </BrowserRouter>
        </StyledContainer>
    );
}

export default App;

const StyledContainer = styled.div`
  height: 100vh;
`
