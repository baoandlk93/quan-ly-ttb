"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "./Modal";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
} from "../ultilities/security";
import { ERole } from "../server/entity";
export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<null | string>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const user = getUserFromLocalStorage();
  const signOut = () => {
    setUserToLocalStorage(null);
    router.push("/");
  };
  useEffect(() => {
    if (user) {
      setShowModal(false);
      if (
        user.roles
          .map((role: ERole) => {
            console.log(role);
            return role;
          })
          .includes(ERole.ADMIN)
      ) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
    console.log(user);
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo-benh-vien.jpeg"
                className="h-10 w-10 mr-3 rounded-full"
                alt="HABIO Shop"
              />
              <span className="text-white text-2xl font-bold">
                BỆNH VIỆN PHỔI KHÁNH HÒA
              </span>
            </div>

            {/* Menu */}
            <div className="flex space-x-5">
              <Link
                href="/"
                className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10"
              >
                Trang chủ
              </Link>

              {/* Giới thiệu */}
              <Link
                href="/about"
                className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10"
              >
                Giới thiệu
              </Link>
              {/* Liên hệ */}
              <Link
                href="/contact"
                className="text-white px-3 py-2 rounded transition hover:text-fuchsia-200 hover:bg-white/10"
              >
                Liên hệ
              </Link>
              {user ? (
                <div className="flex items-center gap-2">
                  <img
                    src={user.image || ""}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                    width={32}
                    height={32}
                    title={user.name || ""}
                  />
                  <button
                    onClick={() => signOut()}
                    className="px-5 py-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white rounded-lg font-semibold shadow hover:scale-105"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white rounded-lg font-semibold shadow hover:scale-105"
                >
                  Đăng nhập / Đăng ký
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <AuthForm />
      </Modal>
    </>
  );
}
