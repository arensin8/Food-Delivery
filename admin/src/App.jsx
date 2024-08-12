import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import {Routes , Route} from 'react-router-dom'
import Add from './pages/add/Add';
import List from './pages/list/List';
import Orders from './pages/orders/Orders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="appContent">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add />}/>
          <Route path='/list' element={<List />}/>
          <Route path='/orders' element={<Orders />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;