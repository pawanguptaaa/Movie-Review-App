const cloudinary = require('cloudinary').v2;
const axios = require('axios').default;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const timestamp = Math.round(new Date().getTime() / 1000);
const signature = cloudinary.utils.api_sign_request(
  {
    timestamp,
    folder: 'movie_images',
  },
  process.env.CLOUDINARY_API_SECRET,
);

const imageUploader = (image) => {
//   const formData = new FormData();
//   formData.append("file", image);
//   formData.append("api_key", apiKey);
//   formData.append("timestamp", timestamp);
//   formData.append("signature", signature);
//   formData.append("folder", "movie_images");

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  axios
    .post(url, formData)
    .then((result) => console.log('axios result', result));
};

module.exports = imageUploader;
