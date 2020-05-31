import { Router } from 'express';
import OngController from './controllers/OngController';
import SessionController from './controllers/SessionController';
import IncidentController from './controllers/IncidentController';
// import ProfileOngController from './controllers/ProfileOngController';

const routes = Router();
routes.post('/sessions', SessionController.store);

routes.post('/ongs', OngController.store);
routes.get('/ongs', OngController.index);
routes.post('/incidents', IncidentController.store);
routes.get('/incidents/', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);
// routes.get('/profile/', ProfileOngController.index);

export default routes;
