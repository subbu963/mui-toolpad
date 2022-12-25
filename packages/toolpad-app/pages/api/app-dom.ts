import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { AppDom } from '../../src/appDom';
import { loadDom } from '../../src/server/data';
import { VersionOrPreview } from '../../src/types';
import initMiddleware from '../../src/server/initMiddleware';

// Initialize the cors middleware
const cors = initMiddleware<any>(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        methods: ['GET'],
        // TODO: make this configurable
        origin: '*',
    }),
);
export default  async (
    req: NextApiRequest,
    res: NextApiResponse<AppDom | undefined>,
  ) => {
    if (req.method !== 'GET') {
        // This endpoint is used both by queries and mutations
        res.status(405).end();
        return;
    }
    await cors(req, res);
    const dom = await loadDom(req.query.appId as string, req.query.version as VersionOrPreview);
    res.json(dom);
};