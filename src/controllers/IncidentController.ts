import { Request, Response } from 'express';
import connection from '../database/connection';

interface IIncident {
  title: string;
  description: string;
  value: number;
}

class IncidentController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { title, description, value }: IIncident = request.body;
    const ongId = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id: ongId,
    });

    return response.json({ id });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const ongs = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((Number(page) - 1) * 5)
      .select(
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      );

    response.header('X-Total-Count', count['count(*)']);
    return response.json(ongs);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const ongId = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident === undefined)
      return response.status(404).json({ error: 'Case not found.' });

    if (incident.ong_id !== ongId)
      return response.status(401).json({ error: 'Operation not permitted.' });

    await connection('incidents').delete().where('id', id);

    return response.status(204).send();
  }
}
export default new IncidentController();
