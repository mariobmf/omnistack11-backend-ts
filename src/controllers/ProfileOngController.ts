import crypto from 'crypto';
import { Request, Response } from 'express';
import connection from '../database/connection';

class ProfileOngController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ongId = request.headers.authorization;

    if (ongId === undefined) {
      return response
        .status(400)
        .json({ error: 'Parâmetro ongId obrigatório' });
    }
    const incidents = await connection('incidents')
      .select('*')
      .where('ong_id', ongId);

    return response.json(incidents);
  }
}
export default new ProfileOngController();
