import React from 'react';
import Converter from "./pages/Converter";
import Rates from "./pages/Rates";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Rates/>}/>
        <Route path='/converter' element={<Converter/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
