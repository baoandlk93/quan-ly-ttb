"use client";

import AdminTable from "@/components/AdminTable";
import { Button, Modal } from "antd";
import AdminProductForm from "@/components/admin/products/AdminProductForm";
import { useState } from "react";
import { Device } from "@/server/entity";
export default function QuanLyTrangThietBiPage() {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Device | null>(null);
  const handleAdd = () => {
    setOpen(true);
    setInitialData(null);
  };
  const handleEdit = (record: Device) => {
    setOpen(true);
    setInitialData(record);
  };
  const handleSubmit = () => {
    setOpen(false);
    setInitialData(null);
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Quản lý trang thiết bị</h1>
      <div>
        <Button type="primary" onClick={handleAdd}>
          Thêm mới
        </Button>
      </div>
      <AdminTable onEdit={handleEdit} />
      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        width={1200}
        onCancel={() => setOpen(false)}>
        <AdminProductForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
