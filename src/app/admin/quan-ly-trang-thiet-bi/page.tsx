"use client";
import { Button, Modal, Table, TableColumnsType } from "antd";
import AddEquipmentForm from "@/components/admin/products/AddEquipmentForm";
import { useEffect, useState } from "react";
import { Device, IStatus, IStatusOfUse } from "@/server/entity";
import { addEquipment, fetchEquipment } from "@/server/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  getStatus,
  getStatusName,
  transformApiDataToDevice,
} from "@/ultilities/common";
import ImportExcel from "@/components/ImportExcel";
import {removeEquipment} from '@/server/api'
export default function QuanLyTrangThietBiPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Device | null>(null);
  const [dataSource, setDataSource] = useState<Device[] | []>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [idDelete, setIdDelete] = useState(0);
  const fetchData = async () => {
    setLoading(true);
    await fetchEquipment().then((response) => {
      const devices: Device[] = transformApiDataToDevice(response);
      setDataSource(devices);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = (data:Device)=>{
    console.log(data , "Delete dâta");
    
    setOpenDelete(true);
    setIdDelete(data.id)
    setModalText("Bạn có chắc chắn muốn xóa TTB này?");
  }
  const handleOk = () => {
    setModalText("Đang xóa TTB");
    setConfirmLoading(true);
    removeEquipment(idDelete).then(res=>{
      setOpenDelete(false);
      setConfirmLoading(false);
      toast.success("Dữ liệu đã được xóa!");
      fetchData();
    }).catch(e=>{
      toast.error(e)
    })
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };
  const handleAdd = () => {
    setOpen(true);
    setEditingEquipment(null);
  };
  const handleEdit = (record: Device) => {
    setOpen(true);
    setEditingEquipment(record);
  };
  const handleSubmit = async (value: Device) => {
    try {
      const method = editingEquipment ? "PUT" : "POST";
      const response = addEquipment(method, value);
      if (!response) {
        throw new Error("Có lỗi xảy ra trên server!");
      }
      toast.success(
        editingEquipment
          ? "Cập nhật TTB thành công!"
          : "Thêm TTB mới thành công!"
      );
      setOpen(false);
      fetchData();
      setOpen(false);
      setEditingEquipment(null);
    } catch (e) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const columns: TableColumnsType<Device> = [
    
    {
      title: "STT",
      width: 100,
      dataIndex: "index",
      fixed: "left",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Mã TTB",
      width: 100,
      dataIndex: "deviceCode",
      fixed: "left",
      key: "deviceCode",
    },
    {
      title: "Tên tài sản",
      width: 100,
      dataIndex: "name",
      fixed: "left",
      key: "name",
    },
    {
      title: "Model, series",
      width: 100,
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Hãng,Nước SX",
      width: 100,
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "Số lượng",
      width: 100,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Nguồn Tài sản",
      width: 100,
      dataIndex: "assetSource",
      key: "assetSource",
    },
    {
      title: "Năm cấp",
      width: 100,
      dataIndex: "yearOfSupply",
      key: "yearOfSupply",
    },
    {
      title: "Giá tiền (VNĐ)",
      width: 100,
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tình trạng sử dụng tài sản",
      width: 100,
      dataIndex: "statusOfUse",
      key: "statusOfUse",
      render: (status: IStatusOfUse) => {
        const { label, color } = getStatus(status);
        return (
          <span
            style={{
              display: "inline-block",
              padding: "2px 4px", // Khoảng cách bên trong
              borderRadius: "4px",
              backgroundColor: color,
              color: "white", // Màu chữ
              fontWeight: "bold", // Làm cho chữ đậm
              textAlign: "center",
              cursor: "default", // Không cho phép nhấp chuột
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Đổ bóng
            }}>
            {label}
          </span>
        );
      },
    },
    {
      title: "Số năm sử dụng",
      width: 150,
      dataIndex: "timeUse",
      key: "timeUse",
    },
    {
      title: "Tình trạng TTB YT",
      width: 100,
      dataIndex: "status",
      key: "status",
      render: (status: IStatus) => {
        const { label, color } = getStatusName(status);
        return (
          <span
            style={{
              display: "inline-block",
              padding: "2px 4px",
              borderRadius: "4px",
              backgroundColor: color,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              cursor: "default",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}>
            {label}
          </span>
        );
      },
    },
    {
      title: "Thời gian nhập kho",
      width: 150,
      dataIndex: "timeIn",
      key: "timeIn",
      render: (record) => <span>{format(new Date(record), "dd/MM/yyyy")}</span>,
    },
    {
      title: "Thời gian xuất kho",
      width: 150,
      dataIndex: "timeOut",
      key: "timeOut",
      render: (record) => <span>{format(new Date(record), "dd/MM/yyyy")}</span>,
    },
    {
      title: "Tồn kho",
      width: 100,
      dataIndex: "stock",
      key: "stock",
    },

    {
      title: "Phân loại TTB",
      width: 100,
      render: (record) => (
        <span
          style={{
            backgroundColor:
              record === "A"
                ? "#FFCDD2"
                : record === "B"
                ? "#FFEB3B"
                : record === "C"
                ? "#C8E6C9"
                : "#FFCDD2",
            color: "#000",
            padding: "2px 8px",
            borderRadius: "4px",
          }}>
          {record}
        </span>
      ),
      dataIndex: "classification",
      key: "classification",
    },
    {
      title: "Nhóm trang thiết bị",
      width: 100,
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Vị trí",
      width: 100,
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Khoa/Phòng",
      width: 100,
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Thời gian kiểm định",
      width: 150,
      dataIndex: "timeCheck",
      key: "timeCheck",
      render: (text, record) => (
        <span>{format(new Date(record.timeCheck), "dd/MM/yyyy")}</span>
      ),
    },
    {
      title: "Bảo dưỡng sửa chữa",
      width: 100,
      dataIndex: "maintenance",
      key: "maintenance",
    },
    {
      title: "Hình ảnh thiết bị",
      width: 100,
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Ghi chú",
      width: 100,
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record, index) => (
        <div className="flex gap-2">
          <Button
            className="mr-2"
            type="primary"
            icon={<FaEdit />}
            onClick={() => {
              handleEdit(record);
            }}>
            Sửa
          </Button>
          <Button
            className="ml-2"
            icon={<FaShuffle />}
            onClick={() => console.log("Chuyển Kho", record)}>
            Chuyển Kho
          </Button>
          <Button
            className="ml-2"
            type="primary"
            danger
            icon={<FaTrash />}
            onClick={() => {
             handleDelete(record)
            }}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Quản lý trang thiết bị</h1>
      <div className="flex gap-2">
        <Button type="primary" onClick={handleAdd}>
          Thêm mới
        </Button>
        <Button loading={loading} type="primary" onClick={fetchData}>
          Làm mới dữ liệu
        </Button>
        <ImportExcel />
      </div>
      <Table<Device>
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content", y: 55 * 10 }}
      />
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
          initialData={editingEquipment}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
      <Modal
        title="Basic Modal"
        open={openDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}
