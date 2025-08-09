import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import RepDashboard from "./pages/RepDashboard";
import ManageClientsPage from "./pages/ManageClientsPage";
import ManageProductsPage from "./pages/ManageProductsPage";
import ManageTasksPage from "./pages/ManageTasksPage";
import ManageOrdersPage from "./pages/ManageOrdersPage";
import SalesReportsPage from "./pages/SalesReportsPage";
import ViewClientsPage from "./pages/ViewClientsPage";
import ViewProductsPage from "./pages/ViewProductsPage";
import TrackRoutesPage from "./pages/TrackRoutesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Admin Protected Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="clients" element={<ManageClientsPage />} />
              <Route path="products" element={<ManageProductsPage />} />
              <Route path="tasks" element={<ManageTasksPage />} />
              <Route path="orders" element={<ManageOrdersPage />} />
              <Route path="sales" element={<SalesReportsPage />} />
            </Route>
            
            {/* Medical Rep Protected Routes */}
            <Route path="/rep" element={
              <ProtectedRoute requiredRole="medical_rep">
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<RepDashboard />} />
              <Route path="clients" element={<ViewClientsPage />} />
              <Route path="products" element={<ViewProductsPage />} />
              <Route path="routes" element={<TrackRoutesPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
