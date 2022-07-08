import React from "react";
import Pagination from "./Components/Pagination";
import Search from "./Components/Search";
import Stories from "./Components/Stories";
import { useGlobalContext } from "./Components/context";
import { useContext } from "react";
import { AppContext } from "./Components/context";
import "./App.css"

const App = () => {

  //const data= useContext(AppContext)

  return (
    <>
      {/* <p>Welcome tnewso the  app by   </p> */}
      <Search />
      <Pagination />
      <Stories />
    </>
  );
};

export default App;
