import React from 'react'
import Layout from './Pages/Layout';
import { Routes, Route } from "react-router-dom";
import RegForm from './Pages/Form';
import TableView from './Components/Table';
import FormView from './Pages/FormView';



const App = () => {
  const fields = "/Service/po.json";

  return (

    <Routes>
      {/* <Form /> */}
      <Route path="/table" element={<TableView />} />
      <Route path="/" element={<Layout />}>
        <Route path="/form/:aev" element={<RegForm fields={fields} />} />
        <Route path="/test/:aev" element={<FormView fields={fields} />} />

      </Route>
    </Routes>

  )
}

export default App
