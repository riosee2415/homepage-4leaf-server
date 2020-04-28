import express from "express";
import routes from "../../routes";
import SC0401Controller from "../../controller/SC04/SC0401Controller";

const SC0401Router = express.Router();

SC0401Router.post(routes.sendEmail, SC0401Controller.sendEmail);
SC0401Router.post(routes.sendEmailEstimate, SC0401Controller.sendEmailEstimate);

export default SC0401Router;
