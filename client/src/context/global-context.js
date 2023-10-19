import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  isModal: false,
  toggleModal: () => {},
  isConfirmModal: false,
  toggleConfirmModal: () => {},
  closeModals: () => {},
  confirmTitle: "",
  setTitle: () => {},
  confirmId: "",
  setId: () => {},
  isBackdrop: false,
  closeBackdrop: () => {},
  isUpdateModal: false,
  toggleUpdateModal: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isBackdrop, setIsBackdrop] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmId, setConfirmId] = useState("");

  const toggleModal = () => {
    setIsModal((prev) => !prev);
    setIsBackdrop((prev) => !prev);
  };

  const toggleConfirmModal = () => {
    setIsConfirmModal((prev) => !prev);
    setIsBackdrop((prev) => !prev);
  };

  const toggleUpdateModal = () => {
    setIsUpdateModal((prev) => !prev);
    setIsBackdrop((prev) => !prev);
  };

  const closeBackdrop = () => {
    setIsBackdrop(false);
    setIsModal(false);
    setIsConfirmModal(false);
    setIsUpdateModal(false);
  };

  const closeModals = () => {
    setIsConfirmModal(false);
    setIsBackdrop(false);
    setIsUpdateModal(false);
    setIsModal(false);
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
        isConfirmModal,
        toggleConfirmModal,
        closeModals,
        confirmTitle,
        confirmId,
        setTitle,
        setId,
        isBackdrop,
        closeBackdrop,
        isUpdateModal,
        toggleUpdateModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
