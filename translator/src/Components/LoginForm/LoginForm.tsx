"use client";
import { useState } from "react";
import { Button } from "../Button/Button";
import { userLogin } from "@/utils/validation";
import { ValidationError } from "yup";

export const LoginForm = () => {
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
});

const [errorsMass, setErrorsMass] =useState<{ email?: string; password?: string }>({});

const validation = async ()=>{
  try{
    await userLogin.validate(userInputs,{abortEarly:false});
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

const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const isValid = await validation()
      if (!isValid) return;

}

  return (
    <div className="container">
    <form onSubmit={handleFormSubmit}>
      <div>
      <input type="email" 
      name="email" placeholder="Email"
      value={userInputs.email}
      onChange={(e)=>
        setUserInputs(prev=>{
    return{...prev, email:e.target.value}
     })}
      />
      {errorsMass.email && <p>{errorsMass.email}</p>}
      </div>

      <div>
      <input type="password"
       name="password" 
       placeholder="Password" 
       value={userInputs.password}
       onChange={(e)=>
        setUserInputs(prev=>{
     return{...prev, password:e.target.value}
     })}
        />
        {errorsMass.password && <p>{errorsMass.password}</p>}

      </div>
   
        
        <Button text="Sign In" type="submit"/>
   </form>
   </div>
  )
}
