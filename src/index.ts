import express from "express";
import cors from "cors";
import companyRoutes from "./routes/companyRoutes";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import instructionRoutes from "./routes/instructionRoutes";

const app = express();
const port = 3000;
const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./helper/Documentation.ts");

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));

app.use("/companies", companyRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/instructions", instructionRoutes);

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
