import React from "react";
import {Container} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import styled from "styled-components"

import './App.css';
import {MetricsRouter} from "./navigation/RouterConfig";

function App() {
    return (
        <StyledContainer maxWidth="lg">
            <BrowserRouter>
                <MetricsRouter/>
            </BrowserRouter>
        </StyledContainer>
    );
}

export default App;

const StyledContainer = styled(Container)`
  height: 100vh;
`
