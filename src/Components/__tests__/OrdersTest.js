import {fireEvent, render,screen} from "@testing-library/react"
import React from "react"
import {expect} from "@jest/globals"
import Orders, {filterOrderRows} from "../Orders"
import data from "../../MOCK_DATA.json"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
/*
    Responsibilities of Order Component:
        1. Render Search and Table(Done)
            -Pagination 
            -Header/Footer/Cell
            -Debouncing 
        2. Filter order by keys (Done)
            -Status
            -Vendor Name
            -Pickup Date
            -orderId
        3. Show Component if loggedIn (Done) 
            -Conditional Render 
*/ 

jest.mock("../../MOCK_DATA.json",() => [             
    {
        "orderId":"1",
        "Vendor Name":"test_Swiggy",
        "Pickup date":"15/02/2023",
        "Status":"SHIPPED"
    },{
        "orderId":"2",
        "Vendor Name":"test_Zomato",
        "Pickup date":"15/03/2023",
        "Status":"PENDING"
    },{
        "orderId":"3",
        "Vendor Name":"test_Dunzo",
        "Pickup date":"15/01/2023",
        "Status":"SHIPPED"
    }])

beforeEach(()=>{
    jest.useFakeTimers()
})

afterEach(()=>{
    jest.restoreAllMocks();
    jest.useRealTimers();
})


describe("Orders",()=>{
    it('filterOrderRows() should return orders filtered by status',()=>{
        let rows = filterOrderRows("SHIPPED")
        const result = [{
            "orderId":"1",
            "Vendor Name":"test_Swiggy",
            "Pickup date":"15/02/2023",
            "Status":"SHIPPED"
        },{
            "orderId":"3",
            "Vendor Name":"test_Dunzo",
            "Pickup date":"15/01/2023",
            "Status":"SHIPPED"
        }]
        expect(rows).toEqual(result)
    })
    
    it('filterOrderRows() should return orders filtered by Pickup date',()=>{
        let rows = filterOrderRows("15/01/2023")
        const result = [{
            "orderId":"3",
            "Vendor Name":"test_Dunzo",
            "Pickup date":"15/01/2023",
            "Status":"SHIPPED"
        }]
        expect(rows).toEqual(result)
    })

    it('filterOrderRows() should return orders filtered by Vendor Name',()=>{
        let rows = filterOrderRows("test_Dunzo")
        const result = [{
            "orderId":"3",
            "Vendor Name":"test_Dunzo",
            "Pickup date":"15/01/2023",
            "Status":"SHIPPED"
        }]
        expect(rows).toEqual(result)
    })

    it('filterOrderRows() should return orders filtered by orderId',()=>{
        let rows = filterOrderRows("1")
        const result = [{
            "orderId":"1",
            "Vendor Name":"test_Swiggy",
            "Pickup date":"15/02/2023",
            "Status":"SHIPPED"
        }]
        expect(rows).toEqual(result)
    })

    it("if loggedIn Table component is present",()=>{
        render( <BrowserRouter> <Orders isLoggedIn={true}/> </BrowserRouter>)
        const output = screen.queryByLabelText("orders-table")
        expect(output).not.toBeNull()
    })

    it("if not loggedIn back to login button is present",()=>{
        render( <BrowserRouter> <Orders isLoggedIn={false}  /> </BrowserRouter>)
        const output = screen.queryByRole('button',{name:"Back to Login"})
        expect(output).not.toBeNull()    
    })

    it("if loggedIn table has no orderId cell empty",()=>{
        render( <BrowserRouter> <Orders isLoggedIn={true}/> </BrowserRouter>)
        const output = screen.getAllByLabelText("orderId_tableCell")
        output.forEach(element => {
            expect(element.textContent).toBeTruthy()
        });
    })
    
    it("if loggedIn table has no Vendor Name cell empty",()=>{
        render( <BrowserRouter> <Orders isLoggedIn={true}/> </BrowserRouter>)
        const output = screen.getAllByLabelText("Vendor Name_tableCell")
        output.forEach(element => {
            expect(element.textContent).toBeTruthy()
        });
    })
    
    it("if loggedIn table has no Pickup date cell empty",()=>{
        render( <BrowserRouter> <Orders isLoggedIn={true}/> </BrowserRouter>)
        const output = screen.getAllByLabelText("Pickup date_tableCell")
        output.forEach(element => {
            expect(element.textContent).toBeTruthy()
        });
    })

    it("if loggedIn table has no Status cell empty",()=>{
        render( <BrowserRouter> <Orders isLoggedIn={true}/> </BrowserRouter>)
        const output = screen.getAllByLabelText("Status_tableCell")
        output.forEach(element => {
            expect(element.textContent).toBeTruthy()
        });
    })
    
    it("Check if rows per page is by default 10",()=>{
        render( <BrowserRouter> <Orders isLoggedIn={true}/> </BrowserRouter>)
        const output = screen.getByDisplayValue(10)
        expect(output).toBeTruthy()
    })

    it("debounceSearch() Change of text should be updated after a delay of 800ms",()=>{  
        jest.spyOn(global,'setTimeout')
        render( <BrowserRouter> <Orders isLoggedIn={true}/> </BrowserRouter>)
        userEvent.type(screen.getByRole('textbox'),"abcd")
        expect(setTimeout).toBeCalledTimes(4)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function),800)
    })
})

