export type SpotifyData = {
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
    progress: number;
    timeTotal: number;
    artistUrl: string;
    album: string;
    timestamp: 0;
    albumUrl: string;
};

const CLIENT_ID = "client_id";
const CLIENT_SECRET = "client_secret";
const CLIENT_BASE64 = "client_base_64"; // Google
const REDIRECT_URI = "http%3A%2F%2Flocalhost:3000";
const SCOPE = "user-read-playback-state user-read-currently-playing";
const ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
let REFRESH = "Refresh token"
// Get refresh token manually: https://accounts.spotify.com/en/authorize?client_id=7dc413adb2bc48c4866754c470d4afb6&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-playback-state+user-read-currently-playing
export const fetchAccessTokenWithRefresh = async () => {
    const response = await fetch(ACCESS_TOKEN_URL, {
        method: 'POST',
        headers: {
            "Authorization": `Basic ${CLIENT_BASE64}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH,
            client_id: CLIENT_ID,
            redirect_uri: "http://localhost:3000",
        }),
    });
    const data = await response.json();
    REFRESH = data.refresh_token || REFRESH
    return data.access_token;
}
export const fetchAccessToken = async () => {
    const response = await fetch(ACCESS_TOKEN_URL, {
        method: 'POST',
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${CLIENT_BASE64}`
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: SCOPE
        }),
        cache: "no-cache"
    });
    
    const data = await response.json();
    return data.access_token;
};

export const fetchCurrentlyPlaying = async (accessToken: string): Promise<SpotifyData> => {
    const response = await fetch(CURRENTLY_PLAYING_URL, {
        mode: "no-cors",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        cache: "no-cache"
    });
    if (response.status >= 400 || response.status === 204) {
        console.log("Unable to fetch songs");
        response.text().then((dt) => {
            console.log(dt)
        })
        return {
            albumImageUrl: "",
            album: "",
            artist: "",
            isPlaying: false,
            songUrl: "",
            title: "",
            progress: 0,
            timeTotal: 0,
            artistUrl: "",
            timestamp: 0,
            albumUrl: ""
        };
    }
    
    const song = await response.json();
    return {
        albumImageUrl: song?.item.album.images[0].url || "",
        album: song?.item.album.name || "",
        artist: song?.item.artists.map((artist: { name: string }) => artist.name).join(', ') || "",
        isPlaying: song?.is_playing || false,
        songUrl: song?.item.external_urls.spotify || "",
        title: song?.item.name || "",
        progress: song?.progress_ms || 0,
        timeTotal: song?.item.duration_ms || 0,
        artistUrl: song?.item.album.artists[0].external_urls.spotify || "",
        timestamp: song?.timestamp,
        albumUrl: song?.item.album.ref
    };
};
