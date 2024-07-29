"use client";
interface Iprops{text:string , type:string}
export const Button = ({text}:Iprops) => {
  return (
    <button  className="bg-blue-600 rounded-sm p-2 w-auto text-white" type="submit" >{text}</button>
  );
};
