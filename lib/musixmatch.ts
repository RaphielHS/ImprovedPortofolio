const getUserToken = async () => {
    await fetch("https://apic-desktop.musixmatch.com/ws/1.1/token.get?app_id=web-desktop-app-v1.0&t=uja").then(async (res) => {
        await res.json().then((body) => {
            return body.body.user_token
        })
    })
}

export const getSubtitle = async (TRACK: String, ARTIST: String) => {
    const token = await getUserToken();
    await fetch(`https://apic-desktop.musixmatch.com/1.1/macro.subtitles.get?format=json&namespace=lyrics_richsynched&optional_calls=track.richsync&subtitle_format=lrc&q_artist=${ARTIST}&q_track=${TRACK}&usertoken=${token}&f_subtitle_length=142&q_duration=142&f_subtitle_length_max_deviation=40&app_id=web-desktop-app-v1.0&t=iczhvi`)
    .then((res) => {
        return res
    })
}