import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  // Enquiry Modal
  isEnquiryModalOpen: boolean;
  openEnquiryModal: (serviceType?: string, serviceId?: string) => void;
  closeEnquiryModal: () => void;
  enquiryModalProps: {
    defaultServiceType?: string;
    defaultServiceId?: string;
  };
  
  // Auth Modals
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  
  isRegisterModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  
  // Modal switching
  switchToRegister: () => void;
  switchToLogin: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [enquiryModalProps, setEnquiryModalProps] = useState<{
    defaultServiceType?: string;
    defaultServiceId?: string;
  }>({});

  const openEnquiryModal = (serviceType?: string, serviceId?: string) => {
    setEnquiryModalProps({ defaultServiceType: serviceType, defaultServiceId: serviceId });
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryModalProps({});
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <ModalContext.Provider 
      value={{
        isEnquiryModalOpen,
        openEnquiryModal,
        closeEnquiryModal,
        enquiryModalProps,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isRegisterModalOpen,
        openRegisterModal,
        closeRegisterModal,
        switchToRegister,
        switchToLogin,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}