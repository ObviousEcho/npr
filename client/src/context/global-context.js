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
  IsBackdrop: false,
  closeBackdrop: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isBackdrop, setIsBackdrop] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmId, setConfirmId] = useState("");

  const toggleModal = () => {
    setIsModal((prev) => !prev);
    setIsBackdrop((prev) => !prev);
  };

  const closeModal = () => {
    setIsModal(false);
    setIsBackdrop(false);
  };

  const toggleConfirmModal = () => {
    setIsConfirmModal((prev) => !prev);
    setIsBackdrop((prev) => !prev);
  };

  const closeBackdrop = () => {
    setIsBackdrop(false);
    setIsModal(false);
    setIsConfirmModal(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmModal(false);
    setIsBackdrop(false);
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
        isBackdrop,
        closeBackdrop,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
