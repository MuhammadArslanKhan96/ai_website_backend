import express from "express";
import cors from "cors";
import companyRoutes from "./routes/companyRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 5000;
const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./helper/Documentation.ts");

app.use(cors());
app.use(express.json());
app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));

app.use("/companies", companyRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});