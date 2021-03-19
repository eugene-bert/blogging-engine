import React from "react";

export const ApplicationContext = React.createContext();

const applicationState = {
  isLoggedIn: localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined',
  articles: [],
}

function ContextReducer(state, action) {
  switch (action.type) {
    case "LOG_OUT": {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    case "LOG_IN": {
      return {
        ...state,
        isLoggedIn: true
      };
    }
    case "SET_ARTICLES": {
      return {
        ...state,
        articles: action.payload
      }
    }
    default:
      return state;
  }
}

export function ContextProvider(props) {
  const [state, dispatch] = React.useReducer(ContextReducer, applicationState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <ApplicationContext.Provider value={value} {...props} />;
}

export function useApplicationContext() {
  const context = React.useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      `useApplicationContext must be used within a ContextProvider`
    );
  }
  const [state, dispatch] = context;

  return {
    state,
    dispatch,
  };
}
