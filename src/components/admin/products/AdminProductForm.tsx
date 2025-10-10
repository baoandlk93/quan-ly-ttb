"use client";
import { useState, useEffect } from "react";
import { ICategory, Device, IClassification, ILocation } from "@/server/entity";
export default function AdminProductForm({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData: Device | null;
  onSubmit: (data: Device) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [deviceCode, setDeviceCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [assetSource, setAssetSource] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<ICategory | "">("");
  const [classification, setClassification] = useState<IClassification | "">(
    ""
  );
  const [statusOfUse, setStatusOfUse] = useState("");
  const [timeUse, setTimeUse] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState<ILocation | "">("");
  const [yearOfSupply, setYearOfSupply] = useState("");
  const [timeCheck, setTimeCheck] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [stock, setStock] = useState("");
  const [model, setModel] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDeviceCode(initialData.deviceCode || "");
      setQuantity(initialData.quantity.toString() || "");
      setAssetSource(initialData.assetSource || "");
      setPrice(initialData.price.toString() || "");
      setImage(initialData.image || "");
      setCategory(initialData.category || "");
      setStock(initialData.stock.toString() || "");
      setModel(initialData.model || "");
      setCompany(initialData.company || "");
    } else {
      setName("");
      setPrice("");
      setImage("");
      setCategory("");
      setStock("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      deviceCode,
      price: Number(price),
      image,
      category: category as ICategory,
      classification: classification as IClassification,
      location: location as ILocation,
      stock: Number(stock),
      model,
      company,
      quantity: Number(quantity),
      assetSource: assetSource,
      yearOfSupply: yearOfSupply,
      statusOfUse: statusOfUse,
      timeUse: timeUse,
      timeIn: timeIn,
      timeOut: timeOut,
      status: status,
      department: department,
      timeCheck: timeCheck,
      maintenance: maintenance,
    });
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-screen mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialData ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Mã sản phẩm
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={deviceCode}
            onChange={(e) => setDeviceCode(e.target.value)}
            required
            placeholder="Nhập mã sản phẩm..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tên sản phẩm
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nhập tên sản phẩm..."
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
            placeholder="Nhập model sản phẩm..."
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
            placeholder="Nhập hãng sản phẩm..."
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
            placeholder="Nhập số lượng sản phẩm..."
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
            placeholder="Nhập năm cấp sản phẩm..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Giá</label>
          <input
            type="number"
            min="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Nhập giá sản phẩm..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tình trạng sử dụng tài sản
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={statusOfUse}
            onChange={(e) => setStatusOfUse(e.target.value)}
            required
            placeholder="Nhập tình trạng sử dụng..."
          />
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
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tình trạng TTB YT
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={category}
            onChange={(e) => setStatus(e.target.value as IStatus)}
            required>
            <option value="" disabled>
              Chọn loại sản phẩm...
            </option>
            {Object.entries(ICategory).map(([key, value]) => (
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
            Tồn kho
          </label>
          <input
            type="text"
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
            placeholder="Dán đường dẫn ảnh sản phẩm..."
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
          <label className="block text-gray-700 font-medium mb-1">Mô tả</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            value={""}
            onChange={(e) => {}}
            required
            rows={3}
            placeholder="Nhập mô tả sản phẩm..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Loại thiết bị
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value as ICategory)}
            required>
            <option value="" disabled>
              Chọn loại thiết bị...
            </option>
            {Object.entries(ICategory).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
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
