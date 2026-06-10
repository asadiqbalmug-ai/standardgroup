import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import B2BHome from './pages/B2BHome.jsx'
import Layout from './components/Layout.jsx'
import MilanoWaterHeaters from './pages/MilanoWaterHeaters.jsx'
import WaterClosets from './pages/WaterClosets.jsx'
import WashBasins from './pages/WashBasins.jsx'
import WallHung from './pages/WallHung.jsx'
import TilesRoofInterlock from './pages/TilesRoofInterlock.jsx'
import SanitaryWare from './pages/SanitaryWare.jsx'
import BlocksSands from './pages/BlocksSands.jsx'
import Cement from './pages/Cement.jsx'
import Steel from './pages/Steel.jsx'
import FilmFacedPlywood from './pages/FilmFacedPlywood.jsx'
import WaterProofing from './pages/WaterProofing.jsx'
import GypsumBoard from './pages/GypsumBoard.jsx'
import PaintsTools from './pages/PaintsTools.jsx'
import GeneralToolsPlumbing from './pages/GeneralToolsPlumbing.jsx'
import PlumbingSanitary from './pages/PlumbingSanitary.jsx'
import PlumbingSanitary2 from './pages/PlumbingSanitary2.jsx'
import ElectricLights from './pages/ElectricLights.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* B2B Homepage - Simple, Shopify-style design */}
        <Route path="/" element={<B2BHome />} />
        {/* Old homepage as fallback */}
        <Route path="/classic" element={<App />} />

        {/* URL alias redirects */}
        <Route path="/electric-water-heaters"    element={<Navigate to="/milano-water-heaters" replace />} />
        <Route path="/water-heaters"             element={<Navigate to="/milano-water-heaters" replace />} />
        <Route path="/waterproofing"             element={<Navigate to="/water-proofing" replace />} />
        <Route path="/tiles"                     element={<Navigate to="/tiles-roof-interlock" replace />} />
        <Route path="/plywood"                   element={<Navigate to="/film-faced-plywood" replace />} />
        <Route path="/blocks"                    element={<Navigate to="/blocks-sands" replace />} />
        <Route path="/lights"                    element={<Navigate to="/electric-lights" replace />} />
        <Route path="/gypsum"                    element={<Navigate to="/gypsum-board" replace />} />
        <Route path="/paints"                    element={<Navigate to="/paints-tools" replace />} />
        <Route path="/plumbing"                  element={<Navigate to="/plumbing-sanitary" replace />} />

        {/* All product pages share Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/milano-water-heaters"   element={<MilanoWaterHeaters />} />
          <Route path="/water-closets"           element={<WaterClosets />} />
          <Route path="/wash-basins"             element={<WashBasins />} />
          <Route path="/wall-hung"               element={<WallHung />} />
          <Route path="/tiles-roof-interlock"    element={<TilesRoofInterlock />} />
          <Route path="/sanitary-ware"           element={<SanitaryWare />} />
          <Route path="/blocks-sands"            element={<BlocksSands />} />
          <Route path="/cement"                  element={<Cement />} />
          <Route path="/steel"                   element={<Steel />} />
          <Route path="/film-faced-plywood"      element={<FilmFacedPlywood />} />
          <Route path="/water-proofing"          element={<WaterProofing />} />
          <Route path="/gypsum-board"            element={<GypsumBoard />} />
          <Route path="/paints-tools"            element={<PaintsTools />} />
          <Route path="/general-tools-plumbing"  element={<GeneralToolsPlumbing />} />
          <Route path="/plumbing-sanitary"       element={<PlumbingSanitary />} />
          <Route path="/plumbing-sanitary-2"     element={<PlumbingSanitary2 />} />
          <Route path="/electric-lights"         element={<ElectricLights />} />
          <Route path="/products"                element={<ProductsPage />} />
          <Route path="/contact"                 element={<ContactPage />} />
          <Route path="/about"                   element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
