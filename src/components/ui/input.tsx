import { InputHTMLAttributes } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>;

const input = ({ ...rest }: IProps) => {
  return (
    <input
      type=""
      name=""
      id=""
      className="border-2 border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 rounded-md p-3 focus:ring-1 focus:outline-none"
      {...rest}
    />
  );
};

export default input;
