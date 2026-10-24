
"use client";

import { useEffect, useState } from "react";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type GitHubData = {
  profile: {
    login: string;
    name: string | null;
    avatarUrl: string;
    profileUrl: string;
    publicRepos: number;
    followers: number;
  };
  totalContributions: number;
  weeks: ContributionWeek[];
};

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadGitHub() {
      try {
        const response = await fetch("/api/github", {
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Unable to load GitHub data.");
        }

        setData(result as GitHubData);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadGitHub();

    return () => controller.abort();
  }, []);

  return (
    <section className="section github-section" id="github">
      <div className="section-heading">
        <p className="eyebrow">OPEN SOURCE</p>
        <h2>GitHub Activity</h2>
        <p>My contributions and projects on GitHub.</p>
      </div>

      {loading && <p>Loading GitHub activity…</p>}

      {!loading && error && (
        <div className="github-message">
          <p>GitHub activity is currently unavailable.</p>
          <p className="github-error">{error}</p>
          <a
            href="https://github.com/VerBytesnBits"
            target="_blank"
            rel="noreferrer"
          >
            Visit my GitHub profile ↗
          </a>
        </div>
      )}

      {!loading && !error && data && (
        <div className="github-panel">
          <div className="github-profile">
            <img
              src={data.profile.avatarUrl}
              alt={`${data.profile.login}'s avatar`}
              width={52}
              height={52}
            />
            <div>
              <h3>{data.profile.name || data.profile.login}</h3>
              <a href={data.profile.profileUrl} target="_blank" rel="noreferrer">
                @{data.profile.login}
              </a>
            </div>
          </div>

          <div className="github-stats">
            <div>
              <strong>{data.totalContributions.toLocaleString()}</strong>
              <span>Contributions (past year)</span>
            </div>
            <div>
              <strong>{data.profile.publicRepos.toLocaleString()}</strong>
              <span>Public repositories</span>
            </div>
            <div>
              <strong>{data.profile.followers.toLocaleString()}</strong>
              <span>Followers</span>
            </div>
          </div>

          <div className="github-calendar">
            {data.weeks.map((week, index) => (
              <div className="github-week" key={index}>
                {week.contributionDays.map((day) => (
                  <span
                    className="github-day"
                    key={day.date}
                    style={{ backgroundColor: day.color || "#161b22" }}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <p className="github-note">
            Contribution counts are provided by GitHub.
          </p>
        </div>
      )}
    </section>
  );
}
