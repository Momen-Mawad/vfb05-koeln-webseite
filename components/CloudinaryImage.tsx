// components/CloudinaryImage.tsx
import Image, { ImageProps } from "next/image";

interface CloudinaryImageProps extends Omit<ImageProps, "src"> {
  src: string; // We expect the simplified path here
}

const CloudinaryImage = ({ src, alt, ...props }: CloudinaryImageProps) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    console.error("Cloudinary cloud name is not configured");
    return null;
  }

  // Construct the full Cloudinary URL
  // Base URL format: https://res.cloudinary.com/<cloud_name>/image/upload/<public_id>.<format>
  // We assume your simplified src is the 'public_id' including folders if any.
  // Example: src="/bugs/main-image.jpg" becomes public_id "bugs/main-image.jpg"
  const publicId = src.startsWith("/") ? src.substring(1) : src;
  const cloudinarySrc = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;

  return <Image src={cloudinarySrc} alt={alt} {...props} />;
};

export default CloudinaryImage;
