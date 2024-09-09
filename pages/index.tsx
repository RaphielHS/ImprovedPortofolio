import Image from "next/image";
import Avatar from "./assets/Avatar.jpg";
import { SpotifyData } from "../lib/spotify";
import dynamic from 'next/dynamic'
import Projects from "@/components/Project";
const Quote = dynamic(() => import('@/components/Quotes'), { ssr: false })
const SpotifyComponent = dynamic(() => import('@/components/Spotify'), { ssr: false })

export default function Home({ spotifyData }: { spotifyData: SpotifyData }) {
  return (
    <main className="p-3">
      <div className="flex items-center min-h-[calc(100dvh)] flex-col justify-between">
        <div className="z-10 w-full max-w-5xl m-10 items-center justify-between font-mono text-sm lg:flex">
          <div>
            <Image src={Avatar} alt="Profile Picture" className="mx-auto mb-5 mt-10 grid rounded-full w-2/6" />
            <h1 className="text-6xl mt-2 text-center md:text-5xl sm:text-2lg bg-gradient-to-r from-blue-100 to-indigo-500 text-transparent bg-clip-text">RaphielHS</h1>
            <Quote />
          </div>
        </div>
        <h1 className="animate-bounce text-white text-7xl absolute transform bottom-2 -translate-x-1/2">VV</h1>
      </div>
      <div className="grid grid-cols-2 xl:grid-rows-4 sm:grid-rows-3 md:grid-rows-2 lg:grid-rows-3 m-2">
        <div className="col-span-2 grid-row-2">
          <h1 className="text-5xl ml-10">Projects</h1>
          <a href="https://github.com/RaphielHS" className="ml-10 opacity-65 hover:opacity-100 animate-pulse hover:animate-none transition duration-200 delay-200 ease-in-out ">Github Projects</a>
          <div className="p-10 m-10">
            <Projects/>
          </div>
        </div>
        <div className=" ml-10">
          <h1 className="text-5xl lg:col-span-2 xl:col-span-2">Spotify Status</h1>
          <div className="mt-10 border rounded-lg flex justify-center items-center">
            <div className="m-4 flex items-center space-x-4 p-5 transition-shadow">
              <SpotifyComponent data={spotifyData} />
            </div>
          </div>
        </div>
        <div className="lg:grid-row-3 ml-10">
          <h1 className="text-5xl lg:col-span-2 xl:col-span-2">Lyrics</h1>
          <div className="mt-10 border rounded-lg flex justify-center items-center">
            <div className="m-4 flex items-center space-x-4 p-5 transition-shadow">
              <h1>In Development</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/spotify`);
  let spotifyData: SpotifyData = await res.json().catch((err) => {
    console.error(err)
    return  {
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
    }
  });
  return {
    props: {
      spotifyData,
    },
  };
};