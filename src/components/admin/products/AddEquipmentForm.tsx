"use client";
import { useState, useEffect } from "react";
import {
  Device,
  IClassification,
  IStatus,
  IStatusOfUse,
  ELocation,
  IDepartment,
  ECategory,
  IWarehouse,
  ICategory,
} from "@/server/entity";
import { fetchDepartments } from "@/server/api";
export default function AddEquipmentForm({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData: Device | null;
  onSubmit: (data: Device) => Promise<void>;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [deviceCode, setDeviceCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [assetSource, setAssetSource] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<ECategory | "">("");
  const [classification, setClassification] = useState<IClassification | "">(
    ""
  );
  const [statusOfUse, setStatusOfUse] = useState<IStatusOfUse | "">("");
  const [status, setStatus] = useState<IStatus | "">("");
  const [timeUse, setTimeUse] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [location, setLocation] = useState<ELocation | "">("");
  const [yearOfSupply, setYearOfSupply] = useState("");
  const [timeCheck, setTimeCheck] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [stock, setStock] = useState("");
  const [model, setModel] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDeviceCode(initialData.deviceCode || "");
      setYearOfSupply(initialData.yearOfSupply || "");
      setStock(initialData.stock.toString() || "");
      setTimeUse(initialData.timeUse || "");
      setTimeIn(initialData.timeIn || "");
      setTimeOut(initialData.timeOut || "");
      setDepartment(initialData.department || "");
      setLocation(initialData.location || "");
      setClassification(initialData.classification || "");
      setCategory(initialData.category || "");
      setQuantity(initialData.quantity.toString() || "");
      setAssetSource(initialData.assetSource || "");
      setPrice(initialData.price.toString() || "");
      setImage(initialData.image || "");
      setStock(initialData.stock.toString() || "");
      setStatus(initialData.status || "");
      setStatusOfUse(initialData.statusOfUse || "");
      setModel(initialData.model || "");
      setCompany(initialData.company || "");
      setNote(initialData.note || "");
    } else {
      setName("");
      setPrice("");
      setImage("");
      setCategory("");
      setStock("");
      setQuantity("");
      setAssetSource("");
      setYearOfSupply("");
      setTimeUse("");
      setTimeIn("");
      setTimeOut("");
      setDepartment("");
      setLocation("");
      setClassification("");
      setCategory("");
      setStock("");
      setStatus("");
      setStatusOfUse("");
      setModel("");
      setCompany("");
      setNote("");
    }
  }, [initialData]);

  useEffect(() => {
    fetchDepartments().then((data) => setDepartments(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      deviceCode,
      price: Number(price),
      image,
      category: category as ECategory,
      classification: classification as IClassification,
      location: location as ELocation,
      stock: Number(stock),
      model,
      company,
      quantity: Number(quantity),
      assetSource: assetSource,
      yearOfSupply: yearOfSupply,
      statusOfUse: statusOfUse as IStatusOfUse,
      status: status as IStatus,
      timeUse: timeUse,
      timeIn: timeIn,
      timeOut: timeOut,
      department: department,
      timeCheck: timeCheck,
      maintenance: maintenance,
      note: note,
    });
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-screen mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialData ? "Cập nhật thiết bị" : "Thêm thiết bị mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-2">
          <div className="w-full">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mã TTB
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={deviceCode}
                onChange={(e) => setDeviceCode(e.target.value)}
                required
                placeholder="Nhập mã TTB..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tên TTB
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nhập tên TTB..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Model, series
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                placeholder="Nhập model TTB..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Hãng,Nước SX
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                placeholder="Nhập hãng sản xuất..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Số lượng
              </label>
              <input
                type="number"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                placeholder="Nhập số lượng TTB..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nguồn tài sản
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={assetSource}
                onChange={(e) => setAssetSource(e.target.value)}
                required
                placeholder="Nhập nguồn tài sản..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Năm cấp
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={yearOfSupply}
                onChange={(e) => setYearOfSupply(e.target.value)}
                required
                placeholder="Nhập năm cấp TTB..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Giá TTB (VNĐ)
              </label>
              <input
                type="number"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Nhập giá TTB..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Vị trí
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={location}
                onChange={(e) => setLocation(e.target.value as ELocation)}
                required>
                <option value="" disabled>
                  Chọn vị trí...
                </option>
                {Object.entries(ELocation).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tình trạng sử dụng tài sản
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={statusOfUse}
                onChange={(e) => setStatusOfUse(e.target.value as IStatusOfUse)}
                required>
                <option value="" disabled>
                  Chọn tình trạng sử dụng...
                </option>
                {Object.entries(IStatusOfUse).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Số năm sử dụng
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={timeUse}
                onChange={(e) => setTimeUse(e.target.value)}
                required
                placeholder="Nhập số năm sử dụng..."
              />
            </div>
          </div>
          <div className="w-full">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tình trạng TTB YT
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={status}
                onChange={(e) => setStatus(e.target.value as IStatus)}
                required>
                <option value="" disabled>
                  Chọn tình trạng TTB YT...
                </option>
                {Object.entries(IStatus).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Thời gian nhập kho
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={timeIn}
                onChange={(e) => setTimeIn(e.target.value)}
                required
                placeholder="Nhập thời gian nhập kho..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Thời gian xuất kho
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={timeOut}
                onChange={(e) => setTimeOut(e.target.value)}
                required
                placeholder="Nhập thời gian xuất kho..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Thời gian kiểm định
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={timeCheck}
                onChange={(e) => setTimeCheck(e.target.value)}
                required
                placeholder="Nhập thời gian kiểm định..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tồn kho
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                placeholder="Nhập tồn kho..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Hình ảnh (URL)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                placeholder="Dán đường dẫn ảnh thiết bị..."
              />
              {image && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={image}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="h-24 w-24 object-cover rounded-lg border shadow"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Loại thiết bị
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={category}
                onChange={(e) => setCategory(e.target.value as ECategory)}
                required>
                <option value="" disabled>
                  Chọn loại thiết bị...
                </option>
                {Object.entries(ECategory).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phân loại TTB ( A, B, C,D)
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={classification}
                onChange={(e) =>
                  setClassification(e.target.value as IClassification)
                }
                required>
                <option value="" disabled>
                  Chọn phân loại TTB...
                </option>
                {Object.entries(IClassification).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Khoa/phòng
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required>
                <option value="" disabled>
                  Chọn khoa/phòng...
                </option>
                {departments?.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Số lượng
              </label>
              <input
                type="number"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                placeholder="Nhập số lượng trong kho..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ghi chú
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                rows={3}
                placeholder="Nhập ghi chú..."
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition">
            Huỷ
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition">
            {initialData ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
}
