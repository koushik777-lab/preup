import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Store from "@/pages/store";
import Travel from "@/pages/travel";
import Accommodation from "@/pages/accommodation";
import ShraddhaKriya from "@/pages/shraddha-kriya";
import AboutUs from "@/pages/about-us";
import Squad from "@/pages/squad";
import Articles from "@/pages/articles";
import PrivacyPolicy from "@/pages/privacy-policy";
import RefundPolicy from "@/pages/refund-policy";
import TermsConditions from "@/pages/terms-conditions";
import CustomerDashboard from "@/pages/customer-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";
import EnquiryModal from "@/components/enquiry-modal";
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import { AuthProvider } from "@/lib/auth";
import { ModalProvider, useModal } from "@/lib/modal-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/store" component={Store} />
      <Route path="/travel" component={Travel} />
      <Route path="/accommodation" component={Accommodation} />
      <Route path="/shraddha-kriya" component={ShraddhaKriya} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/squad" component={Squad} />
      <Route path="/articles" component={Articles} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/dashboard" component={CustomerDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function GlobalModals() {
  const {
    isEnquiryModalOpen,
    closeEnquiryModal,
    enquiryModalProps,
    isLoginModalOpen,
    closeLoginModal,
    isRegisterModalOpen,
    closeRegisterModal,
    switchToRegister,
    switchToLogin,
  } = useModal();

  return (
    <>
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={closeEnquiryModal}
        defaultServiceType={enquiryModalProps.defaultServiceType}
        defaultServiceId={enquiryModalProps.defaultServiceId}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSwitchToRegister={switchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
            <GlobalModals />
          </TooltipProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
