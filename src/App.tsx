
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import Home from "./pages/home"
import AboutUs from "./pages/AboutUs"
import "./index.css"
import ContactUs from "./pages/ContactUs"
import Logbook from "./pages/Logbook"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import MediaAssets from "./pages/MediaAssets"

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App min-h-screen" style={{ fontFamily: 'Roobert, sans-serif' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<AboutUs />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/Logbook" element={<Logbook />} />
            <Route path="/Logbook/:id" element={<Logbook />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/Privacy" element={<Privacy />} />
            <Route path="/Media" element={<MediaAssets />} />
          </Routes>
          
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}


