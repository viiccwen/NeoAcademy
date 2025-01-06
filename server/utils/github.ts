export interface GitHubEmail {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string | null;
}

export async function getUserEmails(token: string): Promise<GitHubEmail[]> {
    const response = await fetch('https://api.github.com/user/emails', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${token}`,
        },
    });

    return await response.json() as GitHubEmail[];
}
