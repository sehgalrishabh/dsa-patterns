import { defineConfig } from "vitepress";

export default defineConfig({
  title: "DSA Patterns",
  description: "Master the 12 core DSA interview patterns in JavaScript & Java",
  cleanUrls: true,
  base: "/dsa-patterns/",

  head: [
    [
      "link",
      {
        rel: "icon",
        href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>',
      },
    ],
  ],

  themeConfig: {
    logo: "⚡",

    nav: [
      { text: "Framework", link: "/framework" },
      { text: "All Patterns", link: "/patterns/" },
    ],

    sidebar: [
      {
        text: "Start Here",
        items: [
          { text: "🏠 Overview", link: "/" },
          { text: "🧠 5-Step Framework", link: "/framework" },
          { text: "🗺️ Pattern Cheatsheet", link: "/patterns/" },
        ],
      },
      {
        text: "Array & String Patterns",
        items: [
          { text: "👉 Two Pointers", link: "/patterns/two-pointers" },
          { text: "🪟 Sliding Window", link: "/patterns/sliding-window" },
          { text: "🔍 Binary Search", link: "/patterns/binary-search" },
          { text: "➕ Prefix Sum", link: "/patterns/prefix-sum" },
          { text: "📚 Monotonic Stack", link: "/patterns/monotonic-stack" },
        ],
      },
      {
        text: "Graph & Tree Patterns",
        items: [
          { text: "🌊 BFS", link: "/patterns/bfs" },
          { text: "🌲 DFS & Backtracking", link: "/patterns/dfs-backtracking" },
          {
            text: "🐢 Fast & Slow Pointer",
            link: "/patterns/fast-slow-pointer",
          },
        ],
      },
      {
        text: "Optimization Patterns",
        items: [
          { text: "🗂️ HashMap & HashSet", link: "/patterns/hashmap" },
          { text: "⛰️ Heap / Top-K", link: "/patterns/heap-top-k" },
          { text: "🔀 Merge Intervals", link: "/patterns/merge-intervals" },
          {
            text: "🎯 Dynamic Programming",
            link: "/patterns/dynamic-programming",
          },
        ],
      },
    ],

    search: {
      provider: "local",
    },

    footer: {
      message: "Built for interview prep. JavaScript & Java.",
    },
  },
});
