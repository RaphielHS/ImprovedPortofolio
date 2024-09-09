import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepoList } from '@/lib/github';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const USERNAME = "RaphielHS"
    const a = await getRepoList(USERNAME)
    try {
        return res.status(200).json({data: a})
    } catch (err) {
        return res.status(500).json({data: err})
    }
}
