import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div class="wrapper">
          <Sidebar />
          <div class="main p-3">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
