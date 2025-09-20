import multer from "multer";

const storage = multer.memoryStorage();
console.log(storage);
 
const upload = multer({ storage });
export default upload;
