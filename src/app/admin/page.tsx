"use client";
import Statistic from "@/components/admin/statistics/Statistic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    // console.log(status,"status");
    // if (status === "loading") return;
    // console.log(session,"session");
    // if (!session || session.user?.role !== "admin") {
    //   router.push("/"); // Ra ngoài nếu không phải admin
    // }
  }, [router]);
  return (
    <div>
      <Statistic />
    </div>
  );
}
