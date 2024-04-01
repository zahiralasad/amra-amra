import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar"
import Home from "./components/Home";
import Picnic2024 from "./components/Picnics/Picnic2024";
import Picnic2023 from "./components/Picnics/Picnic2023";
import "./App.css"


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
            </Routes>
          </div>
        </div>
        </div>
    </BrowserRouter>
  )
}

export default App;
