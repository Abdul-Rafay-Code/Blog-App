import React, { useEffect, useState } from 'react'
import MyContext from './MyContext';
import toast from 'react-hot-toast';
import { QuerySnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {firedb} from '../../firebase/Firebase'
import Loader from '../../Components/loader/Loader'
import { deleteDoc, doc } from "firebase/firestore";

const MyState = (props) => {
    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }
//    const [Loader,setLoader] = useState(<Loader/>)
    const [loading,setLoading] = useState(true)
    const [search,setSearch] = useState()
    // setLoading()

    const [getAllBlog,setgetAllBlog] = useState()
  //  console.log(getAllBlog)
  function getAllBlogs() {
    setLoading(true);
    try {
        const q = query(
            collection(firedb, "blogPost"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let blogArray = [];
            QuerySnapshot.forEach((doc) => {
                blogArray.push({ ...doc.data(), id: doc.id });
            });
            
            setgetAllBlog(blogArray)
            // console.log(blogArray)   
                     setLoading(false)

                    });
                    return () => data;
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}
// console.log(getAllBlog)

    useEffect(()=>{
        getAllBlogs()
    },[])

    const deleteBlog = async (id) => {
        try {
          await deleteDoc(doc(firedb, "blogPost", id));
          getAllBlogs()
          toast.success("Blog Delete Successfully");
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <MyContext.Provider value={{mode,toggleMode,loading,setLoading,search,setSearch,getAllBlog,setgetAllBlog,deleteBlog}}>
          {props.children}
    </MyContext.Provider>
  )
}

export default MyState