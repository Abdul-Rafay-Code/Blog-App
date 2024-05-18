import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/data/MyContext";
import { useParams } from "react-router-dom";
import { QuerySnapshot, Timestamp, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { firedb } from "../../firebase/Firebase";
import Layout from "../../Components/layout/Layout";
import Loader from "../../Components/loader/Loader";
import Comment from "../../Components/comment/Comment";
import toast from "react-hot-toast";

const BlogInfo = () => {
  const context = useContext(MyContext);
  const { mode, loading, setLoading } = context;

  const param = useParams();
  console.log(param.id);

  const [getBlogs, setGetBlogs] = useState();

  const getBlog = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(firedb, "blogPost", param.id));
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      } else {
        console.log("Document does not exists");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
    window.scrollTo(0, 0);
  }, []);

  const [fullname, setFullName] = useState();
  const [textarea, setTextArea] = useState();

  const addComment = async () => {
    const reference = collection( firedb,"blogPost/" + `${param.id}/` + "comment");
    try {
      await addDoc(reference, {
        fullname,
        textarea,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success("Comment Add Successfully");
      setFullName("");
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  const [comment,setAllComment] = useState([])
//   console.log(comment)

  const getComment = async ()=>{
    setLoading(true)

    try {

        const q = query(
            collection(firedb, 'blogPost/' + `${param.id}/` + 'comment/'),
            orderBy('time')
        )
    
        const data = onSnapshot(q,(QuerySnapshot)=>{
            const commentarray = [];
            QuerySnapshot.forEach((doc)=>{
                commentarray.push({...doc.data(), id:doc.id})
            })
            setAllComment(commentarray)
            setLoading(false)
        })
         return ()=>data
        } catch (error) {
            console.log(error)
            setLoading(false)
    }
   
  }

  useEffect(()=>{
    getComment();
  },[])

  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <>
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
        {loading ? (
          <Loader />
        ) : 
        <>
          <div className=" py-4 lg:py-8">
            <div>
              {/* Thumbnail  */}
              <img
                alt="content"
                className="mb-3 rounded-lg h-full w-full"
                src={getBlogs?.thumbnail}
              />
              {/* title And date  */}
              <div className="flex justify-between items-center mb-3">
                <h1
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className=" text-xl md:text-2xl lg:text-2xl font-semibold"
                >
                  {getBlogs?.blogs?.title}
                </h1>
                <p style={{ color: mode === "dark" ? "white" : "black" }}>
                  {getBlogs?.date}
                </p>
              </div>
              <div
                className={`border-b mb-5 ${
                  mode === "dark" ? "border-gray-600" : "border-gray-400"
                }`}
              />

              {/* blog Content  */}
              <div className="content">
                <div
                  className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                            ${
                              mode === "dark"
                                ? "[&>h1]:text-[#ff4d4d]"
                                : "[&>h1]:text-black"
                            }
    
                            [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                            ${
                              mode === "dark"
                                ? "[&>h2]:text-white"
                                : "[&>h2]:text-black"
                            }
    
                            [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                            ${
                              mode === "dark"
                                ? "[&>h3]:text-white"
                                : "[&>h3]:text-black"
                            }
    
                            [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                            ${
                              mode === "dark"
                                ? "[&>h4]:text-white"
                                : "[&>h4]:text-black"
                            }
    
                            [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                            ${
                              mode === "dark"
                                ? "[&>h5]:text-white"
                                : "[&>h5]:text-black"
                            }
    
                            [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                            ${
                              mode === "dark"
                                ? "[&>h6]:text-white"
                                : "[&>h6]:text-black"
                            }
    
                            [&>p]:text-[16px] [&>p]:mb-1.5
                            ${
                              mode === "dark"
                                ? "[&>p]:text-[#7efff5]"
                                : "[&>p]:text-black"
                            }
    
                            [&>ul]:list-disc [&>ul]:mb-2
                            ${
                              mode === "dark"
                                ? "[&>ul]:text-white"
                                : "[&>ul]:text-black"
                            }
    
                            [&>ol]:list-decimal [&>li]:mb-10
                            ${
                              mode === "dark"
                                ? "[&>ol]:text-white"
                                : "[&>ol]:text-black"
                            }
    
                            [&>li]:list-decimal [&>ol]:mb-2
                            ${
                      mode === "dark"
                                ? "[&>ol]:text-white"
                                : "[&>ol]:text-black"
                            }
    
                            [&>img]:rounded-lg
                            `}
                  dangerouslySetInnerHTML={createMarkup(
                    getBlogs?.blogs?.content
                  )}
                ></div>
              </div>
            </div>
          </div>
          
          <Comment
          fullname={fullname}
          textarea={textarea}
          setFullName={setFullName}
          setTextArea={setTextArea}
          addComment={addComment}
          comment={comment}
        />
        </>
        }
        
      </section>
      
    </Layout>
    </>
  );
};

export default BlogInfo;
