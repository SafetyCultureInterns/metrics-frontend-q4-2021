import React, {useState} from "react";
import {Box, TextField, Button} from "@mui/material";
import styled from "styled-components"
import {Home} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {useAuth} from "../hooks/auth";

const ErrorType = Object.seal({
    None: "none",
    Server: "server",
});

export const Register = () => {
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorType, setErrorType] = useState(ErrorType.None)

    const bindInput = (setter) => (e) => setter(e.target.value);

    const handleSubmit = async () => {
        try {
            await register({
                name,
                email,
                password
            });
        } catch (e) {
            setErrorType(ErrorType.Server)
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
            <>
                <TextField
                    required
                    id="outlined-basic"
                    label="Name"
                    type="text"
                    onChange={bindInput(setName)}
                />
                <TextField
                    required
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    onChange={bindInput(setEmail)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    onChange={bindInput(setPassword)}
                />
            </>
            <Box sx={{
                padding: '1rem',
                textAlign: 'center'
            }}>
                <Link to="/login">Have an account? Log In.</Link>
            </Box>
            {errorType !== ErrorType.None && <ErrorMessage>Something has gone wrong. Please try again</ErrorMessage>}
            <Button
                sx={{margin: "0 .5rem"}}
                variant="contained"
                color="success"
                endIcon={<Home/>}
                disabled={!name || !password || !email}
                onClick={handleSubmit}
            >
                Register
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
