import React from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import Header from "./components/header.jsx"
import {Main, Registration, Login, Profile, Todo, Admin, Catalog, Cart, MyTransactions, AllTransactions, Search } from '../src/pages/index.js'
import {Employees, AddEmployees, DeleteEmployees, Customers, Transactions, Products, Product, AddProducts } from './components/Admin/index.js'
import {FullBook, ChatBot} from './components/index.js'
import EditProfile from "./pages/editProfile.jsx"

import * as fetches from './redux/slices/user.js'

function App() {
  
  const dispatch = useDispatch()

  React.useEffect(()  => {
    dispatch(fetches.fetchAuthMe())
  }, [dispatch])
  

  return ( 
  <>
    <Routes>

        <Route path="/" element={<><Header/><Main/></>  } />

        <Route path="/login" element={<><Header/><Login/></> } />
        <Route path="/registration" element={<><Header/><Registration/></> } />

        <Route path="/profile" element={<><Header/><Profile/></> } />
        <Route path="/edit-profile" element={<><Header/><EditProfile/></> } />

        <Route path="/admin" element={<><Header/><Admin/></> } />
        <Route path="/admin/employees" element={<><Header/><Employees/></> } />
        <Route path="/admin/employees/add" element={<><Header/><AddEmployees/></> } />
        <Route path="/admin/employees/delete" element={<><Header/><DeleteEmployees/></> } />
        <Route path="/admin/customers" element={<><Header/><Customers/></> } />
        <Route path="/admin/customers/:id" element={<><Header/><Transactions/></> } />
        <Route path="/admin/books" element={<><Header/><Products/></> } />
        <Route path="/admin/books/:id" element={<><Header/><Product/></> } />
        <Route path="/admin/books/add" element={<><Header/><AddProducts/></> } />

        <Route path="/catalog" element={<><Header/><Catalog/></> } />
        <Route path="/catalog/books/:id" element={<><Header/><FullBook/></> } />

        <Route path="/cart" element={<><Header/><Cart/></> } />

        <Route path="/my-transactions" element={<><Header/><MyTransactions/></> } />
        <Route path="/all-transactions" element={<><Header/><AllTransactions/></> } />

        <Route path="/search/:text" element={<><Header/><Search/></> } />

        <Route path="/chat" element={<><Header/><ChatBot/></> } />

        <Route path="/todo" element={<><Header/><Todo/></> } />
    </Routes>
  </>)
}

export default App;
