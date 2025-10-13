"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50 text-black overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 pt-2 w-full overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
