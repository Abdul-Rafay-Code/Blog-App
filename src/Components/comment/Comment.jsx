import { Button } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import MyContext from "../../context/data/MyContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { firedb } from "../../firebase/Firebase";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

function Comment({fullname,setFullName,textarea,setTextArea,addComment,comment}) {
  const context = useContext(MyContext);
  const { mode,loading } = context;
//   console.log(comment)

 
  return (
    <section className=" py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2
            className="text-lg lg:text-2xl font-bold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Make Comment
          </h2>
        </div>
        {/* Comment Form  */}
        <form className="mb-6">
          {/* Full Name Input  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            }}
          >
            <input
              type="text"
              value={fullname}
              onChange={(e)=>setFullName(e.target.value)}
              placeholder="Enter Full Name"
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
              style={{
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
            />
          </div>

          {/* Text Area  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
            style={{
              background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            }}
          >
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              value={textarea}
              onChange={(e)=>setTextArea(e.target.value)}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
              style={{
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
              placeholder="Write a comment..."
              required
              defaultValue={""}
            />
          </div>
          {/* Button  */}
          <div className="">
            <Button
            onClick={addComment}
              style={{
                background:
                  mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color:
                  mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              }}
            >
              Post comment
            </Button>
          </div>
        </form>

        {/* Bottom Item  */}
        <article className="p-6 mb-6 text-base rounded-lg " style={{background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",}}>
         {
          loading ?
          <Loader />
          :
          comment.map((item,index)=>{
            console.log(item)
            return (
                <>
                 <footer className="flex justify-between items-center mb-" key={index}>
        <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg ">
          <p
            className="inline-flex items-center mr-3 text-lg  "
            style={{ color: mode === "dark" ? "black" : "black" }}
          >
            {item.fullname}
          </p>
          <p
            className="text-sm "
            style={{ color: mode === "dark" ? "black" : "black" }}
          >
            {item.date}
          </p>
        </div>
      </footer>
      <p
        className="text-gray-500 dark:text-gray-400 text-md"
        style={{ color: mode === "dark" ? "white" : "black" }}
      >
        {item.textarea}
      </p>
                </>
            )
        })
         }
        </article>
      </div>
    </section>
  );
}

export default Comment;
