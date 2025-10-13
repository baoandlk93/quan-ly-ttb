"use client";
import AddRoleForm from "@/components/form/AddRoleForm";
import { IRole } from "@/server/entity";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";

const RolesPage = () => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<IRole[]>([]);
  const [editingRole, setEditingRole] = useState<IRole | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const handleAdd = () => {
    setOpen(true);
  };
  const submitForm = () => {
    setOpen(false);
    fetchRoles();
  };

  const onEdit = (record: IRole) => {
    setOpen(true);
    setEditingRole(record);
  };
  const fetchRoles = async () => {
    const response = await fetch(
      "http://localhost:8080/api/roles?page=0&size=10&name="
    );
    const data = await response.json();
    setDataSource(data.content);
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  const columns: TableColumnsType<IRole> = [
    {
      title: "STT",
      width: 100,
      dataIndex: "index",
      fixed: "left",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Tên vai trò",
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
            }}
          >
            Sửa
          </Button>
          <Button
            className="ml-2"
            type="primary"
            danger
            icon={<FaTrash />}
            onClick={() => {
              setOpenDelete(true);
              setModalText("Bạn có chắc chắn muốn xóa vai trò này?");
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const handleOk = () => {
    setModalText("Đang xóa vai trò");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenDelete(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <h1>Quản lý vai trò</h1>
        <div>
          <Button type="primary" onClick={handleAdd}>
            Thêm mới
          </Button>
        </div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        centered
        width={600}
        onCancel={() => setOpen(false)}
      >
        <AddRoleForm onSuccess={submitForm} editingRole={editingRole} />
      </Modal>
      <Modal
        title="Basic Modal"
        open={openDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default RolesPage;
