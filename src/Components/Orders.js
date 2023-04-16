import React, { useState } from 'react'
import { Box, Button, Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, AppBar, Toolbar, TablePagination, TableFooter, OutlinedInput, FormControl } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import mockData from "../MOCK_DATA.json"
import SearchIcon from '@mui/icons-material/Search';

export const handleLogout = () => {
  window.location.replace("/login")
}

export const filterOrderRows = (searchText) => {
  if(!searchText) return
  const lowercasedSearchText = searchText.toLowerCase()
  const filteredOrders = mockData.filter((order)=>order.orderId.toLowerCase() === lowercasedSearchText || order['Pickup date'] === lowercasedSearchText || order['Vendor Name'].toLowerCase() === lowercasedSearchText || order.Status.toLowerCase() === lowercasedSearchText )  
  return filteredOrders
}

export default function Orders({isLoggedIn}) {
  const navigate = useNavigate()
  const [listOfOrders,setListOfOrders] = useState(mockData)
  const headings = Object.keys(mockData[0])
  const [page,setPage] = useState(0)
  const [rowsPerPage,setRowsPerPage] = useState(10)
  const [searchText,setSearchText] = useState("")
  const [debounceTimeout,setDebounceTimeout] = useState(0) 
  
  
  const debounceSearch = (e,debounceTimeout,handleChangeSearchText) => {
      if(debounceTimeout){
        clearTimeout(debounceTimeout)
      }
      const newDebounceTimeout = setTimeout(() => {
        handleChangeSearchText(e)
      },800)
      setDebounceTimeout(newDebounceTimeout)
  }
  


  const handleChangePage = (event,newpage) => {
      setPage(newpage)
  } 

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(0)
  }

  const handleChangeSearchText = (e) => {
    const value = e.target.value
    setSearchText(value)
    if(value){
      const filteredRows = filterOrderRows(value)
      if(filteredRows){
        setListOfOrders(filteredRows)
      } 
    }
    else{
      setListOfOrders(mockData)
    }
  }


  return (
    <>
      {isLoggedIn ? <>
        <Box>
        <AppBar position="static" sx={{backgroundColor:"white"}} >
          <Toolbar id="header" sx={{display:"flex",justifyContent:"space-between"}} >
            <FormControl  >
              <OutlinedInput
                  id="search"
                  aria-label='search'
                  placeholder='SearchBy OrderId/VendorName/PickUpDate/Status'
                  sx={{width:"20vw",'&:focus-within':{width:"32vw"},transition:'width 0.5s'}}
                  onChange={(e)=> debounceSearch(e,debounceTimeout,handleChangeSearchText)} 
                  startAdornment={<SearchIcon />}
              />
            </FormControl>  
            <Button
              variant="contained"
              onClick={handleLogout}
            >logout</Button>
          </Toolbar>
        </AppBar>
          <TableContainer id="table" sx={{width:"80vw",margin:3,padding:1}}component={Paper}>
            <Table aria-label="orders-table">
              <TableHead >
                <TableRow>
                  {headings.map((heading) =>{
                    return(
                      <>
                        <TableCell key={heading} sx={{fontWeight:"bold",fontSize:15}}>{heading.toUpperCase()}</TableCell>
                      </>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                  {(rowsPerPage > 0 ? listOfOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): listOfOrders)
                  .map((order)=>{
                    return(
                      <>
                        <TableRow key={order.orderId}>
                          <TableCell aria-label='orderId_tableCell'> {order.orderId} </TableCell>
                          <TableCell aria-label='Vendor Name_tableCell'> {order['Vendor Name']} </TableCell>
                          <TableCell aria-label='Pickup date_tableCell'> {order['Pickup date']} </TableCell>
                          <TableCell aria-label='Status_tableCell'> {order.Status} </TableCell>
                        </TableRow>
                      </>
                    )
                  })}
              </TableBody>
            </Table>
            <TableFooter>
              <TableRow>
                <TablePagination 
                  aria-label="pagination"
                  count={listOfOrders.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[10, 50,{label:"All",value:-1}]} 
                />
              </TableRow>
            </TableFooter>
          </TableContainer>
      </Box>
      </> : 
      <Box 
        component="div"
        id="unAuthaccess"
        sx={{padding:1,margin:3}}
      >
        <Typography
          variant='h3'
          component="h1"
          gutterBottom
        >
          Snap! Login to view all orders
        </Typography>
        <Button
          variant='outlined'
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </Box>
      }
    </>
  )
}
