import crypto from 'crypto';
import { Request, Response } from 'express';
import connection from '../database/connection';

interface IOng {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}
class OngController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, whatsapp, city, uf }: IOng = request.body;

    const id = crypto.randomBytes(4).toString('hex');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  }
}
export default new OngController();
