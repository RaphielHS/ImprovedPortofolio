import { getSubtitle } from '@/lib/musixmatch';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { song, artist },
        method,
    } = req;
    if(song) {
        if(artist) {
            return res.status(200).json({/* @ts-ignore */
                data: getSubtitle(song.toString(), artist.toString()),
                song: song.toString(),/* @ts-ignore */
                artist: artist.toString()
            })
        }
        return res.status(400).json({error:"BAD REQUEST, PARAMETER 'artist' IS MISSING"})
    }
    return res.status(400).json({error:"BAD REQUEST, PARAMETER 'song' IS MISSING"})
}
