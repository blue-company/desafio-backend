import { Request, Response, Router } from "express";
import { ConsultModel } from "../Models/consult";
import { ConsultController } from "../Controller/consult";
import { verifyToken } from "../middleware/auth";


const consultRouter = Router();
const consultModel = new ConsultModel();
const consultController = new ConsultController(consultModel);

consultRouter.post('/', verifyToken, (req: Request, res: Response) => consultController.createConsult(req, res))
consultRouter.get('/', verifyToken, (req: Request, res: Response) => consultController.findConsult(req, res))
consultRouter.patch('/', verifyToken, (req: Request, res: Response) => consultController.updateConsult(req, res))
consultRouter.delete('/', verifyToken, (req: Request, res: Response) => consultController.deleteConsult(req, res))

export default consultRouter