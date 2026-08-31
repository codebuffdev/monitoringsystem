import React from "react";
import { PageContainer } from "../components/Layout";
import { useRelease } from "../context/ReleaseContext";

export default function Changelog() {
  const release = useRelease();
  const releaseHistory = release.releaseHistory || [];

  return (
    <PageContainer
      eyebrow="RELEASE HISTORY"
      title="What changed."
      description="A compact history of stable System Monitor releases."
    >
      <section className="content-section release-list">
        {releaseHistory.length > 0 ? (
          releaseHistory.map((item, index) => (
            <article className="release-card" key={item.version}>
              <div className="release-head">
                <div>
                  <span className="eyebrow">VERSION</span>
                  <h2>v{item.version}</h2>
                </div>
                <span>{item.date}</span>
              </div>
              <p>{item.summary}</p>
              <ul>
                {item.changes.map((change, changeIndex) => (
                  <li key={`${item.version}-${changeIndex}`}>{change}</li>
                ))}
              </ul>
            </article>
          ))
        ) : (
          <article className="release-card">
            <p>Release history is temporarily unavailable.</p>
          </article>
        )}
      </section>
    </PageContainer>
  );
}
