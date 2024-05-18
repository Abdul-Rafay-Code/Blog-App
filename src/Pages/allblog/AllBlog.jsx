import React, { useContext } from "react";
import Layout from "../../Components/layout/Layout";
import MyContext from "../../context/data/MyContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loader/Loader";

function AllBlogs() {
  const context = useContext(MyContext);
  const { mode,getAllBlog,loading } = context;
  console.log(getAllBlog)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) 

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">
          {/* Top Heading  */}
          <div className="mb-5">
            <h1
              className=" text-center text-2xl font-bold"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              All Blogs
            </h1>
          </div>
          {/* Main Content  */}
          <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">

{
  user 
  ?
  <div className="flex flex-wrap justify-center -m-4 mb-5">
  {
   loading ?
   <Loader  />
   :

   
     getAllBlog.length > 0
     ?

         getAllBlog.map((item,index)=>{
           console.log(item)
           return (
             <>
             <div className="p-4 md:w-1/3" key={index} onClick={()=>navigate(`/BlogInfo/${item.id}`)} >
               <div
                 style={{
                   background: mode === 'dark'
                     ? 'rgb(30, 41, 59)'
                     : 'white',
                   borderBottom: mode === 'dark'
                     ?
                     ' 4px solid rgb(226, 232, 240)'
                     : ' 4px solid rgb(30, 41, 59)'
                 }}
                 className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                 ${mode === 'dark'
                     ? 'shadow-gray-700'
                     : 'shadow-xl'
                     } 
                 rounded-xl overflow-hidden`} 
               >
                 {/* Blog Thumbnail  */}
                 <img className=" w-full" src={item.thumbnail} alt="blog" />

                 {/* Top Items  */}
                 <div className="p-6">
                   {/* Blog Date  */}
                   <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{
                     color: mode === 'dark'
                       ? 'rgb(226, 232, 240)'
                       : ' rgb(30, 41, 59)'
                   }}>
                     {item.date}
                   </h2>

                   {/* Blog Title  */}
                   <h1 className="title-font text-lg font-bold text-gray-900 mb-3" style={{
                     color: mode === 'dark'
                       ? 'rgb(226, 232, 240)'
                       : ' rgb(30, 41, 59)'
                   }}>
                     {item.blogs.title}
                   </h1>

                   {/* Blog Description  */}
                   <p className="leading-relaxed mb-3" style={{
                     color: mode === 'dark'
                       ? 'rgb(226, 232, 240)'
                       : ' rgb(30, 41, 59)'
                   }}>
                     {item.blogs.content}
                   </p>
                 </div>
               </div>
             </div>
             </>
           )
         })
       
       
        :
       <>
         <h1>Not Found</h1>
         </>
     } 
  
 </div>
 :
 <div className="flex justify-center items-center text-3xl">
  User Not Found
 </div>
}

        

        </div>
      </section >
    </div >
  
        </div>
      </section>
    </Layout>
  );
}

export default AllBlogs;
