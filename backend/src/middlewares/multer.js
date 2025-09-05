import multer from "multer";

const storage = multer.memoryStorage(); 
const upload = multer({ storage });
console.log(upload);

export default upload;
