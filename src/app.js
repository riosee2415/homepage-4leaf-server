import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes";
import SC0401Router from "./router/SC04/SC0401Router";

const PORT = 5000;
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* SC04 */
app.post(routes.sendEmail, SC0401Router);

app.listen(PORT, () => {
  console.log(`✅ REST API NODE SERVER START :: PORT NUMBER ${PORT}`);
});
