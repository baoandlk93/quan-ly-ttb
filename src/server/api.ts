import axios from "axios";
import { Device, ICategory, IDepartment, IRole, IWarehouse } from "./entity";

export const fetchCategories = async () => {
  const response = await axios({
    url: "http://localhost:8080/api/categories",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    params: {
      number: 0,
      size: 20,
      name: "",
    },
  });
  return response.data.content;
};
export const addCategory = async (method: string, value: ICategory) => {
  const response = await axios({
    url: `http://localhost:8080/api/categories`,
    method: method,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(value),
  })
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return response;
};
export const fetchDepartments = async () => {
  const response = await axios({
    url: "http://localhost:8080/api/departments",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    params: {
      page: 0,
      size: 20,
      name: "",
    },
  }).then((res) => res.data.content);
  return response;
};
export const addDepartments = async (method: string, value: IDepartment) => {
  const response = await axios({
    url: `http://localhost:8080/api/departments`,
    method: method,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(value),
  })
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return response;
};
export const fetchRoles = async () => {
  const response = await axios({
    url: "http://localhost:8080/api/roles",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    params: {
      page: 0,
      size: 20,
      name: "",
    },
  }).then((res) => res.data.content);
  return response;
};
export const addRoles = async (method: string, value: IRole) => {
  const response = await axios({
    url: `http://localhost:8080/api/roles`,
    method: method,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(value),
  }).then((res) => res.data);
  return response;
};
export const fetchWarehouse = async () => {
  const response = await axios({
    url: "http://localhost:8080/api/warehouses",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    params: {
      page: 0,
      size: 20,
      name: "",
    },
  }).then((res) => res.data.content);
  return response;
};
export const addWarehouse = async (method: string, value: IWarehouse) => {
  const response = await axios({
    url: `http://localhost:8080/api/warehouses`,
    method: method,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(value),
  }).then((res) => res.data);
  return response;
};
export const fetchEquipment = async () => {
  const response = await axios({
    url: "http://localhost:8080/api/equipments",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    params: {
      page: 0,
      size: 20,
      name: "",
    },
  }).then((res) => res.data.content);
  return response;
};
export const addEquipment = async (method: string, value: Device) => {
  const response = await axios({
    url: `http://localhost:8080/api/equipments`,
    method: method,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(value),
  }).then((res) => res.data);
  return response;
};
