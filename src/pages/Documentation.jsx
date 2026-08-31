import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/Layout";

const topics = [
  {
    number: "01",
    title: "Getting started",
    summary: "Install System Monitor, launch it and understand the main dashboard.",
    sections: [
      ["Install and launch", "Use the current Windows installer, complete the installation, then launch System Monitor. The monitor can remain available from the Windows notification area when the main window is hidden."],
      ["First look", "The compact dashboard shows CPU, RAM, GPU, swap and disk usage at a glance, followed by uptime, memory, process, disk I/O and network information."],
      ["Everyday controls", "Use the tray menu to show or hide the monitor, open Performance History or Alert History, check for application updates, configure alerts, and control Windows startup behavior."],
    ],
  },
  {
    number: "02",
    title: "Dashboard",
    summary: "Understand live CPU, RAM, GPU, swap, disk, process and network information.",
    sections: [
      ["Resource gauges", "CPU, RAM, GPU, swap and disk gauges show the current resource level. The website preview uses Good below 40%, Moderate from 40% through 75%, and High above 75% as a visual guide."],
      ["Information row", "System uptime shows how long Windows has been running. RAM shows memory information, Processes shows the current process count, Top CPU identifies the process using the most CPU, and Disk I/O shows read/write activity."],
      ["Click actions", "The CPU gauge can help select a high-CPU user process for a graceful close. RAM can start a safe memory cleanup, GPU can select a high-GPU user process for a graceful close, swap can run a safe memory cleanup, and the disk gauge opens detailed disk activity."],
      ["Network", "The network row shows the active connection name, receive/transmit rates and total traffic. REFRESH establishes a fresh measurement baseline and samples for one second before updating transfer rates."],
      ["Window controls", "PIN keeps the monitor above other windows. The park gesture hides the monitor against the nearest screen edge and leaves a restore handle available. Minimize sends the window to the taskbar, while closing the window hides it to the tray."],
    ],
  },
  {
    number: "03",
    title: "Performance history",
    summary: "Inspect historical resource usage with ranges, statistics and hover details.",
    sections: [
      ["Tracked metrics", "Performance History records CPU, RAM, GPU and swap usage together with disk read/write throughput and network receive/send throughput."],
      ["Time ranges", "The history view provides 1 minute, 5 minute, 15 minute, 1 hour, 6 hour and 24 hour ranges."],
      ["Statistics", "CPU, RAM and GPU summaries show the average for the selected range, plus minimum and peak values. Current values are shown alongside the charts."],
      ["Chart inspection", "Move the pointer over a chart to inspect a timestamp and the value at that sample. The crosshair is synchronized across the history charts."],
      ["Persistence", "The rolling history is persisted locally so recent data can be restored after restarting the application. CLEAR removes the in-memory history and its saved history data."],
    ],
  },
  {
    number: "04",
    title: "Alerts",
    summary: "Configure sustained CPU, RAM and GPU thresholds and review alert events.",
    sections: [
      ["What triggers an alert", "CPU, RAM and GPU are monitored against configurable thresholds. A metric must remain at or above its configured threshold for the configured sustain period before an alert is raised."],
      ["Configuration", "Alert Settings lets you configure separate CPU, RAM and GPU thresholds and a sustain duration from 1 to 3600 seconds. DEFAULTS restores the default settings."],
      ["Notifications", "When an alert fires, System Monitor shows a Windows tray notification containing the metric, threshold, duration and observed value."],
      ["Anti-spam behavior", "A metric raises only one alert while the condition remains active. It must fall below its threshold and later satisfy the sustain period again before another alert is allowed."],
      ["Alert history", "Alert History records actual CPU, RAM and GPU alert events, including time, metric, value, threshold and sustained duration. The log keeps the newest 500 events and can be cleared."],
    ],
  },
  {
    number: "05",
    title: "Network monitoring",
    summary: "Review connection status, transfer rates and total network traffic.",
    sections: [
      ["Connection", "The dashboard identifies the active network connection and displays its current signal information when available."],
      ["Transfer rates", "Receive (RX) and transmit (TX) rates are measured from Windows network statistics over time rather than treated as static values."],
      ["Total traffic", "The network section also reports accumulated receive and transmit traffic for the monitored connection information."],
      ["Refresh", "Use REFRESH when you want a fresh network measurement. System Monitor establishes a new baseline, waits one second, then calculates the updated transfer rates."],
      ["History", "Network receive and send throughput are also available in Performance History for time-based inspection."],
    ],
  },
  {
    number: "06",
    title: "Troubleshooting",
    summary: "Start with the common installation, monitoring, alert and update issues.",
    sections: [
      ["Installer or startup", "If the installer does not start, confirm the download completed and run the installer again from a local folder. If the application does not appear, check the Windows notification area because closing the monitor hides it to the tray."],
      ["A metric looks unavailable", "Restart System Monitor and check the affected Windows performance source. Some hardware counters, especially GPU-related counters, depend on what Windows exposes on the machine."],
      ["History is empty", "History needs samples before charts can display useful data. Leave System Monitor running long enough to collect samples, then select the required time range."],
      ["Alerts are not appearing", "Check that Performance Alerts is enabled, then review the CPU, RAM and GPU thresholds and sustain duration in Alert Settings. The condition must remain above the configured threshold for the full duration."],
      ["Network values look stale", "Use REFRESH to establish a new measurement baseline. The application samples for one second before updating the displayed transfer rates."],
      ["Updates", "The application has its own in-app GitHub update flow. The public website's download mechanism is separate from that updater; if an update fails, use the current stable installer from the website rather than changing the application's updater files."],
    ],
  },
];

