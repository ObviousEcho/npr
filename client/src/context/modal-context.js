import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isModal: false,
  toggleModal: () => {},
  closeModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <ModalContext.Provider value={{ isModal, toggleModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
