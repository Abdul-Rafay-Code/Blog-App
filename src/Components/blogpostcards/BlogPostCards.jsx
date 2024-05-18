import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";
import MyContext from "../../context/data/MyContext";
import Loader from "../loader/Loader";

function BlogPostCard() {
  const context = useContext(MyContext);
  const { mode,getAllBlog,loading } = context;

  const user = JSON.parse(localStorage.getItem('user'))
  // console.log(user)

  return (
    <>
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">
          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {/* Card 1  */}
          {user 
          ?
          loading ?
            <Loader />
          :
          getAllBlog.map((item,index)=>{
            //  console.log(item)
      return (
        <>
        <div className="p-4 md:w-1/3" key={index}>
    <div
      style={{
        background: mode === "dark" ? "rgb(30, 41, 59)" : "white",
        borderBottom:
          mode === "dark"
            ? " 4px solid rgb(226, 232, 240)"
            : " 4px solid rgb(30, 41, 59)",
      }}
      className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
     ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
     rounded-xl overflow-hidden`}
    >
      {/* Blog Thumbnail  */}
      <img
        className=" w-full"
        src={ item.thumbnail}
        alt="blog"
      />

      {/* Top Items  */}
      <div className="p-6">
        {/* Blog Date  */}
        <h2
          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
          style={{
            color:
              mode === "dark"
                ? "rgb(226, 232, 240)"
                : " rgb(30, 41, 59)",
          }}
        >
          {item.date}
        </h2>

        {/* Blog Title  */}
        <h1
          className="title-font text-lg font-bold text-gray-900 mb-3"
          style={{
            color:
              mode === "dark"
                ? "rgb(226, 232, 240)"
                : " rgb(30, 41, 59)",
          }}
        >
          {item.blogs.title}
        </h1>

         {/* Blog Category  */}
         <h4
          className="title-font text-lg font-bold text-gray-900 mb-3"
          style={{
            color:
              mode === "dark"
                ? "rgb(226, 232, 240)"
                : " rgb(30, 41, 59)",
          }}
        >
          {item.blogs.category}
        </h4>

        {/* Blog Description  */}
        <p
          className="leading-relaxed mb-3"
          style={{
            color:
              mode === "dark"
                ? "rgb(226, 232, 240)"
                : " rgb(30, 41, 59)",
          }}
        >
          {item.blogs.content}
        </p>
      </div>
    </div>
  </div>
        </>
      )
    })
  


          :
          <div className="flex justify-center text-3xl items-center ">
            User Not Found
          </div>
          }

          
        </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default BlogPostCard;
