import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import SetupAdmin from "./pages/SetupAdmin";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAboutCMS from "./admin/AdminAboutCMS";
import AdminServicesCMS from "./admin/AdminServicesCMS";
import AdminLocationCMS from "./admin/AdminLocationCMS";
import AdminContactInfo from "./admin/AdminContactInfo";
import AdminHome from "./admin/AdminHome";



import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />

         <Route path="/admin/setup" element={<SetupAdmin />} />   {/* Only first-time setup */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Login />} />
        <Route path="/admin/about" element={<AdminAboutCMS />} />
        <Route  path="/admin/services" element={<AdminServicesCMS />}></Route>
        <Route path="/admin/location" element={<AdminLocationCMS />}></Route>
        <Route path="/admin/contact" element={<AdminContactInfo />}></Route>
       <Route path="/admin/home" element={<AdminHome />}></Route>
        
        

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}


          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
