import { Device, IStatus, IStatusOfUse } from "@/server/entity";

export const getStatusName = (
  status: IStatus
): { label: string; color: string } => {
  switch (status) {
    case IStatus.NEW:
      return { label: "Mới chưa cấp", color: "#87d068" }; // Màu xanh lá
    case IStatus.OLD:
      return { label: "Cũ còn SD tốt", color: "#faad14" }; // Màu vàng
    case IStatus.DAMAGED:
      return { label: "Hỏng, chờ thanh lý", color: "#f50" }; // Màu đỏ
    case IStatus.SOLD:
      return { label: "Xuất kho", color: "#1890ff" }; // Màu xanh dương
    default:
      return { label: "Không xác định", color: "#d9d9d9" }; // Màu xám
  }
};
export const getStatus = (status: IStatusOfUse) => {
  switch (status) {
    case IStatusOfUse.USING:
      return { label: "Sử dụng", color: "#87d068" };
    case IStatusOfUse.UNSED:
      return { label: "Chưa sử dụng", color: "#faad14" };
    case IStatusOfUse.MAINTENANCE:
      return { label: "Bảo trì", color: "#f50" }; // Màu vàng
    default:
      return { label: "Không xác định", color: "#d9d9d9" };
  }
};
const mapStatusOfUse = (status: string): IStatusOfUse => {
  switch (status) {
    case "USING":
      return IStatusOfUse.USING;
    case "UNSED":
      return IStatusOfUse.UNSED;
    default:
      throw new Error(`Unknown statusOfUse: ${status}`);
  }
};

const mapStatus = (status: string): IStatus => {
  switch (status) {
    case "NEW":
      return IStatus.NEW;
    case "OLD":
      return IStatus.OLD;
    case "DAMAGED":
      return IStatus.DAMAGED;
    case "SOLD":
      return IStatus.SOLD;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};
export const transformApiDataToDevice = (apiData: any[]): Device[] => {
  return apiData.map((item) => ({
    id:item.id,
    deviceCode: item.deviceCode,
    name: item.name,
    model: item.model,
    company: item.company,
    quantity: item.quantity,
    assetSource: item.assetSource,
    yearOfSupply: item.yearOfSupply,
    price: item.price,
    statusOfUse: mapStatusOfUse(item.statusOfUse), // Chuyển đổi thành enum
    status: mapStatus(item.status), // Chuyển đổi thành enum
    timeIn: item.timeIn,
    timeOut: item.timeOut,
    timeUse: item.timeUse,
    stock: item.stock,
    classification: item.classification, // Giả sử đã có ánh xạ cho classification
    category: item.category, // Giả sử đã có ánh xạ cho category
    location: item.location, // Giả sử đã có ánh xạ cho location
    department: item.department,
    timeCheck: item.timeCheck,
    maintenance: item.maintenance,
    image: item.image,
    note: item.note,
  }));
};
