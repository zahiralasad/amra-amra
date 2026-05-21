import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar_old";
import Home from "./components/Home/Home";
import Picnic2024 from "./components/Picnics/Picnic2024";
import Picnic2023 from "./components/Picnics/Picnic2023";
import Picnic2022 from "./components/Picnics/Picnic2022";
import Picnic2021 from "./components/Picnics/Picnic2021";
import Picnic2019 from "./components/Picnics/Picnic2019";
import Picnic from "./components/Picnics/RegisterToPicnic_v4";
import RegisterToPicnic from "./components/Picnics/RegisterToPicnic";
import Contacts from "./components/Contacts";
import Aboutus from "./components/Aboutus";
import Admin from "./components/Admin/Admin";
import Header from "./components/Header/Header"
import Events from "./components/Events/Events";
import Info from "./components/Info";
import Members from "./components/Members/Members";
import RegisterMember from "./components/Members/RegisterMember";
// import StickyLoginButton from "./components/Admin/StickyLoginButton";
import Checklist from "./components/Picnics/Checklist";
import RegisterToEnter from "./components/IndoorGames/RegisterToEnter";
import IndoorGamesTeams from "./components/IndoorGames/RegisterdTeams";
import RegisterToGame from "./components/IndoorGames/RegisterToGame";
import RegisterToNetwork from "./components/NetworkingBuilding/RegisterToNetwork";
import Test from "./components/Test/Test";
import Gallery from "./components/Events/Gallery";
import CheckGuest from "./components/NetworkingBuilding/CheckGuest";
import CheckIn from "./components/NetworkingBuilding/CheckIn";
import GuestList from "./components/NetworkingBuilding/GuestList";

import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Header />
          {/* <Sidebar /> */}
          <div className="main p-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="contacts" element={<Contacts/>} />
              <Route path="aboutus" element={<Aboutus/>} />
              <Route path="admin" element={<Admin/>} />
              <Route path="events" element={<Events/>} />
              <Route path="gallery" element={<Gallery/>} />
              <Route path="info" element={<Info/>} />
              {/* <Route path="adminlogin" element={<StickyLoginButton/>} /> */}
              <Route path="checklist" element={<Checklist/>} />
              {/* <Route path="/" element={<Info />} /> */}

              {/************ Members *************/}
              <Route path="members" element={<Members/>} />
              <Route path="registermember" element={<RegisterMember/>} />

              {/************ Picnics *************/}
              <Route path="picnic2024" element={<Picnic2024/>} />
              <Route path="picnic2023" element={<Picnic2023/>} />
              <Route path="picnic2022" element={<Picnic2022/>} />
              <Route path="picnic2021" element={<Picnic2021/>} />
              <Route path="picnic2019" element={<Picnic2019/>} />              
              <Route path="registertopicnic" element={<RegisterToPicnic/>} />

              {/****** Carrier Building Network ******/}
              <Route path="registertonetwork" element={<RegisterToNetwork/>} />
              <Route path="checkguest" element={<CheckGuest/>} />
              <Route path="checkin" element={<CheckIn/>} />
              <Route path="guestlist" element={<GuestList/>} />

              {/************ Indor Games *************/}
              <Route path="entryform1213" element={<RegisterToEnter/>} />
              <Route path="indoorteams" element = {<IndoorGamesTeams/>}/>
              <Route path="registertogame" element={<RegisterToGame/>} />

              {/**************** Test ****************/}
              <Route path="picnictest" element={<Picnic/>} />
              <Route path="test" element={<Test/>} />
              
            </Routes>
          </div>
        </div>
        {/* <StickyLoginButton/> */}
      </div>
    </BrowserRouter>
  )
}

export default App;
