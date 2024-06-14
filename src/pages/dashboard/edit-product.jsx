import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import ImageUpload from "../../components/dashboard/ui/ImageInput";
import { Input } from "../../components/dashboard/ui/Input";

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [imageFile, setImageFile] = useState();

  const onSubmit = async ({ name, description, mrp, sellingPrice }) => {
    if (!imageFile) {
      toast.warning("Please upload image!");
    } else {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('mrp', mrp);
      formData.append('sellingPrice', sellingPrice);
      formData.append('image', imageFile);

      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}product/`, formData);
        reset();
        toast.success("Product created Successfully!");
      } catch (error) {
        console.error('Error creating product:', error);
        toast.error("Error creating product. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-290px)] flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-x-10">
          <div className="flex flex-col gap-y-4">
            <Input
              name="name"
              label="Product Name"
              placeholder="Enter Product Name"
              register={register}
              errors={errors}
            />
            <Input
              name="description"
              label="Product Description"
              placeholder="Enter Description"
              inputType="area"
              register={register}
              errors={errors}
            />
            <Input
              name="mrp"
              label="MRP Price"
              placeholder="Enter MRP"
              type="number"
              register={register}
              errors={errors}
            />
            <Input
              name="sellingPrice"
              label="Selling Price"
              placeholder="Enter Selling Price"
              type="number"
              register={register}
              errors={errors}
            />
          </div>
          <div className="flex mt-[16px] md:mt-0">
            <ImageUpload setImageFile={setImageFile} />
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          className="mt-[20px] px-4 py-2.5 rounded-[10px] bg-black text-white font-medium font-poppins"
        />
      </form>
    </div>
  );
};

export default EditProduct;