function DocumentationModal({ topic, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="doc-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="doc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="doc-modal-close" type="button" aria-label="Close documentation" onClick={onClose}>
          ×
        </button>

        <div className="doc-modal-header">
          <span className="doc-number">{topic.number}</span>
          <span className="eyebrow">DOCUMENTATION</span>
          <h2 id="doc-modal-title">{topic.title}</h2>
          <p>{topic.summary}</p>
        </div>

        <div className="doc-modal-body">
          {topic.sections.map(([heading, text]) => (
            <section className="doc-detail" key={heading}>
              <h3>{heading}</h3>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Documentation() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <PageContainer
      eyebrow="DOCUMENTATION"
      title="Understand System Monitor."
      description="A concise guide to the current desktop application and its monitoring features."
    >
      <section className="content-section">
        <div className="docs-grid">
          {topics.map((topic) => (
            <button
              className="doc-card doc-card-button"
              type="button"
              key={topic.title}
              onClick={() => setSelectedTopic(topic)}
              aria-label={`Open documentation for ${topic.title}`}
            >
              <span className="doc-number">{topic.number}</span>
              <h2>{topic.title}</h2>
              <p>{topic.summary}</p>
              <span className="doc-card-action">View details →</span>
            </button>
          ))}
        </div>
      </section>

      <section className="content-section split-content">
        <div>
          <span className="eyebrow">INSTALLATION</span>
          <h2>Start with the stable Windows installer.</h2>
        </div>
        <div>
          <p>Download the current stable release, run the installer and launch System Monitor. The website download path is kept separate from the application's update mechanism.</p>
          <p className="muted">The updater itself is not part of this website and should remain independently managed.</p>
        </div>
      </section>

      <section className="content-section faq-section">
        <div className="section-heading">
          <span className="eyebrow">FAQ</span>
          <h2>Common questions.</h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>Does the website monitor my PC?</summary>
            <p>No. The website is only the public product site. System monitoring happens inside the desktop application.</p>
          </details>
          <details>
            <summary>Does the website call GitHub when I open it?</summary>
            <p>No. Developer details are fetched during the website build and stored in a local cache. The browser never calls the GitHub profile API.</p>
          </details>
          <details>
            <summary>Which Windows versions are supported?</summary>
            <p>The current release is presented for Windows 10 / 11 on x64.</p>
          </details>
        </div>
      </section>

      <section className="content-section faq-section">
        <div className="section-heading">
          <span className="eyebrow">TROUBLESHOOTING</span>
          <h2>Start with the basics.</h2>
        </div>
        <div className="docs-grid troubleshooting-grid">
          <article className="doc-card">
            <h2>Installer does not start</h2>
            <p>Confirm that the downloaded installer completed successfully, then run it again from a local folder.</p>
          </article>
          <article className="doc-card">
            <h2>Metrics look unavailable</h2>
            <p>Restart System Monitor and check whether the affected Windows performance source is available on the machine.</p>
          </article>
          <article className="doc-card">
            <h2>Alerts are not appearing</h2>
            <p>Review the configured threshold and duration. Alerts require the metric to remain above its threshold for the configured period.</p>
          </article>
        </div>
      </section>

      {selectedTopic && (
        <DocumentationModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </PageContainer>
  );
}
