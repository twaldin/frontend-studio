import type { ArchetypeContent } from "../schema";

/** Workspace: an operator tool for deploys, services and incidents. */
export const WORKSPACE_CONTENT: ArchetypeContent = {
  product: { name: "Relay", tagline: "Deploys, services and incidents in one place." },
  app: {
    nav: [{ label: "Home" }, { label: "Deploys", badge: 3 }, { label: "Services" }, { label: "Incidents" }, { label: "Members" }, { label: "Settings" }],
    topnav: ["Overview", "Deploys", "Services", "Incidents", "Settings"],
    page: { title: "Services", action: "New service" },
    stats: [
      {
        label: "Requests / min",
        value: "48.2K",
        series: [31, 33, 35, 34, 38, 41, 40, 44, 43, 47, 46, 45, 49, 48],
        breakdown: [
          { name: "api-gateway", series: [14, 15, 16, 15, 17, 18, 18, 20, 19, 21, 21, 20, 22, 22] },
          { name: "search", series: [9, 10, 10, 10, 11, 12, 12, 13, 13, 14, 13, 13, 14, 14] },
          { name: "auth", series: [5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 9, 8] },
          { name: "billing", series: [3, 3, 3, 3, 3, 4, 3, 4, 4, 4, 4, 4, 4, 4] },
        ],
      },
      { label: "p95 latency", value: "212 ms", series: [260, 255, 248, 250, 241, 236, 238, 230, 225, 228, 220, 218, 214, 212] },
      { label: "Error rate", value: "0.14%", series: [0.3, 0.28, 0.31, 0.26, 0.22, 0.24, 0.2, 0.19, 0.21, 0.17, 0.16, 0.15, 0.15, 0.14] },
      { label: "Deploys today", value: "7", series: [4, 6, 5, 8, 3, 7, 9, 6, 5, 8, 7, 6, 8, 7] },
    ],
    panel: {
      title: "Needs attention",
      items: [
        { title: "billing is degraded", body: "p95 latency has been above 500 ms for 40 minutes. Roll back to the previous artifact?", actions: ["Roll back", "Keep watching"] },
        { title: "notifications is down", body: "Health checks have failed since 09:12. Restart the service or open an incident.", actions: ["Restart", "Open incident"] },
      ],
    },
    table: {
      columns: ["Service", "Status", "Region", "p95", "Last deploy"],
      rows: [
        [{ text: "api-gateway" , kind: "mono" }, { text: "Healthy", kind: "status", tone: "ok" }, { text: "us-east-1", kind: "muted" }, { text: "184 ms", kind: "num" }, { text: "12 min ago", kind: "muted" }],
        [{ text: "billing", kind: "mono" }, { text: "Degraded", kind: "status", tone: "warn" }, { text: "us-east-1", kind: "muted" }, { text: "612 ms", kind: "num" }, { text: "2 h ago", kind: "muted" }],
        [{ text: "search", kind: "mono" }, { text: "Healthy", kind: "status", tone: "ok" }, { text: "eu-west-1", kind: "muted" }, { text: "98 ms", kind: "num" }, { text: "Yesterday", kind: "muted" }],
        [{ text: "notifications", kind: "mono" }, { text: "Down", kind: "status", tone: "bad" }, { text: "us-west-2", kind: "muted" }, { text: "Unknown", kind: "status", tone: "unknown" }, { text: "3 d ago", kind: "muted" }],
        [{ text: "worker-pool", kind: "mono" }, { text: "Paused", kind: "status", tone: "off" }, { text: "us-east-1", kind: "muted" }, { text: "—", kind: "muted" }, { text: "1 w ago", kind: "muted" }],
        [{ text: "auth", kind: "mono" }, { text: "Healthy", kind: "status", tone: "ok" }, { text: "eu-west-1", kind: "muted" }, { text: "76 ms", kind: "num" }, { text: "4 h ago", kind: "muted" }],
      ],
    },
    form: {
      title: "New service",
      fields: [
        { label: "Name", kind: "text", placeholder: "api-gateway" },
        { label: "Region", kind: "select", options: ["us-east-1", "us-west-2", "eu-west-1"] },
        { label: "Auto-deploy on push", kind: "switch" },
        { label: "Notify on failure", kind: "checkbox" },
      ],
      submit: "Create service",
      cancel: "Cancel",
    },
    empty: { title: "No services yet.", body: "Connect a repository to deploy your first service.", action: "Connect repository" },
    error: { title: "Deploy failed", detail: "Build step exited with code 1 after 42 s.", action: "Retry" },
    toast: "Service created.",
    dialog: { title: "Delete billing?", body: "This removes the service and its deploy history. This cannot be undone.", confirm: "Delete", cancel: "Cancel" },
    prose: {
      title: "Rollouts",
      paragraphs: [
        "A rollout replaces instances in batches and stops at the first failed health check. Traffic shifts only when the new batch is healthy.",
        "Rollbacks reuse the previous artifact; nothing is rebuilt.",
      ],
    },
    code: {
      path: "relay.yaml",
      lines: ["service: api-gateway", "region: us-east-1", "healthcheck:", "  path: /healthz", "  interval: 10s", "rollout:", "  batch: 25%", "  pause_on_failure: true"],
    },
    composer: { placeholder: "Describe a task", send: "Start" },
    search: "Search",
    periods: ["24h", "7d", "30d"],
    items: [
      { title: "api-gateway", meta: "us-east-1 · 12 min ago", value: "184 ms", badge: "Healthy", group: "Services" },
      { title: "billing", meta: "us-east-1 · 2 h ago", value: "612 ms", badge: "Degraded", group: "Services" },
      { title: "search", meta: "eu-west-1 · Yesterday", value: "98 ms", badge: "Healthy", group: "Services" },
      { title: "Roll out auth v42", meta: "Started by Maya · 3 of 4 batches", progress: 0.75, group: "Deploys" },
    ],
    thread: [
      { author: "Maya", text: "billing p95 jumped right after the 14:02 deploy.", time: "14:09" },
      { author: "Relay", text: "The 14:02 deploy changed the connection pool size from 40 to 10. Roll back?", time: "14:09" },
      { author: "You", text: "Roll back billing to the previous artifact.", mine: true, time: "14:10" },
    ],
  },
  landing: {
    nav: ["Product", "Docs", "Pricing", "Changelog"],
    cta: "Get started",
    ctaSecondary: "See how it works",
    emailPlaceholder: "you@company.com",
    h1: "The deploy system for small teams.",
    sub: "Ship a service, watch it roll out, and know within a minute when something is wrong.",
    sections: [
      { eyebrow: "Deploys", title: "Roll out in batches. Stop at the first failure.", body: "Traffic moves only when the new batch passes its health check. Rollbacks reuse the previous artifact." },
      { eyebrow: "Incidents", title: "Every incident, with the deploy that caused it.", body: "Alerts link to the diff. The timeline shows who changed what and when it went live." },
      { eyebrow: "Services", title: "One page per service.", body: "Status, region, latency, recent deploys and the people on call, on one screen." },
    ],
    proof: {
      logos: ["Northwind", "Contoso", "Fabrikam", "Initech", "Umbrella", "Hooli"],
      numbers: [
        { value: "2.4M", label: "deploys" },
        { value: "48 s", label: "median rollout" },
        { value: "99.98%", label: "uptime" },
      ],
      quotes: [{ text: "We stopped writing deploy scripts. Relay is the deploy script.", who: "Maya Chen, CTO at Northwind" }],
    },
    footer: "© Relay. All rights reserved.",
  },
};
