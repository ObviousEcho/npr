import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isModal: false,
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <ModalContext.Provider value={{ isModal: isModal }}>
      {children}
    </ModalContext.Provider>
  );
};
