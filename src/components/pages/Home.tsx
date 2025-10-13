"use client";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {}, []);

  useEffect(() => {
    const auth = params.get("auth");
    if (auth === "required") {
      toast.warning("Bạn cần đăng nhập để truy cập trang này!");
      router.replace("/", { scroll: false });
    }
    if (auth === "forbidden") {
      toast.error("Bạn không có quyền truy cập khu vực này!");
      router.replace("/", { scroll: false });
    }
  }, [params, router]);
  useEffect(() => {}, []);
  return (
    <>
      <main className="min-h-screen bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 pt-16">
        <section className="py-12 text-center bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Chào mừng đến với Bệnh viện Phổi Khánh hòa!
          </h1>
          <p className="text-lg max-w-xl mx-auto">
            Khám phá các tính năng nổi bật của trang web!
          </p>
        </section>

        <section className="py-8 px-4 max-w-6xl mx-auto flex flex-col items-center bg-gradient-to-tr from-white via-gray-50 to-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-indigo-600">
            Khám phá thêm
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shoes"
              className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition">
              Xem tất cả sản phẩm
            </Link>
            <Link
              href="/about"
              className="px-5 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium transition">
              Về chúng tôi
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 rounded border border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50 font-medium transition">
              Liên hệ ngay
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
