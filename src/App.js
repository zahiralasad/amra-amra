import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home";
import Picnic2024 from "./components/Picnics/Picnic2024";
import Picnic2023 from "./components/Picnics/Picnic2023";
import Picnic2022 from "./components/Picnics/Picnic2022";
import Picnic2021 from "./components/Picnics/Picnic2021";
import Picnic2019 from "./components/Picnics/Picnic2019";
// import Picnic from "./components/Picnics/Picnic";
import "./App.css"
import Contacts from "./components/Contacts";
import Aboutus from "./components/Aboutus";
import Admin from "./components/Admin";
import Test from "./components/Test";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Sidebar />
          <div className="main p-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="picnic2024" element={<Picnic2024 />} />
              <Route path="picnic2023" element={<Picnic2023 />} />
              <Route path="picnic2022" element={<Picnic2022 />} />
              <Route path="picnic2021" element={<Picnic2021 />} />
              <Route path="picnic2019" element={<Picnic2019 />} />
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
