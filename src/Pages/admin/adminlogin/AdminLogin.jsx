import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import MyContext from "../../../context/data/MyContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from '../../../firebase/Firebase'

export default function AdminLogin() {
  const context = useContext(MyContext);
  const { mode } = context;

  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()

  const login = async ()=>{
    if(!email && !password){
      return toast.error('Please fill this input')
    }
   

 try {
  const result = await signInWithEmailAndPassword(auth , email,password);
       toast.success('Login Successfully')
       localStorage.setItem('user',JSON.stringify(result))
       navigate('/DashBoard')
  
 } catch (error) {
       toast.error('Login Failed')
      console.log(error)
 }
}

  

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Card  */}
      <Card
        className="w-full max-w-[24rem]"
        style={{
          background:
            mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
        }}
      >
        {/* CardHeader */}
        <CardHeader
          color="blue"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
          style={{
            background:
              mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
          }}
        >
          <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
            <div className=" flex justify-center">
              {/* Image  */}
              <img
                src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
                className="h-20 w-20"
              />
            </div>
          </div>

          {/* Top Haeding  */}
          <Typography
            variant="h4"
            style={{
              color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
            }}
          >
            Admin Login
          </Typography>
        </CardHeader>

        {/* CardBody */}
        <CardBody>
          <form className=" flex flex-col gap-4">
            {/* First Input  */}
            <div>
              <Input type="email" label="Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            {/* Second Input  */}
            <div>
              <Input type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            {/* Login Button  */}
            <Button
            onClick={login}
              style={{
                background:
                  mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color:
                  mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              }}
            >
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
