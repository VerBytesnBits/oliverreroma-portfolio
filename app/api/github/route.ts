
import { NextResponse } from "next/server";

const username = "VerBytesnBits";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is not configured on the server." },
      { status: 503 }
    );
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    };

    const [profileResponse, contributionResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query($username: String!) {
              user(login: $username) {
                login
                name
                avatarUrl
                url
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                        color
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { username },
        }),
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileResponse.ok) {
      return NextResponse.json(
        { error: `GitHub profile request failed (${profileResponse.status}).` },
        { status: profileResponse.status }
      );
    }

    if (!contributionResponse.ok) {
      return NextResponse.json(
        { error: `GitHub contribution request failed (${contributionResponse.status}).` },
        { status: contributionResponse.status }
      );
    }

    const profile = await profileResponse.json();
    const graphQLResult = await contributionResponse.json();

    if (graphQLResult.errors?.length) {
      return NextResponse.json(
        { error: graphQLResult.errors[0].message },
        { status: 502 }
      );
    }

    const user = graphQLResult.data?.user;

    if (!user) {
      return NextResponse.json(
        { error: "GitHub user was not found." },
        { status: 404 }
      );
    }

    const calendar = user.contributionsCollection.contributionCalendar;

    return NextResponse.json(
      {
        profile: {
          login: profile.login,
          name: profile.name,
          avatarUrl: profile.avatar_url,
          profileUrl: profile.html_url,
          publicRepos: profile.public_repos,
          followers: profile.followers,
        },
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to connect to GitHub. Please try again later." },
      { status: 502 }
    );
  }
}
