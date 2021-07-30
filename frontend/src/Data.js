import React from "react";
import { useState, useEffect } from "react";


export default function Data(){

    const [articles,setArticles] =useState([])

useEffect(()=>{
  const fetchData= async()=>{
      const result = await fetch(`http://127.0.0.1:8000/sets`)  
      const body= await result.json(); 
      setArticles(body);  
  }
      fetchData();
},[]);

console.log(articles)

  return (
   <>
   {articles.map((d=>
    <>
<h1>{d.title}</h1>
<p>{d.author}</p>
</>
   ))}
   </>
      )
}