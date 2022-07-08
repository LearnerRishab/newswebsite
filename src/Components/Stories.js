import React, { useEffect } from "react";
import { useGlobalContext } from "./context";

const Stories = () => {
  const { hits, nbPages, isLoading,removePost } = useGlobalContext();

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <div className="stories-div">
      {hits.map((e, id) => {
        return (
          
            <div key={id} className="card">
              <h2>{e.title}</h2>
              <p>
                By <span>{e.author}</span> | <span>{e.num_comments}</span>
                comments
              </p>
              <div className="card-button">
                <a href={e.url} target="_blank">
                  read more
                </a>
                <a href="#" onClick={()=>removePost(e.objectID)} >remove</a>
              </div>
            </div>

          
        );
      })}
      </div>
    </>
  );
};

export default Stories;
