"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import {
  setUserToLocalStorage,
  getUserFromLocalStorage,
} from "@/ultilities/security";
import { ERole } from "@/server/entity";
export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await axios({
      url: `http://localhost:8080/api/auth/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ username, password }),
    })
      .then((res) => {
        setUserToLocalStorage(res.data.data);
      })
      .catch((e) => {
        toast.error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
      });

    setLoading(false);
    if (getUserFromLocalStorage()) {
      if (getUserFromLocalStorage()?.roles?.includes(ERole.ADMIN)) {
        toast.success("Chào mừng admin!");
        router.push("/admin");
      } else {
        toast.success(" Đăng nhập thành công!");
        router.push("/");
      }
    } else {
      toast.error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
    }
  };
  return (
    <form
      className="flex flex-col space-y-4 text-black"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Tài khoản"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="px-4 py-3 rounded-lg border focus:border-fuchsia-500 outline-none transition"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white rounded px-4 py-2 w-full"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
      <a
        href="#"
        className="text-sm text-blue-700 text-center hover:underline mt-2"
      >
        Quên mật khẩu?
      </a>
    </form>
  );
}
