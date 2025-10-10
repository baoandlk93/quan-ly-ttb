export enum IRole {
    ADMIN = "ADMIN",
    USER = "USER",
    MANAGER = "MANAGER"
}
export enum IStatus {
    USING = "Using",
    NOT_USING = "Not Using",
}
export enum ICategory {
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
export enum ILocation {
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
    statusOfUse: string;
    status: IStatus;
    timeIn: string;
    timeOut: string;
    timeUse: string;
    stock: number;
    classification: IClassification;
    category: ICategory;
    location: ILocation;
    department: string;
    timeCheck: string;
    maintenance: string;
    image: string;
}
