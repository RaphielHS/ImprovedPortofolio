import { GithubData } from "@/lib/github";
import { useState, useEffect } from "react";

// export type GithubData = {
//   url: String,
//   name: String,
//   created_at: String,
//   last_updated: String,
//   language: String,
//   size: any,
//   archived: boolean
// }
const Projects = () => {
  // let data = {};
  // fetch("/api/github")
  //   .then((res) => res.json())
  //   .then((data) => data = data.data);
  const data: GithubData[] = [
    {
      url: "https://github.com/RaphielHS/AutoSuggestServer",
      name: "Auto Suggest Server",
      created_at: "20 April 2020",
      last_updated: "28 January 2024",
      language: "Python",
      size: "15.6KB",
      archived: false
    },
    {
      url: "https://github.com/RaphielHS/portfolio",
      name: "Portofolio(old)",
      created_at: "28 January 2021",
      last_updated: "31 January 2024",
      language: "HTML/CSS/SASS",
      size: "~200MB",
      archived: false
    },
    {
      url: "https://github.com/RaphielHS/ImprovedPortofolio",
      name: "Improved Portofolio",
      created_at: "28 Jul 2024",
      last_updated: "9 September 2024",
      language: "Javascript/NextJS",
      size: "~400MB",
      archived: false
    }
  ]
  return (
    <div className="min-w-full grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
      { /* @ts-ignore */ }
      {data.length > 0 ? ( // @ts-ignore
        data.map((project, index) => (
          <div className="p-3 m-5 border border-white rounded-xl">
            <h1 className="text-center md:text-2xl text-3xl">{project.name}</h1>
            {project.archived ? (
              <h1 className="text-center text-l -mt-1 mb-5 text-yellow-300">ARCHIVED</h1>
            ) : (
              <h1 className="text-center text-l -mt-1 mb-5 text-green-300">NOT ARCHIVED</h1>
            )}
            {/* <h1 className="text-center text-xl mb-5 mt-1">Description</h1> */}
            <hr/>
            <h1 className="mt-5 text-l sm:text-l">Made at {project.created_at}</h1>
            <h1 className="text-l">Last updated {project.last_updated}</h1>
            <h1 className="text-l">Written in {project.language}</h1>
            <h1 className="text-l">Project Size {project.size}</h1>
            <hr className="mt-5"/>
            <a href={project.url.toString()} rel="noopener noreferrer" target="_blank" className="scale-90 block mt-5 items-center hover:scale-100 content-center duration-300 transition ease-in-out delay-100 hover:opacity-100 opacity-75 text-l text-center p-3 rounded-xl bg-white text-black">
              View in Github
            </a>
          </div>
        ))
      ) : (
          <h1 className="text-4xl text-center">Null Projects Found.</h1>
      )}
    </div>
  );
};
  

export default Projects;
