import { Router } from 'express';
import OngController from './controllers/OngController';
import SessionController from './controllers/SessionController';

// const IncidentController = require("./controllers/IncidentController");
// const ProfileOngController = require("./controllers/ProfileOngController");

const routes = Router();
routes.post('/sessions', SessionController.store);

routes.post('/ongs', OngController.store);
routes.get('/ongs', OngController.index);

// routes.get("/profile/", ProfileOngController.index);

// routes.post("/incidents", IncidentController.store);
// routes.get("/incidents/", IncidentController.index);
// routes.delete("/incidents/:id", IncidentController.delete);

export default routes;
