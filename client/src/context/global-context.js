import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  isModal: false,
  toggleModal: () => {},
  closeModal: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        isModal,
        toggleModal,
        closeModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
