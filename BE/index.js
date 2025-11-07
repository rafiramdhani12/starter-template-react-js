// index.js
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
