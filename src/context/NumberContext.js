import React, { createContext, useReducer } from "react";

// Create Context
export const NumberContext = createContext();

// Set the initial state
const INITIAL_STATE = [];

//Reducer
const numberReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_NUMBER":
      return [...state, payload];
    case "EDIT_NUMBER":
      return state.map((number) => {
        if (number.id === payload.id) {
          return {
            ...number,
            number: payload.number,
            isEdit: false,
          };
        }
        return number;
      });
    case "DELETE_NUMBER":
      return state.filter((number) => number.id !== payload);
    case "CHANGE_EDIT":
      return state.map((number) => {
        if (number.id === payload) {
          return {
            ...number,
            isEdit: !number.isEdit,
          };
        }
        return number;
      });
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export const NumberContextProvider = ({ children }) => {
  const [numbers, dispatch] = useReducer(numberReducer, INITIAL_STATE);

  // Add Number Action
  const addNumberAction = (number) => {
    dispatch({
      type: "ADD_NUMBER",
      payload: {
        id: Date.now(),
        number,
        isEdit: false,
      },
    });
  };

  // Edit Number Action
  const editNumberAction = ({ id, number }) => {
    dispatch({
      type: "EDIT_NUMBER",
      payload: {
        id,
        number,
      },
    });
  };

  // Delete Number Action
  const deleteNumberAction = (id) => {
    dispatch({
      type: "DELETE_NUMBER",
      payload: id,
    });
  };

  // change Edit action
  const changeEditAction = (id) => {
    dispatch({
      type: "CHANGE_EDIT",
      payload: id,
    });
  };
  return (
    <>
      <NumberContext.Provider
        value={{
          numbers,
          addNumberAction,
          editNumberAction,
          deleteNumberAction,
          changeEditAction,
        }}
      >
        {children}
      </NumberContext.Provider>
    </>
  );
};
