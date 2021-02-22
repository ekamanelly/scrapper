import React, { createContext, useState } from 'react';


export  const PostContent = createContext()


export const PostProvider  = (props) => {
    const [post ,setPost] = useState([])
     return ( 
         <PostContent.Provider value={[post,setPost]}>
             {props.children}
         </PostContent.Provider>

      );
}
 