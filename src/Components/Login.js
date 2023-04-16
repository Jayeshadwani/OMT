import React, { useState } from 'react'
import {Button,Container,Box,TextField, Typography, Paper} from "@mui/material"
import { useNavigate,Navigate } from 'react-router-dom'
import users from "../MOCK_USERS.json"

const authenticatedUsers = users 

export const verifyEmail = (email) => {        
    const emailRegex = new RegExp('^[a-z0-9A-Z]+([._-]{1}[a-zA-Z0-9]+)*@[a-z0-9A-Z]+([.]{1}[a-zA-Z]{2,3})+$')
    return emailRegex.test(email) ? true : false
}

export const authenticateUser = (email,password) => {
    if(!email || !password) return
    for(let i=0;i<authenticatedUsers.length;i++){
        if(authenticatedUsers[i].email === email && authenticatedUsers[i].password === password) {
            return true
        }
    }
    return false
}

export const verifyPassword = (password) => {
    if(password === "" ) return false
    return true
}


export default function Login({setIsLoggedIn,isAuthUser,setIsAuthUser}) {
    
    const [emailError,setEmailError] = useState(false)
    const [email,setEmail] = useState("")
    const [passwordError,setPasswordError] = useState(false)
    const [password,setPassword] = useState("")
    const [errorText,setErrorText] = useState("")
    const navigate = useNavigate();
    
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (email,password) => {
        if(email === ""){
            setEmailError(true)
            setErrorText("This is a required field")
        }
        if(!verifyPassword(password)){
            setPasswordError(true)
            return
        }

        if(!verifyEmail(email)){
            // throw error that not a valid email
            setEmailError(true)
            setErrorText("Enter valid email")
            return
        }

        if(!authenticateUser(email,password)){
            setIsAuthUser(false)
            return
        }

        setIsAuthUser(true)
        setIsLoggedIn(true)
        navigate("/orders")
    }
    

  return (
    <>
    <Container maxWidth="sm" >
        <Paper sx={{padding:1,margin:3}}>
            <Box sx={{padding:1,margin:3,display:"flex",flexDirection:"column",height:'70vh'}} >
                <Typography
                    variant='h3'
                    sx={{marginTop:2}}
                >
                    Login
                </Typography>
                <Typography
                    variant='subtitle1'
                    sx={{color:"grey"}}
                >
                    Don't have one use this.(user1@example.com , user1)
                </Typography>
                <Box component="form" > 
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        value={email}
                        inputProps={{ "data-testid": "email-input" }}
                        error={emailError}
                        helperText={emailError ? errorText : null}
                        label="Email"
                        aria-label='Email'
                        onChange={handleEmailChange}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        aria-valuetext="password"
                        aria-label='Password'
                        type="password"
                        fullWidth
                        inputProps={{ "data-testid": "password-input" }}
                        error={passwordError}
                        helperText={passwordError ? "This is a required field" : null}
                        value={password}
                        onChange={handlePasswordChange}
                        id="password"
                        label="Password"
                        autoFocus
                    />
                    <Button
                        variant='contained'
                        id="login"
                        sx={{marginTop:2}}
                        autoFocus
                        fullWidth
                        onClick={() => handleSubmit(email,password)}
                    >
                        login
                    </Button>
                    {isAuthUser === false ? 
                        <Typography 
                            id="errorText"
                            aria-label="errorText"
                            sx={{
                                marginTop:2,
                                padding:1,
                                color:'red',
                                border:1,
                                borderRadius:1,
                                borderColor:'red'
                            }}
                        >
                            Password/Email do not match.
                        </Typography> : null
                    }
                </Box>
            </Box>
        </Paper>
    </Container>
    </>
  )
}

