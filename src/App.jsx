import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import CropList from "./pages/CropList";
import CropForm from "./pages/CropForm";
import CropDetail from "./pages/CropDetail";
import QRGenerator from "./QRGenerator";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import AllCropList from "./pages/AllCropList";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/crop/:slug" element={<CropDetail />} />
        <Route path="/crops" element={<AllCropList />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 🔒 PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<CropList />} />
          <Route path="/admin/create" element={<CropForm />} />
          <Route path="/admin/edit/:id" element={<CropForm />} />
          <Route path="/qrgenerate" element={<QRGenerator />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;