import { Request, Response } from 'express';
import connection from '../database/connection';

class SessionController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const ong = await connection('ongs').select('name').where('id', id).first();

    if (!ong) return response.status(404).json({ error: 'ONG not found.' });

    return response.json(ong);
  }
}
export default new SessionController();
