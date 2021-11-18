import React from "react"
import styled from "styled-components"
import {Container} from "@mui/material";

export const NotFound = () => {
    return (
        <Container maxWidth="md">
            <StyledHeader>404 Not found</StyledHeader>
        </Container>
    )
}

const StyledHeader = styled.h1`
  padding: 2.5rem 0;
  display: flex;
  justify-content: center;
`

