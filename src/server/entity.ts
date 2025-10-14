export enum ERole {
  ADMIN = "ADMIN",
  USER = "USER",
  MANAGER = "MANAGER",
}
export interface IRole {
  id?: number;
  name?: string;
  description?: string;
}
export interface IUser {
  id?: number;
  fullName?: string;
  username?: string;
  password?: string;
  role: ERole;
  email?: string;
  phoneNumber?: string;
  address?: string;
}
export interface IWarehouse {
  id?: number;
  name?: string;
  description?: string;
}
export enum IStatus {
  NEW = "Mới chưa  cấp",
  OLD = "Cũ còn SD tốt ",
  DAMAGED = "Hỏng, chờ thanh lý  ",
  SOLD = "Xuất  kho",
}
export enum IStatusOfUse {
  USING = "Sử dụng",
  NOT_USING = "Không sử dụng",
}
export interface ICategory {
  id?: number;
  name?: string;
}
export enum ECategory {
  CDHA = "Thiết bị chẩn đoán hình ảnh",
  HSCC = "Thiết bị hồi sức - cấp cứu",
  XN = "Thiết bị xét nghiệm",
  PTTT = "Thiết bị phẫu thuật - thủ thuật",
  DT = "Thiết bị điều trị",
  TKKT = "Thiết bị tiệt khuẩn - khử trùng",
  VCHT = "Thiết bị vận chuyển, hỗ trợ",
  VPHC = "Thiết bị văn phòng - hành chính",
  VSMT = "Thiết bị vệ sinh - môi trường",
  PHCN = "Thiết bị hỗ trợ - phục hồi chức năng",
}
export enum ELocation {
  HSCC = "KHU HỒI SỨC CẤP CỨU",
  PNS = "PHÒNG NỘI SOI",
  COPD = "PHÒNG KHÁM, COPD",
  NH = " NHÀ HẤP",
  XQUANG = "PHÒNG XQUANG",
  PSA = "PHÒNG SIÊU ÂM ",
  KLNP = "KHO LAO NGOÀI PHỔI",
  KNA = "KHO NHÀ ĂN ",
  CTHC = "Cầu thang  Hành chính ",
  XLNT = "Nhà xử lý nươc thải",
  KMT = "Nhà kho mái tôn cổng 2",
  GAXE = "GARA XE",
}
export interface IDepartment {
  id?: number;
  name?: string;
  description?: string;
}

export enum IClassification {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}
export interface Device {
  deviceCode: string;
  name: string;
  model: string;
  company: string;
  quantity: number;
  assetSource: string;
  yearOfSupply: string;
  price: number;
  statusOfUse: IStatusOfUse;
  status: IStatus;
  timeIn: string;
  timeOut: string;
  timeUse: string;
  stock: number;
  classification: IClassification;
  category: ECategory;
  location: ELocation;
  department: string;
  timeCheck: string;
  maintenance: string;
  image: string;
  note: string;
}
