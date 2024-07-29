"use client";
import { useState} from "react";
import { Button } from "../Button/Button";
import { checkUserExists, getAllUsers, registerUser } from "@/services/authService";
import { userRegister } from "@/utils/validation";
import { ValidationError } from "yup";


const RegisterForm = () => {
    const [userInputs , setUserInputs]=useState({
      username : "",
        email : "",
        password: "",
    });

 const [errorsMass, setErrorsMass] =useState<{ username?: string; email?: string; password?: string }>({});

     const validation = async ()=>{
      try{
        await userRegister.validate(userInputs,{abortEarly:false});
        return true;
      }catch (error){
        if(error instanceof ValidationError){
          const newErrors : { [key: string]: string } = {};
          error.inner.forEach((err)=>{
            if(err.path){
              newErrors[err.path as keyof typeof newErrors] = err.message;
            }
          });
          setErrorsMass(newErrors)

        }
        return false;

      }
     

    }

    const  fromSubmitHandler = async (e:React.FormEvent)=>{
      e.preventDefault();
      //validation
      const isValid = await validation()
      if (!isValid) return;

        // Check if user exists
        try {
          const userExists = await checkUserExists(userInputs.email);
          if (userExists) {
             
              return;
          }
      } catch (error) {
            setErrorsMass((prev) => ({
                  ...prev,
                  email: "User with this email already exists",
              }));
          return;
      }

      
   
      try {

        // Create New User
            const data = await registerUser(userInputs);
            console.log("Registration successful:", data);
             // Clear userInputs and errors
              setUserInputs({ username: "", email: "", password: "" });
              setErrorsMass({});
        } catch (error) {
            console.error("Registration failed:", error.message);
        }

        // Get All User
        try{
          const data = await getAllUsers(userInputs);
          console.log(data);
        }catch(error){
          console.error(" failed", error.message);
        }

    }

  return (
    <div className="container">
        <form onSubmit={fromSubmitHandler}> 
          <div>
             <input type="text" name="Name" placeholder="Username"
         value={userInputs.username}
         onChange={(e)=>setUserInputs(prev=>{
            return{...prev, username:e.target.value}
             })}
        />
        {errorsMass.username && <p>{errorsMass.username}</p>}
          </div>
          
       <div>
          <input type="email" name="email" placeholder="Email"
         value={userInputs.email}
         onChange={(e)=>
            setUserInputs(prev=>{
        return{...prev, email:e.target.value}
         })}
        />

{errorsMass.email && <p>{errorsMass.email}</p>}

       </div>

      <div>
         <input type="password" name="password" placeholder="Password"
         value={userInputs.password}
         onChange={(e)=>setUserInputs(prev=>{
            return{...prev, password:e.target.value}
             })}
         />

         {errorsMass.password && <p>{errorsMass.password}</p>}
      </div>
        
       

         <Button text="Sign-up" type="submit" />

        </form>

    </div>
   
  )
}

export default RegisterForm