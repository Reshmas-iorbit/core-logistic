import React, { useState } from 'react'
import Layout from './Pages/Layout';
import { Routes, Route, useNavigate } from "react-router-dom";
import RegForm from './Pages/Form';
import TableView from './Components/Table';
import FormView from './Pages/FormView';
import { useEffect } from 'react';



const App = () => {
  // const [view, setView] = React.useState("list");
  // const [selected, setSelected] = React.useState([]);
  const fields = "/Service/po.json";
  const list = "/Details/list.json"
  //const list = "/Details/listOld.json"
  const navigate = useNavigate()
  useEffect(() => {
    // nav("/test/list")
  }, [])

  return (

    <Routes>
      {/* <Form /> */}
      <Route path="/table" element={<TableView />} />
      <Route path="/" element={<Layout />}>
        <Route path="/form/list" element={<RegForm aev={'list'} fields={fields} list={list}
        //setView={setView} view={view} selected={selected} setSelected={setSelected} 
        />} />
        <Route path="/form/add" element={<RegForm aev={'add'} fields={fields} list={list} />} />
        <Route path="/form/view" element={<RegForm aev={'view'} fields={fields} list={list} />} />
        <Route path="/form/edit" element={<RegForm aev={'edit'} fields={fields} list={list} />} />

        <Route path="/test/list" element={<FormView aev={'list'} fields={fields} list={list} />} />
        <Route path="/test/add" element={<FormView aev={'add'} fields={fields} list={list}  />} />
        <Route path="/test/view" element={<FormView aev={'view'} fields={fields} list={list} navigate={navigate} />} />
        <Route path="/test/edit" element={<FormView aev={'edit'} fields={fields} list={list} />} />
        {/* <Route path="/test/:aev" element={<FormView fields={fields} list={list} />} />
        <Route path="/test/:aev" element={<FormView fields={fields} list={list} />} /> */}
      </Route>
    </Routes>

  )
}

export default App
