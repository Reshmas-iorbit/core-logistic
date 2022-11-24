import React from 'react'
import Layout from './Pages/Layout';
import { Routes, Route } from "react-router-dom";
import RegForm from './Pages/Form';

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Form /> */}
        <Route path="/" element={<Layout />}>
          <Route path="/form/:aev" element={<RegForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App