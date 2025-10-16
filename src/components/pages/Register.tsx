"use client";
import { ERole, IUser } from "@/server/entity";
import axios from "axios";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
const API_URL = process.env.API_URL;
interface IFormInput {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: ERole;
}
export default function Register() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const user: IUser = {
      id: 0,
      fullName: data.name,
      username: data.username,
      password: data.password,
      role: ERole.ADMIN,
      address: "",
      email: "",
      phoneNumber: "",
    };
    axios({
      url: `http://localhost:8080/api/auth/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 text-black"
    >
      <input
        {...register("name")}
        type="text"
        placeholder="Họ và tên"
        name="name"
        className="px-4 py-3 rounded-lg border focus:border-blue-500 outline-none transition"
        required
      />
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Tên đăng nhập"
        name="username"
        className="px-4 py-3 rounded-lg border focus:border-blue-500 outline-none transition"
        required
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Mật khẩu"
        name="password"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
      />
      <input
        {...register("confirmPassword", { required: true })}
        type="password"
        placeholder="Nhập lại mật khẩu"
        name="confirmPassword"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-fuchsia-500 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition"
      >
        Đăng ký
      </button>
    </form>
  );
}
