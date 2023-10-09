import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isModal: false,
  setIsModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <ModalContext.Provider value={{ isModal: isModal, setIsModal: setIsModal }}>
      {children}
    </ModalContext.Provider>
  );
};
