import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home";
import Picnic2024 from "./components/Picnics/Picnic2024";
import Picnic2023 from "./components/Picnics/Picnic2023";
import Picnic from "./components/Picnics/Picnic";
// import Picnic2022 from "./components/Picnics/Picnic2022";
import "./App.css"
import Contacts from "./components/Contacts";
import Aboutus from "./components/Aboutus";
import Admin from "./components/Admin";
import Test from "./components/Test";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrapper">
          <Sidebar />
          <div className="main p-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="picnic2024" element={<Picnic2024 />} />
              <Route path="picnic2023" element={<Picnic2023 />} />
              <Route path="picnic" element={<Picnic />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="aboutus" element={<Aboutus />} />
              <Route path="admin" element={<Admin />} />
              <Route path="test" element={<Test />} />
            </Routes>
          </div>
        </div>
        </div>
    </BrowserRouter>
  )
}

export default App;
