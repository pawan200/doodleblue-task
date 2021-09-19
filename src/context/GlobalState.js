import React, { createContext, createElement, useReducer } from "react";
import AppReducer from "./AppReducer";

//initail state
const initailState = {
  contacts: [
    {
      id: 1,
      fullName: "Pawan Singh",
      email: "pawankumarsingh200@gmail.com",
      company: "web access",
      mobile: "0123654789",
      address: "XYZ Mumbai, Maharashtra, India",
      color: "#DE3163",
    },
    {
      id: 2,
      fullName: "Kapish Singh",
      email: "kapish@gmail.com",
      company: "fresher",
      mobile: "0123654789",
      address: "XYZ Mumbai, Maharashtra, India",
      color: "#ec7063",
    },
    {
      id: 3,
      fullName: "Ritesh Singh",
      email: "ritesh.singh@gmail.com",
      company: "test infotech",
      mobile: "0123654789",
      address: "XYZ Mumbai, Maharashtra, India",
      color: "#ec7063",
    },
  ],
};

//create context
export const GlobalContext = createContext(initailState);

//Provider component

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initailState);

  const removeContact = (id) => {
    dispatch({
      type: "REMOVE_CONTACT",
      payload: id,
    });
  };

  const addContact = (contact) => {
    dispatch({
      type: "ADD_CONTACT",
      payload: contact,
    });
  };

  const editContact = (contact) => {
    dispatch({
      type: "EDIT_CONTACT",
      payload: contact,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        contacts: state.contacts,
        removeContact,
        editContact,
        addContact,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
