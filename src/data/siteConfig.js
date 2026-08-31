import githubProfile from "./githubProfile.json";
export const siteConfig = {
  productName: "System Monitor",
  websiteVersion: "1.2.18",
  repositoryUrl: "https://github.com/codebuffdev/system-monitor",
  developer: {
    ...githubProfile,
    bio: "Java Backend Developer | Full-Stack Developer | Cloud & DevOps Enthusiast",
  },
};

export const features = [
  {
    icon: "cpu",
    title: "Real-time monitoring",
    text: "Monitor CPU, RAM, GPU, swap and disk usage from one lightweight dashboard.",
  },
  {
    icon: "history",
    title: "Performance history",
    text: "Track system behavior across 1 minute to 24 hours with historical graphs.",
  },
  {
    icon: "network",
    title: "Network monitoring",
    text: "See network activity, transfer rates and total data usage at a glance.",
  },
  {
    icon: "disk",
    title: "Disk I/O",
    text: "Monitor disk read and write activity without leaving the dashboard.",
  },
  {
    icon: "bell",
    title: "Performance alerts",
    text: "Set thresholds for CPU, RAM and GPU and get notified when they stay high.",
  },
  {
    icon: "shield",
    title: "Alert history",
    text: "Keep a record of when your system crossed a configured threshold.",
  },
];

