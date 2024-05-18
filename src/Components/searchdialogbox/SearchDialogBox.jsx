import { Fragment, useContext, useState } from "react";
import { Dialog, DialogBody, Input } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import MyContext from "../../context/data/MyContext";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate()
  
  
  const context = useContext(MyContext);
  const { mode,search,setSearch,getAllBlog,loading } = context;

  const user = JSON.parse(localStorage.getItem('user'))

  // console.log(search)
  return (
    <Fragment>
      {/* Search Icon  */}
      <div onClick={handleOpen}>
        <AiOutlineSearch size={20} color="white" />
      </div>
      {/* Dialog  */}
      <Dialog
        className=" relative right-[1em] w-[25em]  md:right-0 md:w-0 lg:right-0 lg:w-0"
        open={open}
        handler={handleOpen}
        style={{
          background: mode === "light" ? "#2f3542" : "#2f3542",
          color: mode === "dark" ? "white" : "black",
        }}
      >
        {/* Dialog Body  */}
        <DialogBody>
          <div className="flex w-full   justify-center">
            {/* Input  */}
            <Input
              color="white"
              type="search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              label="Type here..."
              className=" bg-[#2C3A47]"
              name="searchkey"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
          </div>

          {/* Blog Card  */}
{
  user 
  ?
  <div className="flex justify-center flex-wrap  sm:mx-auto sm:mb-2 -mx-2  mt-4 mb-2 ">
             
  {
   loading ?
   <Loader />
   :
   getAllBlog.filter((obj)=> obj.blogs.title.toLowerCase().includes(search)).map((item,index)=>{
     return ( 

      <div className="p-2 sm:w-1/4 w-full " key={index}>
      <div className=" container mx-auto px-4 bg-gray-200 p-2 rounded-lg ">
        {/* Blog Thumbnail  */}
        <img
          className="w-20 mb-2 rounded-lg"
          onClick={()=>navigate(`/BlogInfo/${item.id}`)}
          
          src={item.thumbnail }
          alt=""
        />

        {/* Blog Date  */}
        <p className="w-40 text-sm">{item.date}</p>

        {/* Blog Title  */}
        <h1>{item.blogs.title}</h1>
      </div>
    </div>
    
  
            

     )
})   
  }
 </div>
 :
 <div className="flex justify-center text-2xl">
  User Not Found
 </div>
}

          {/* Heading  */}
          <div className=" text-center">
            <h1 className=" text-gray-600">Powered By ARafay</h1>
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}
