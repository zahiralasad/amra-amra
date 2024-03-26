import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home";
import Picnic2024 from "./components/Picnic2024";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div class="wrapper">
          <Sidebar />
          <div class="main p-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="picnic2024" element={<Picnic2024 />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
