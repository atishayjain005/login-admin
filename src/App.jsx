import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Layout from "./components/Layout";
import "./styles/global.css"

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
