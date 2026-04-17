# 🧠 The 5-Step Framework

> Before touching code, follow this loop for every single problem. Interviewers score your **process** as heavily as your answer.

---

## The Loop

| Step | Action | Time to spend |
|------|--------|---------------|
| 1 | **Understand** — restate, examples, constraints | 2–3 min |
| 2 | **Brute force** — state it out loud | 1–2 min |
| 3 | **Pattern** — identify the right approach | 2–3 min |
| 4 | **Code** — clean, readable, no tricks | 10–15 min |
| 5 | **Test** — trace + edge cases | 2–3 min |

---

## Step 1 — Understand the Problem

Never assume. Ask or state:

- What are the input types and sizes? (`n ≤ 10^5`?)
- Can there be duplicates? Negatives? Null?
- Is there always exactly one answer?
- What should I return — indices, values, count?
- Are elements sorted?

**Say it back:** *"So I'm given an array of integers and a target, and I need to return the indices of two numbers that add up to the target. There's always exactly one solution, and I can't use the same element twice. Did I get that right?"*

---

## Step 2 — State the Brute Force

Always do this. Even if you immediately know the optimal solution.

**Why:** It shows you understand the problem. It gives you a baseline complexity to beat. It buys you time to think.

*"The naive approach is two nested loops — try every pair. That's O(n²) time, O(1) space. I can do better."*

---

## Step 3 — Spot the Pattern

Ask these questions in order:

```
Is the input sorted?           → Binary search or two pointers
Need a subarray/substring?     → Sliding window
Need pair/complement lookup?   → HashMap (O(1) lookup)
Tree or graph traversal?       → BFS (shortest) or DFS (explore all)
Generating all combinations?   → Backtracking
Optimal substructure?          → Dynamic programming
Need kth largest/smallest?     → Heap (priority queue)
Ranges/intervals overlapping?  → Sort + merge
Linked list cycle/middle?      → Fast & slow pointer
Next greater/smaller element?  → Monotonic stack
Cumulative range queries?      → Prefix sum
```

---

## Step 4 — Write Clean Code

Rules while coding:
- **Name variables clearly.** `left`, `right`, `complement` — not `l`, `r`, `c`.
- **No clever one-liners.** Write it like a junior will maintain it.
- **Comment your intent** on non-obvious lines.
- **Write the brute force first** if you're stuck. Optimization can come after.

---

## Step 5 — Test & Trace

Never say "I think this works." Always:

1. Trace through the given example by hand
2. Test these edge cases:
   - Empty input (`[]`)
   - Single element (`[5]`)
   - All same elements (`[3,3,3]`)
   - Minimum/maximum values
   - Negative numbers (if applicable)

---

## Complexity Cheat Sheet

Know this cold. If you can't state the Big O, you can't defend your solution.

| Complexity | What it means | Typical algorithm |
|------------|--------------|-------------------|
| `O(1)` | Constant — doesn't grow | HashMap lookup, array index |
| `O(log n)` | Halving each step | Binary search, balanced BST |
| `O(n)` | Single pass | Two pointers, sliding window, BFS/DFS |
| `O(n log n)` | Sort-based | Merge sort, most sorting problems |
| `O(n²)` | Nested loops | Brute force pair-checking |
| `O(2ⁿ)` | Doubling per step | Backtracking subsets |
| `O(n!)` | All arrangements | Permutations |

---

## The "Acceptable" Complexities by Input Size

| Input size `n` | Max acceptable complexity |
|----------------|--------------------------|
| `n ≤ 10` | O(n!) or O(2ⁿ) fine |
| `n ≤ 20` | O(2ⁿ) fine |
| `n ≤ 100` | O(n³) fine |
| `n ≤ 1,000` | O(n²) fine |
| `n ≤ 100,000` | O(n log n) required |
| `n ≤ 1,000,000` | O(n) or O(n log n) required |

---

## What to Say When Stuck

Don't go silent. Narrate your thinking:

1. *"Let me think about what information I need at each step..."*
2. *"If I had a data structure that could tell me X in O(1)..."*
3. *"What if I processed from both ends simultaneously?"*
4. *"Can I precompute something to make each lookup faster?"*
5. *"This feels like it might have overlapping subproblems — maybe DP?"*

Silence kills interviews. Narration saves them.
