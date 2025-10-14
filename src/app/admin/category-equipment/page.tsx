"use client";
import { ICategory, IRole } from "@/server/entity";
import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { addCategory, fetchCategories } from "@/server/api";

export default function CategoryEquipment() {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<ICategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const handleAdd = () => {
    setOpen(true);
  };
  const submitForm = (data: IRole) => {
    setOpen(false);
    console.log(data);
  };

  const onEdit = (record: ICategory) => {
    setOpen(true);
    setEditingCategory(record);
  };
  const fetchData = () => {
    fetchCategories().then((data) => setDataSource(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns: TableColumnsType<ICategory> = [
    {
      title: "Tên nhóm thiết bị",
      width: 100,
      dataIndex: "name",
      fixed: "left",
      key: "name",
    },
    {
      title: "Mô tả",
      width: 100,
      dataIndex: "description",
      fixed: "left",
      key: "description",
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
            type="primary"
            danger
            icon={<FaTrash />}
            onClick={() => {
              setOpenDelete(true);
              setModalText("Bạn có chắc chắn muốn xóa kho này?");
            }}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const handleOk = () => {
    setModalText("Đang xóa nhóm thiết bị");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenDelete(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleFinish = async (value: ICategory) => {
    try {
      const method = editingCategory ? "PUT" : "POST";
      const response = addCategory(method, value);
      // Xử lý lỗi phía server trả về
      if (!response) {
        throw new Error("Có lỗi xảy ra trên server!");
      }
      toast.success(
        editingCategory
          ? "Cập nhật kho thành công!"
          : "Thêm kho mới thành công!"
      );
      form.resetFields();
      setOpen(false);
      fetchData();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Lỗi khi thêm/cập nhật kho!");
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <h1>Quản lý nhóm thiết bị</h1>
        <div>
          <Button type="primary" onClick={handleAdd}>
            Thêm mới
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: "max-content", y: 55 * 5 }}
        />
      </div>
      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        centered
        width={600}
        onCancel={() => setOpen(false)}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          style={{ maxWidth: 400, margin: "0 auto" }}>
          <Form.Item label="Mã" hidden name="id">
            <Input hidden />
          </Form.Item>
          <Form.Item
            label="Tên nhóm thiết bị"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên kho!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Nhập mô tả" }]}>
            <Input placeholder="Ví dụ: Nhóm thiết bị y tế" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu kho
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Basic Modal"
        open={openDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
