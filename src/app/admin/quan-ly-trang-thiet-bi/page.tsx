"use client";
import { Button, Modal } from "antd";
import AddEquipmentForm from "@/components/admin/products/AddEquipmentForm";
import { useEffect, useState } from "react";
import { Device } from "@/server/entity";
import { fetchEquipment } from "@/server/api";
import EquipmentTable from "@/components/EquipmentTable";
export default function QuanLyTrangThietBiPage() {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Device | null>(null);
  const [dataSource, setDataSource] = useState<Device[] | []>([]);
  const fetchData = () => {
    fetchEquipment().then((res) => setDataSource(res));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const onSubmit = (value: Device) => {
    console.log(value);
  };
  const handleAdd = () => {
    setOpen(true);
    setInitialData(null);
  };
  const handleEdit = (record: Device) => {
    setOpen(true);
    setInitialData(record);
  };
  const handleSubmit = async (value: Device) => {
    try {
      onSubmit(value);
      setOpen(false);
      setInitialData(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Quản lý trang thiết bị</h1>
      <div>
        <Button type="primary" onClick={handleAdd}>
          Thêm mới
        </Button>
      </div>
      <EquipmentTable onEdit={handleEdit} />
      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        centered
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        onCancel={() => setOpen(false)}>
        <AddEquipmentForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
