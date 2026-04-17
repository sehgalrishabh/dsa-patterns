# 🌲 DFS & Backtracking

## When to Use

::: tip Recognition signals
- "Find **all** combinations / permutations / subsets"
- "Generate all valid..." (parentheses, phone letter combos)
- Tree/graph problems where you need to **explore all paths**
- Constraint satisfaction (N-Queens, Sudoku)
- The answer is not one optimal value, but a **collection of solutions**
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(2ⁿ) for subsets, O(n!) for permutations |
| **Space** | O(n) for the recursion call stack |

---

## The Template — Backtracking

The golden rule: **Choose → Explore → Unchoose**

::: code-group

```js [JavaScript]
function backtrack(result, current, start, ...otherParams) {
  // Base case: when to add current to result
  if (isComplete(current)) {
    result.push([...current]);  // copy! not reference
    return;
  }

  for (let i = start; i < choices.length; i++) {
    // Skip invalid choices (pruning)
    if (isInvalid(choices[i])) continue;

    // 1. CHOOSE
    current.push(choices[i]);

    // 2. EXPLORE
    backtrack(result, current, i + 1, ...otherParams);

    // 3. UNCHOOSE (backtrack)
    current.pop();
  }
}
```

```java [Java]
void backtrack(List<List<Integer>> result, List<Integer> current,
               int start, int[] choices) {
    // Base case
    if (isComplete(current)) {
        result.add(new ArrayList<>(current));  // copy!
        return;
    }

    for (int i = start; i < choices.length; i++) {
        // Pruning
        if (isInvalid(choices[i])) continue;

        // 1. CHOOSE
        current.add(choices[i]);

        // 2. EXPLORE
        backtrack(result, current, i + 1, choices);

        // 3. UNCHOOSE
        current.remove(current.size() - 1);
    }
}
```

:::

---

## Problem 1 — Subsets ⭐

**Prompt:** Given an array of unique integers, return all possible subsets.

`[1,2,3]` → `[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]`

### Step-by-step

**Step 3 — Pattern:** At each element, we have two choices: include or exclude. This forms a binary decision tree. Use backtracking — at each step, include the element, recurse, then exclude it (pop).

::: code-group

```js [JavaScript]
function subsets(nums) {
  const result = [];

  function backtrack(start, current) {
    result.push([...current]);  // add current subset (including empty)

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);        // choose
      backtrack(i + 1, current);   // explore (i+1 avoids re-use)
      current.pop();               // unchoose
    }
  }

  backtrack(0, []);
  return result;
}
```

```java [Java]
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start,
                       List<Integer> current,
                       List<List<Integer>> result) {
    result.add(new ArrayList<>(current));  // add current subset

    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);              // choose
        backtrack(nums, i + 1, current, result);  // explore
        current.remove(current.size() - 1);       // unchoose
    }
}
```

:::

**Trace:**
```
backtrack(0, [])
  add []
  i=0: choose 1 → backtrack(1, [1])
    add [1]
    i=1: choose 2 → backtrack(2, [1,2])
      add [1,2]
      i=2: choose 3 → backtrack(3, [1,2,3])
        add [1,2,3]
      unchoose 3
    unchoose 2
    i=2: choose 3 → backtrack(3, [1,3])
      add [1,3]
    unchoose 3
  unchoose 1
  i=1: choose 2 → ...
```

---

## Problem 2 — Permutations

::: code-group

```js [JavaScript]
function permute(nums) {
  const result = [];

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (const num of nums) {
      if (current.includes(num)) continue;  // skip used

      current.push(num);
      backtrack(current);
      current.pop();
    }
  }

  backtrack([]);
  return result;
}

// Optimized — swap in place, no includes() check
function permuteSwap(nums) {
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];  // swap
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];  // swap back
    }
  }

  backtrack(0);
  return result;
}
```

```java [Java]
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, result);
    return result;
}

private void backtrack(int[] nums, int start, List<List<Integer>> result) {
    if (start == nums.length) {
        List<Integer> perm = new ArrayList<>();
        for (int n : nums) perm.add(n);
        result.add(perm);
        return;
    }

    for (int i = start; i < nums.length; i++) {
        swap(nums, start, i);
        backtrack(nums, start + 1, result);
        swap(nums, start, i);  // backtrack
    }
}

private void swap(int[] nums, int i, int j) {
    int tmp = nums[i]; nums[i] = nums[j]; nums[j] = tmp;
}
```

:::

---

## Problem 3 — Generate Parentheses

**Prompt:** Generate all combinations of `n` pairs of valid parentheses.

::: code-group

```js [JavaScript]
function generateParenthesis(n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    // Can add open if we haven't used all n
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }

    // Can add close only if it won't exceed open count
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}
```

```java [Java]
public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(result, new StringBuilder(), 0, 0, n);
    return result;
}

private void backtrack(List<String> result, StringBuilder current,
                       int open, int close, int n) {
    if (current.length() == 2 * n) {
        result.add(current.toString());
        return;
    }

    if (open < n) {
        current.append('(');
        backtrack(result, current, open + 1, close, n);
        current.deleteCharAt(current.length() - 1);
    }

    if (close < open) {
        current.append(')');
        backtrack(result, current, open, close + 1, n);
        current.deleteCharAt(current.length() - 1);
    }
}
```

:::
