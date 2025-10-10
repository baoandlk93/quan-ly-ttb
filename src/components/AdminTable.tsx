import React from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";
import { Device } from "@/server/entity";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});
const columns: TableColumnsType<Device> = [
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
    title: "Giá tiền",
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
        }}>
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
          onClick={() => console.log("Xóa", record)}>
          Xóa
        </Button>
      </div>
    ),
  },
];

const dataSource = Array.from({ length: 100 }).map<Device>((_, i) => ({
  key: i,
  deviceCode: `Device Code ${i + 1}`,
  name: `Edward King ${i + 1}`,
  age: 32,
  address: `London, Park Lane no. ${i + 1}`,
  model: `Model ${i + 1}`,
  company: `Company ${i + 1}`,
  quantity: 1,
  assetSource: `Source ${i + 1}`,
  yearOfSupply: "2022",
  price: 1000 * i,
  statusOfUse: "Using",
  status: "Good",
  timeIn: "2022-01-01",
  type: "Type 1",
  classification: "A",
  category: "A",
  location: "Location 1",
  department: "Department 1",
  timeCheck: "2022-01-01",
  maintenance: "Maintenance 1",
  image: "Image 1",
}));

const App: React.FC = ({onEdit}: {onEdit: (record: Device) => void}) => {
  const { styles } = useStyle();
  return (
    <Table<Device>
      className={styles.customTable}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: "max-content", y: 55 * 10 }}
    />
  );
};

export default App;
