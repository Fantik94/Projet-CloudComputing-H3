import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css";

import {  BrowserRouter , Routes , Route } from "react-router-dom"
import Accueil from './composants/front/Accueil';
import NotFound from './composants/front/NotFound';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Accueil />} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
  </BrowserRouter>
)
