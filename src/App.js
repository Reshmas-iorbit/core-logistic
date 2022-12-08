import React from 'react'
import Layout from './Pages/Layout';
import { Routes, Route, useNavigate } from "react-router-dom";
import RegForm from './Pages/Form';
import TableView from './Components/Table';
import FormView from './Pages/FormView';
import { useEffect } from 'react';



const App = () => {
  const fields = "/Service/po.json";
  const list = "/Details/list.json"
  //const list = "/Details/listOld.json"
 const nav =  useNavigate()
  useEffect(()=>{
    // nav("/test/list")
  },[])

  return (

    <Routes>
      {/* <Form /> */}
      <Route path="/table" element={<TableView />} />
      <Route path="/" element={<Layout />}>
        <Route path="/form/:aev" element={<RegForm fields={fields} list={list}/>} /> 
        <Route path="/test/:aev" element={<FormView fields={fields} list={list}/>} /> 
      </Route>
    </Routes>

  ) 
}

export default App
