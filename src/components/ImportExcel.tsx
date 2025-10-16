import { Device, IStatus, IStatusOfUse } from "@/server/entity";
import React from "react";
import * as XLSX from "xlsx";
const mapStatus = (status: string): IStatus => {
  switch (status) {
    case "Mới chưa  cấp":
      return IStatus.NEW;
    case "Cũ còn SD tốt":
      return IStatus.OLD;
    case "Hỏng, chờ thanh lý":
      return IStatus.DAMAGED;
    default:
      return IStatus.SOLD;
  }
};
const mapStatusOfUse = (status: string): IStatusOfUse => {
  switch (status) {
    case "Sử dụng":
      return IStatusOfUse.UNSED;
    default:
      return IStatusOfUse.UNSED; // Hoặc một trạng thái khác phù hợp
  }
};
const convertExcelDateToJSDate = (excelDate: number): Date => {
  // Excel lưu trữ ngày dưới dạng số nguyên, bắt đầu từ 30/12/1899
  const excelEpoch = new Date(1899, 11, 30); // Tháng 11 là tháng 12 trong JS
  return new Date(excelEpoch.getTime() + excelDate * 24 * 60 * 60 * 1000); // Chuyển đổi sang milliseconds
};

const ImportExcel: React.FC = () => {
  const mapDeviceFromExcel = (excelData: any): Device => {
    return {
      deviceCode: excelData["Mã thiết bị"],
      name: excelData["Tên tài sản"],
      model: excelData["Model, series"],
      company: excelData["Hãng, Nước SX"],
      quantity: Number(excelData["Số lượng "]), // Chuyển đổi sang số
      assetSource: excelData["Nguồn TS"],
      yearOfSupply: Number(excelData["Năm cấp "]), // Chuyển đổi sang số
      price: excelData["Giá tiền (1000đ)"], // Chuyển đổi sang số và nhân với 1000
      statusOfUse: mapStatusOfUse(excelData["Tình trạng sử dụng tài sản"]),
      status: mapStatus(excelData["Tình trạng TTB YT"]),
      timeIn: excelData["Thời gian nhập kho "],
      timeOut: excelData["Thời gian xuất kho"],
      timeUse: Number(excelData["Số năm sử dụng"]), // Chuyển đổi sang số
      stock: Number(excelData["Tồn kho"]),
      classification: excelData["Phân loại TTB ( A, B, C, D)"],
      category: excelData["Nhóm thiết bị"],
      location: excelData["Vị trí"],
      department: excelData["Khoa/Phòng"],
      timeCheck: convertExcelDateToJSDate(
        excelData["Thời gian kiểm định"]
      ).toString(), // Có thể cần chuyển đổi định dạng
      maintenance: Number(excelData["Bảo dưỡng sửa chữa"]),
      image: excelData["Hình ảnh"],
      note: excelData["Ghi chú"],
    };
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log(jsonData); // Kiểm tra dữ liệu đã được chuyển đổi
      // Chuyển đổi từng đối tượng trong jsonData thành Device
      const devices: Device[] = jsonData.map((data) =>
        mapDeviceFromExcel(data)
      );
      console.log(devices); // Kiểm tra dữ liệu đã được chuyển đổi
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  );
};

export default ImportExcel;
