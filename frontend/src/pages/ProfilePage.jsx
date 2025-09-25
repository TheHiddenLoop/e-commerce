import React, { useState } from "react";
import { Camera, User2, Mail, Calendar, Phone, MapPin, Edit3, Save, X, Check, CheckCircle, XCircle } from "lucide-react";
import InputField from "../components/UI/InputField";
import { InfoDisplay } from "../components/InfoDisplay";
import { useSelector, useDispatch } from "react-redux"
import { selectAuth, selectAuthStatus } from "../features/authentication/authSelectors";
import { updateProfileAuth } from "../features/authentication/authSlice";

export default function ProfilePage() {
  const [selectedImg, setSelectedImg] = useState("");
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const user = useSelector(selectAuth);
  const dispatch = useDispatch();

  const isUpdating=useSelector(selectAuthStatus)

  const [formData, setFormData] = useState({
    name: user.name || null,
    email: user.email,
    phone: user.phone || null,
    dob: user.dob || null,
    address: user?.address?.address,
    city: user?.address?.city,
    state: user?.address?.state,
    postalCode: user?.address?.postalCode,
    country: user?.address?.country,
  });

  const [tempData, setTempData] = useState({ ...formData });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(file);

    const reader = new FileReader();
    reader.onloadend = () => setSelectedImg(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateProfileAuth(formData));
  };


  const handleChange = (e) => {
    setTempData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveBasic = () => {
    setFormData(prev => ({
      ...prev,
      name: tempData.name,
      email: tempData.email,
      phone: tempData.phone,
      dob: tempData.dob
    }));
    dispatch(updateProfileAuth(tempData));
    setIsEditingBasic(false);
  };

  const handleSaveAddress = () => {
    setFormData(prev => ({
      ...prev,
      address: tempData.address,
      city: tempData.city,
      state: tempData.state,
      postalCode: tempData.postalCode,
      country: tempData.country
    }));
    dispatch(updateProfileAuth(tempData));

    setIsEditingAddress(false);
  };

  const handleCancelBasic = () => {
    setTempData(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob
    }));
    setIsEditingBasic(false);
  };

  const handleCancelAddress = () => {
    setTempData(prev => ({
      ...prev,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country
    }));
    setIsEditingAddress(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_20%_70%,rgba(124,58,237,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_30%,rgba(217,70,239,0.1)_0%,transparent_50%)] px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-textPrimary mb-3">
            Profile Settings
          </h1>
          <p className="text-textSecondary text-lg">Manage your personal information and preferences</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-1">
            <div className=" p-8 rounded-2xl shadow-skin border border-border hover:shadow-lg transition-skin duration-500">
              <h3 className="text-xl font-bold mb-6 text-textPrimary text-center">Profile Picture</h3>

              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-2xl border-3 border-primary overflow-hidden bg-bgPrimary shadow-skin">
                    <img
                      src={selectedImg || user.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {isUpdating ==="loading" && (
                      <div className="absolute inset-0 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent p-3 rounded-xl cursor-pointer transition-skin duration-300 hover:scale-110 hover:rotate-12 shadow-skin group ${isUpdating==="loading" ? "pointer-events-none opacity-50" : ""
                      }`}
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdating ==="loading"}
                    />
                  </label>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-textSecondary mb-2">Click the camera icon to update</p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-3 space-y-8">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl shadow-skin border border-border backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col space-y-1">
                  <h3 className="text-2xl font-bold text-textPrimary">Basic Information</h3>
                  <p className="text-textSecondary text-sm">Your personal details</p>
                </div>


                <div className="flex space-x-3">
                  {!isEditingBasic ? (
                    <button
                      onClick={() => setIsEditingBasic(true)}
                      className="flex items-center justify-center w-10 h-10 bg-primary hover:bg-secondary rounded-lg transition-skin duration-300 text-white shadow-skin hover:shadow-md"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSaveBasic}
                        className="flex items-center justify-center w-10 h-10 bg-primary hover:bg-secondary rounded-lg transition-skin duration-300 text-white shadow-skin hover:shadow-md"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>

                      <button
                        onClick={handleCancelBasic}
                        className="flex items-center justify-center w-10 h-10 bg-error hover:bg-error/90 rounded-lg transition-skin duration-300 text-white shadow-skin hover:shadow-md"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {!isEditingBasic ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoDisplay icon={User2} label="Full Name" value={formData.name} />
                  <InfoDisplay icon={Mail} label="Email Address" value={formData.email} />
                  <InfoDisplay icon={Phone} label="Phone Number" value={formData.phone ? formData.phone:"Not provided"} />
                  <InfoDisplay icon={Calendar} label="Date of Birth" value={formatDate(formData.dob) || "00/00/00"} />
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-top duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputField
                      name="name"
                      value={tempData.name}
                      onChange={handleChange}
                      icon={User2}
                      placeholder="Full Name"
                    />
                    <InputField
                      type="email"
                      name="email"
                      value={tempData.email}
                      onChange={handleChange}
                      icon={Mail}
                      active={true}
                      placeholder="Email Address"

                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputField
                      type="tel"
                      name="phone"
                      value={tempData.phone}
                      onChange={handleChange}
                      icon={Phone}
                      placeholder="Phone Number"
                    />
                    <InputField
                      type="date"
                      name="dob"
                      value={tempData.dob}
                      onChange={handleChange}
                      icon={Calendar}
                      placeholder="Date of Birth"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Address Section */}
            <div className="p-8 rounded-2xl shadow-skin border border-border backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-2xl font-bold text-textPrimary">Address Information</h3>
                    <p className="text-textSecondary text-sm">Your location details</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {!isEditingAddress ? (
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="flex items-center justify-center w-10 h-10 bg-primary hover:bg-secondary rounded-lg transition-skin duration-300 text-white shadow-skin hover:shadow-md"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSaveAddress}
                        className="flex items-center justify-center w-10 h-10 bg-primary hover:bg-secondary rounded-lg transition-skin duration-300 text-white shadow-skin hover:shadow-md"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancelAddress}
                        className="flex items-center justify-center w-10 h-10 bg-error hover:bg-error/90 rounded-lg transition-skin duration-300 text-white shadow-skin hover:shadow-md"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {!isEditingAddress ? (
                <div className="space-y-6">
                  <InfoDisplay icon={MapPin} label="Street Address" value={formData.address} className="col-span-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoDisplay icon={MapPin} label="City" value={formData.city} />
                    <InfoDisplay icon={MapPin} label="State" value={formData.state} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoDisplay icon={MapPin} label="Postal Code" value={formData.postalCode} />
                    <InfoDisplay icon={MapPin} label="Country" value={formData.country} />
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-top duration-500">
                  <InputField
                    name="address"
                    value={tempData.address}
                    onChange={handleChange}
                    icon={MapPin}
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputField
                      name="city"
                      value={tempData.city}
                      onChange={handleChange}
                      icon={MapPin}
                      placeholder="City"
                    />
                    <InputField
                      name="state"
                      value={tempData.state}
                      onChange={handleChange}
                      icon={MapPin}
                      placeholder="State"
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputField
                      name="postalCode"
                      value={tempData.postalCode}
                      onChange={handleChange}
                      icon={MapPin}
                      placeholder="Postal Code"
                    />
                    <InputField
                      name="country"
                      value={tempData.country}
                      onChange={handleChange}
                      icon={MapPin}
                      placeholder="Country"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}