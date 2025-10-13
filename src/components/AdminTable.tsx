import React from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  Device,
  IStatusOfUse,
  IStatus,
  ICategory,
  ELocation,
  IDepartment,
  IClassification,
} from "@/server/entity";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";

const dataSource = Array.from({ length: 100 }).map<Device>((_, i) => ({
  deviceCode: `Device Code ${i + 1}`,
  name: `Edward King ${i + 1}`,
  model: `Model ${i + 1}`,
  company: `Company ${i + 1}`,
  quantity: 1,
  assetSource: `Source ${i + 1}`,
  yearOfSupply: "2022",
  price: 1000 * i,
  statusOfUse: IStatusOfUse.USING,
  status: IStatus.NEW,
  timeIn: "2022-01-01",
  timeOut: "2022-12-31",
  timeUse: "1 năm",
  stock: 10,
  classification: IClassification.A,
  category: ICategory.CDHA,
  location: ELocation.HSCC,
  department: "",
  timeCheck: "2022-01-01",
  maintenance: "Maintenance 1",
  image: "Image 1",
  note: "Note 1",
}));

const App: React.FC<{ onEdit: (record: Device) => void }> = ({ onEdit }) => {
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
      dataIndex: "company",
      key: "company",
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
    },
    {
      title: "Thời gian nhập kho",
      width: 150,
      dataIndex: "timeIn",
      key: "timeIn",
    },
    {
      title: "Thời gian xuất kho",
      width: 150,
      dataIndex: "timeOut",
      key: "timeOut",
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
      render: (text, record) => (
        <span
          style={{
            backgroundColor:
              record.classification === "A"
                ? "#FFCDD2"
                : record.classification === "B"
                ? "#FFEB3B"
                : record.classification === "C"
                ? "#C8E6C9"
                : "#FFCDD2",
            color: "#000",
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          {record.classification}
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
              onEdit(record);
            }}
          >
            Sửa
          </Button>
          <Button
            className="ml-2"
            icon={<FaShuffle />}
            onClick={() => console.log("Chuyển Kho", record)}
          >
            Chuyển Kho
          </Button>
          <Button
            className="ml-2"
            type="primary"
            danger
            icon={<FaTrash />}
            onClick={() => console.log("Xóa", record)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  return (
    <Table<Device>
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: "max-content", y: 55 * 10 }}
    />
  );
};

export default App;
