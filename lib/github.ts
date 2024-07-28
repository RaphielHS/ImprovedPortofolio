import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: 'github_auth'
})

export type GithubData = {
    url: String,
    name: String,
    created_at: String,
    last_updated: String,
    language: String,
    size: any,
    archived: boolean
}

export const getRepoList = async (user: String) => {
    let data_return: GithubData[] = []
    await octokit.request("GET /users/{owner}/repos", {
            owner: user || "RaphielHS",
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        }
    ).then((res) => {
        for(let data of res.data) {
            if (data.name.toString().lower().endsWith(".github.io") === false) {
                if (!data.private) {
                    data_return.push({
                        name: data.name,
                        url: data.html_url,
                        created_at: data.created_at,
                        last_updated: data.updated_at,
                        language: data.language,
                        size: data.size,
                        archived: data.archived
                    })
                }
            }
        }
    })
    return data_return;
}