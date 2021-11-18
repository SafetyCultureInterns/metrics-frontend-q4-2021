import React, {useState} from "react";
import {Box, TextField, Button} from "@mui/material";
import styled from "styled-components"
import {Home} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/auth";

export const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth();

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [hasErrored, setHasErrored] = useState(false)


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async () => {
        try {
            await login()
            navigate("/home")
        } catch (e) {
            setHasErrored(true)
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1},
                border: "1px solid #d3d3d3",
                borderRadius: "5px",
                margin: "0 auto",
                width: "30rem",
                height: "30rem",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
            novalidate
        >
            <Title>
                Metrics Frontend
            </Title>
            {hasErrored && <ErrorMessage>Something has gone wrong. Please try again</ErrorMessage>}
            <>
                <TextField
                    required
                    id="outlined-basic"
                    label="Email"
                    onChange={handleEmailChange}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    onChange={handlePasswordChange}
                />
            </>
            <Button
                sx={{margin: "0 .5rem"}}
                variant="contained"
                color="success"
                endIcon={<Home/>}
                disabled={!password || !email}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </Box>
    )
}

const ErrorMessage = styled.p`
  display: flex;
  justify-content: center;
  color: red;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
`
