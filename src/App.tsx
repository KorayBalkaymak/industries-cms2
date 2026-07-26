import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import ServiceDetail from '@/pages/ServiceDetail';
import UeberUns from '@/pages/UeberUns';
import Kontakt from '@/pages/Kontakt';
import Impressum from '@/pages/Impressum';
import Datenschutz from '@/pages/Datenschutz';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<Navigate to="/#leistungen" replace />} />
          <Route path="/leistungen/:slug" element={<ServiceDetail />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
