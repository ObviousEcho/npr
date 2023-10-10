import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isModal: false,
  toggleModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{ isModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
