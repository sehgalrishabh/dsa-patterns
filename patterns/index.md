# 🗺️ Pattern Cheatsheet

Quick reference — match the prompt signal to the pattern, then go to the pattern page.

---

## Pattern Recognition Table

| Signal in the problem | Pattern to use | Typical complexity |
|----------------------|----------------|-------------------|
| "sorted array", "find pair", "two ends" | [Two Pointers](./two-pointers) | O(n) |
| "subarray", "substring", "window", "contiguous" | [Sliding Window](./sliding-window) | O(n) |
| "sorted", "find position", "minimum/maximum in sorted" | [Binary Search](./binary-search) | O(log n) |
| "shortest path", "fewest steps", "level by level" | [BFS](./bfs) | O(V+E) |
| "all combinations", "permutations", "generate all" | [DFS & Backtracking](./dfs-backtracking) | O(2ⁿ) or O(n!) |
| "maximum/minimum value", "how many ways", "optimal" | [Dynamic Programming](./dynamic-programming) | O(n²) typically |
| "find pair", "count frequency", "check duplicate" | [HashMap & HashSet](./hashmap) | O(n) |
| "range sum", "subarray sum equals k" | [Prefix Sum](./prefix-sum) | O(n) |
| "next greater", "next smaller", "temperatures" | [Monotonic Stack](./monotonic-stack) | O(n) |
| "kth largest", "top K", "median" | [Heap / Top-K](./heap-top-k) | O(n log k) |
| "linked list cycle", "middle of list", "palindrome list" | [Fast & Slow Pointer](./fast-slow-pointer) | O(n) |
| "overlapping intervals", "merge ranges", "meeting rooms" | [Merge Intervals](./merge-intervals) | O(n log n) |

---

## By Data Structure

| Data structure | Common patterns |
|----------------|----------------|
| Array | Two Pointers, Sliding Window, Binary Search, Prefix Sum |
| String | Sliding Window, HashMap, Two Pointers |
| Linked List | Fast & Slow Pointer, DFS |
| Tree | DFS, BFS |
| Graph | BFS, DFS, Backtracking |
| Stack | Monotonic Stack, DFS (iterative) |
| Heap | Top-K, Merge K sorted |
| HashMap | Two Sum, Frequency, Anagrams |

---

## By Problem Tag

| LeetCode tag | Go to |
|-------------|-------|
| Array | Two Pointers, Sliding Window, Binary Search |
| String | Sliding Window, HashMap |
| Tree | DFS, BFS |
| Graph | BFS, DFS, Backtracking |
| Dynamic Programming | Dynamic Programming |
| Greedy | Usually sorting + one pass |
| Backtracking | DFS & Backtracking |
| Binary Search | Binary Search |
| Linked List | Fast & Slow Pointer |
| Stack | Monotonic Stack |
| Heap | Heap / Top-K |
| Math | Prefix Sum, HashMap |

---

## Complexity Quick Reference

| Pattern | Time | Space |
|---------|------|-------|
| Two Pointers | O(n) | O(1) |
| Sliding Window | O(n) | O(k) |
| Binary Search | O(log n) | O(1) |
| BFS | O(V+E) | O(V) |
| DFS | O(V+E) | O(V) |
| Backtracking | O(2ⁿ)–O(n!) | O(n) |
| Dynamic Programming | O(n²) typical | O(n)–O(n²) |
| HashMap | O(n) | O(n) |
| Prefix Sum | O(n) build, O(1) query | O(n) |
| Monotonic Stack | O(n) | O(n) |
| Heap / Top-K | O(n log k) | O(k) |
| Fast & Slow Pointer | O(n) | O(1) |
| Merge Intervals | O(n log n) | O(n) |
