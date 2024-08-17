import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

   // Configuration
   cloudinary.config({ 
    cloud_name: 'djsvnuotp', 
    api_key: '743495589789536', 
    api_secret: 'HJDiIp0YvdCSAtfeyqBXo1B5ikk' // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return new Error("Could not find the Path");
    }
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    // File has been uploaded successfully
    console.log("File is uploaded on cloudinary", response);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);// remove the localy save temporary file  cause the upload operation failed 
    return null 
  }
};

export {uploadOnCloudinary}