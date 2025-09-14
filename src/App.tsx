/**
 * SafePhone NG - Main Application Component
 * 
 * This is the root component that sets up the entire application structure
 * including routing, authentication, and global providers for the blockchain-powered
 * phone security platform.
 */

// UI Components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// React Query for server state management
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Router for navigation
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication context for user management
import { AuthProvider } from "@/contexts/AuthContext";

// Page components for different routes
import Index from "./pages/Index";           // Landing page with hero, features, etc.
import Auth from "./pages/Auth";             // Sign in/Sign up page
import Dashboard from "./pages/Dashboard";    // User dashboard for device management
import RegisterPhone from "./pages/RegisterPhone";  // Device registration flow
import Payment from "./pages/Payment";        // Payment processing page
import ReportTheft from "./pages/ReportTheft";      // Theft reporting interface
import VerifyDevice from "./pages/VerifyDevice";    // Device verification for agents
import NotFound from "./pages/NotFound";      // 404 error page

// Global navigation component
import Navbar from "./components/Navbar";

// Configure React Query client for API caching and synchronization
const queryClient = new QueryClient();

/**
 * Main App Component
 * 
 * Sets up the application with nested providers in the correct order:
 * 1. QueryClientProvider - Manages server state and caching
 * 2. AuthProvider - Handles user authentication state
 * 3. TooltipProvider - Enables tooltip functionality
 * 4. BrowserRouter - Enables client-side routing
 * 
 * The routing structure includes:
 * - Public routes: /, /auth, /verify-device (for security agents)
 * - Protected routes: /dashboard, /register-phone, /payment, /report-theft
 * - Catch-all route for 404 errors
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        {/* Toast notifications for user feedback */}
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          {/* Global navigation - appears on all pages */}
          <Navbar />
          
          {/* Application routes */}
          <Routes>
            {/* Landing page - showcases features and benefits */}
            <Route path="/" element={<Index />} />
            
            {/* Authentication - login/register */}
            <Route path="/auth" element={<Auth />} />
            
            {/* User dashboard - device management */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Device registration flow */}
            <Route path="/register-phone" element={<RegisterPhone />} />
            
            {/* Payment processing */}
            <Route path="/payment" element={<Payment />} />
            
            {/* Theft reporting interface */}
            <Route path="/report-theft" element={<ReportTheft />} />
            
            {/* Device verification for security agents */}
            <Route path="/verify-device" element={<VerifyDevice />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            
            {/* 404 fallback - must be last route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
