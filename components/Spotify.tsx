import { useEffect, useState } from 'react';
import { SpotifyData } from '../lib/spotify';

function getElapsedTime(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    return {
        hours: Math.floor(seconds / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60,
    };
}

function msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return {
        hours: hrs,
        minutes: mins,
        seconds: secs
    };
}

const SpotifyComponent = ({ data }: { data: SpotifyData }) => {
    if(!data) {
        return <div>Loading...</div>
    }
    const [albumImageUrl, setAlbumImageURL] = useState(data.albumImageUrl)
    const [album, setAlbum] = useState(data.album)
    const [artist, setArtist] = useState(data.artist)
    const [isPlaying, setIsPlaying] = useState(data.isPlaying)
    const [songUrl, setSongUrl] = useState(data.songUrl)
    const [title, setTitle] = useState(data.title)
    const [progress, setProgress] = useState(data.progress)
    const [timeTotal, setTimeTotal] = useState(data.timeTotal)
    const [artistUrl, setArtistUrl] = useState(data.artistUrl)
    const [time, setTime] = useState({hours:0,minutes:0,seconds:0})
    const [timestamp, setTimestamp] = useState(0)
    const [progressElapsed, setProgressElapsed] = useState(0)
    const [albumUrl, setAlbumUrl] = useState(data.albumUrl)

    const [totalMinutes, setTotalMinutes] = useState(0)
    const [totalSeconds, setTotalSeconds] = useState(0)

    useEffect(() => {
        const a = setTimeout(() => {
            fetch("/api/spotify").then((res) => {
                res.json().then((data) => {
                    setAlbumImageURL(data.albumImageUrl)
                    setArtist(data.artist)
                    setIsPlaying(data.isPlaying)
                    setSongUrl(data.songUrl)
                    setTitle(data.title)
                    setProgress(data.progress)
                    setTimeTotal(data.timeTotal)
                    setArtistUrl(data.artistUrl)
                    setAlbum(data.album)
                    setTimestamp(data.timestamp)
                    setTime(msToTime(data.progress))
                    setProgressElapsed(data.progress)
                    setAlbumUrl(data.albumUrl)
                    let secondsTotal = Math.floor(data.timeTotal/1000);
                    setTotalMinutes(Math.floor((secondsTotal % 3600) / 60));
                    setTotalSeconds(secondsTotal % 60);
                })
            })
        }, 5000);
        return () => clearInterval(a);
    }, [albumImageUrl, album, artist, isPlaying, songUrl, title, progress, timeTotal, timestamp, artistUrl]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (progressElapsed > progress) {
                setProgressElapsed(0);
            }
            if (isPlaying) {
                setProgressElapsed(progressElapsed! + 1000)
                setTime(msToTime(progressElapsed))
            } else {
                setTime({hours:0,minutes:0,seconds:0})
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying, progress, time, progressElapsed, timestamp]);
    return (
        <a target='_blank'
            rel='noopener noreferer'
            href={isPlaying ? songUrl : 'https://open.spotify.com/'}
            className='flex items-center space-x-4 min-w-80'>
            <div className='xl:w-52 lg:w-36 sm:w-36 sm:ml-10 md:w-40 rounded-3xl overflow-hidden shadow-sm'>
                {isPlaying ? (
                    <img
                        src={albumImageUrl}
                        alt={album} />
                ) : (
                    <img
                        src={"https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"}
                        alt={"https://open.spotify.com"} />
                )
                }
            </div>
            <div className='p-2'>
                <p className='font-semibold xl:text-xl sm:text-sm md:text-lg'>
                    {isPlaying ? "Listening to": 'Currently'}
                </p>
                <p className='font-bold xl:text-3xl sm:text-sm md:text-lg'>
                    {isPlaying ? title : 'Not Listening to anything'}
                </p>
                <a className='xl:text-xl sm:text-sm md:text-lg' href={isPlaying ? albumUrl : ""}>
                    {isPlaying ? `On ${album}` : 'On nothing'}
                </a><br/>
                <a className='font-dark xl:text-xl sm:text-sm md:text-lg'
                    href={artistUrl}>
                    {isPlaying ? `By ${artist}` : 'By Spotify'}
                </a>
                <p className='font-dark text-l'>
                    {isPlaying ? `${time.minutes}:${time.seconds <= 9 ? "0" + time.seconds.toString() : time.seconds}/${totalMinutes}:${totalSeconds <= 9 ? "0" + totalSeconds.toString() : totalSeconds}` : '0:00/0:00'}
                </p>
            </div>
        </a>
    );
};

export default SpotifyComponent;
