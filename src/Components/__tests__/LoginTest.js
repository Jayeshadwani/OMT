import {fireEvent, getByRole, render,screen,waitFor} from "@testing-library/react"
import Login, {verifyEmail,authenticateUser,verifyPassword} from "../Login"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import * as router from "react-router"

import {expect} from "@jest/globals"


/*
Login Component Responsibilites__TESTS__
1. Render Form
            a. Email (DONE)
                i: Verify Email is valid
            b. Password (DONE)
                i: Verify Password is not empty 
            c. Login Button(DONE)
                i: verify on success it navigates to /orders 
                - Authenticate User - 
                - Navigate to /orders 
                ii: on failure shows error 
                
                */ 

afterEach(()=>{
    jest.restoreAllMocks()
})

const navigate = jest.fn();

beforeEach(()=>{
    jest.spyOn(router,'useNavigate').mockImplementation(() => navigate)
})


describe("Login",()=>{
    it("verifyEmail() should return true on passing jayesh@gmail.com",()=>{
        let output = verifyEmail("jayesh@gmail.com")
        expect(output).toBeTruthy()        
    })
    it("verifyEmail() should return true on passing JAYESH@gmail.com",()=>{
        let output = verifyEmail("jayesh98211@gmail.com")
        expect(output).toBeTruthy()        
    })
    it("verifyEmail() should return true on passing jayesh-1@gmail.com",()=>{
        let output = verifyEmail("jayesh_1@gmail.com")
        expect(output).toBeTruthy()        
    })
    it("verifyEmail() should return true on passing jayesh98211@gmail.com",()=>{
        let output = verifyEmail("jayesh98211@gmail.com")
        expect(output).toBeTruthy()        
    })
    it("verifyEmail() should return true on passing jayesh@hotmail2.in",()=>{
        let output = verifyEmail("jayesh98211@gmail.com")
        expect(output).toBeTruthy()        
    })
    it("verifyEmail() should return false on passing, jayeshhotmail.com",()=>{
        let output = verifyEmail("jayeshhotmail.com")
        expect(output).toBeFalsy()
    })
    it("verifyEmail() should return false on passing, jayesh@hotmailcom",()=>{
        let output = verifyEmail("jayesh@hotmailcom")
        expect(output).toBeFalsy()
    })
    it("verifyEmail() should return false on passing, ja#esh@hotmail.com",()=>{
        let output = verifyEmail("ja#esh@hotmail.com")
        expect(output).toBeFalsy()
    })
    it("verifyEmail() should return false on passing, jayesh@hotmail.coma",()=>{
        let output = verifyEmail("jayesh@hotmail.coma")
        expect(output).toBeFalsy()
    })
    it("verifyEmail() should return false on passing, jayesh@.com",()=>{
        let output = verifyEmail("jayesh@.com")
        expect(output).toBeFalsy()
    })
    it("verifyEmail() should return false on passing, @jayesh@.com",()=>{
        let output = verifyEmail("@jayesh@.com")
        expect(output).toBeFalsy()
    })
    it("verifyPassword() should return true when password is provided",()=>{
        let output = verifyPassword("abcd")
        expect(output).toBeTruthy()
    })
    it("verifyPassword() should return false when password is not provided",()=>{
        let output = verifyPassword("")
        expect(output).toBeFalsy()
    })
    it("authenticateUser() Check and return true if user provides valid credentials",()=>{
        let output = authenticateUser("user2@example.com","user2")
        expect(output).toBeTruthy()
    })
    it("authenticateUser() Check and return false if user provides invalid credentials",()=>{
        let output = authenticateUser("dknkfnlk","dnfkd")
        expect(output).toBeFalsy()
    })
    it("authenticateUser() if authentication fails error should be shown on screen",()=>{
        render( <BrowserRouter> <Login isAuthUser={false} /> </BrowserRouter>)
        expect(screen.getByLabelText("errorText")).not.toBeNull()
    })
    it('onSubmit() user redirects to /orders after successfull login', async () => {

        const setIsAuthUser = jest.fn();
        const setIsLoggedIn = jest.fn();
        render( <BrowserRouter> <Login isAuthUser={true} setIsAuthUser={setIsAuthUser} setIsLoggedIn={setIsLoggedIn} /> </BrowserRouter>  )
        
        const emailField =  screen.queryByTestId("email-input")
        const passwordField =  screen.queryByTestId("password-input")
        const loginButton = screen.getByRole("button",{name:"login"})
        
    
        await waitFor(() => fireEvent.change(emailField,{target:{value:"user1@example.com"}}))
        await waitFor(() => fireEvent.change(passwordField,{target:{value:"user1"}}))
        await waitFor(() => fireEvent.click(loginButton))
        
        expect(navigate).toBeCalledTimes(1)
        expect(navigate).toHaveBeenCalledWith("/orders")
    })
})
                            




