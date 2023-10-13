import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  isModal: false,
  toggleModal: () => {},
  closeModal: () => {},
  isConfirmModal: false,
  toggleConfirmModal: () => {},
  closeConfirmModal: () => {},
  confirmTitle: "",
  setTitle: () => {},
  confirmId: "",
  setId: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmId, setConfirmId] = useState("");

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const toggleConfirmModal = () => {
    setIsConfirmModal((prev) => !prev);
  };

  const closeConfirmModal = () => {
    setIsConfirmModal(false);
  };

  const setTitle = (str) => {
    setConfirmTitle(str);
  };

  const setId = (str) => {
    setConfirmId(str);
  };

  return (
    <GlobalContext.Provider
      value={{
        isModal,
        toggleModal,
        closeModal,
        isConfirmModal,
        toggleConfirmModal,
        closeConfirmModal,
        confirmTitle,
        confirmId,
        setTitle,
        setId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
