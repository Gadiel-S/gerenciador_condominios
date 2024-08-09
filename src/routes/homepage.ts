import { Router, Request, Response } from "express";

const homepage = Router();

homepage.get('/', async (req: Request, res: Response) => {
  res.send("API Sistema Gerenciador de Condomínios");
});

export default homepage;