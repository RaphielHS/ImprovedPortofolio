import type { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyData, fetchAccessToken, fetchAccessTokenWithRefresh, fetchCurrentlyPlaying } from '@/lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = await fetchAccessTokenWithRefresh();
  const spotifyData = await fetchCurrentlyPlaying(accessToken);
  try {
    res.status(200).json(spotifyData);
  } catch (error) {
    console.log(`error: ${error}`)
    res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
}
