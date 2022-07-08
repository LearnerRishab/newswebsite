import { type } from "@testing-library/user-event/dist/type";
import React, { createContext, useReducer, useEffect, useContext } from "react";
import reducer from "../reducer";

const AppContext = createContext(); //data getting

//to create a provider function  //provider is like a delivery boy to deliver the data.

let API = "https://hn.algolia.com/api/v1/search?";

let initialState = {
  isLoading: true,
  query: "",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getNewsPosts = async (url) => {
    //Whenever we use fetch it returns a promise and it is complicated using
    // Promise as need to include .then [2 times] so we use Async Await for the promise section in ES 6
    //
    try {
      const res = await fetch(url); // we need to wait for getting
      //the data of that returned promise from network
      const data = await res.json();
      console.log(data);

      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });

      dispatch({ type: "SET_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };

  //to remove the post
  const removePost = (post_id) => {
    dispatch({ type: "REMOVE_POST", payload: post_id }); //Kaunsa operation perform krna hai woh btaana hai Dispatch ko in Context.
    //Then yeh dispatch reducer mein jaake will trigger that operation
  };

  //to search the post
  const searchPost = (searchQuery) => {
    dispatch({ type: "SEARCH_QUERY", payload: searchQuery });
  };

  //Pagination

  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };

  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };

  //to call the API function
  useEffect(() => {
    getNewsPosts(`${API}query=${state.query}&page=${state.page}`);
    //getNewsPosts(API);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook create ==> We are returning a hook or function in it and name should be start with "use"

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
