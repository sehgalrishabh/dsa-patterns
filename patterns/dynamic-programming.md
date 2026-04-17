# 🎯 Dynamic Programming

## When to Use

::: tip Recognition signals
- "**Maximum / minimum** value" OR "**how many ways**"
- You see **overlapping subproblems** — recursion re-computes the same thing
- Problem has **optimal substructure** — optimal answer built from optimal sub-answers
- Words: "longest", "shortest", "count ways", "minimum cost", "maximum profit"
- You find yourself writing recursive code with repeated state
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(n) 1D DP, O(n²) 2D DP — depends on state space |
| **Space** | O(n) or O(n²) — can often optimize to O(1) or O(n) |

---

## The Approach

DP has two styles. Use whichever you think in naturally:

| Style | How | When |
|-------|-----|------|
| **Top-down** (memoization) | Recursion + cache | Easier to reason, start here |
| **Bottom-up** (tabulation) | Iterative + dp array | More efficient, preferred in interviews |

### The 3-step DP framework

1. **Define** — what does `dp[i]` (or `dp[i][j]`) represent?
2. **Recurrence** — how does `dp[i]` relate to smaller subproblems?
3. **Base case** — what are the trivially known values?

---

## Problem 1 — Climbing Stairs ⭐ (1D DP)

**Prompt:** You can climb 1 or 2 steps at a time. How many distinct ways to reach step `n`?

### Step-by-step

**Step 1:** To reach step `i`, you came from step `i-1` (one step) or step `i-2` (two steps).

**Define:** `dp[i]` = number of ways to reach step `i`  
**Recurrence:** `dp[i] = dp[i-1] + dp[i-2]` (Fibonacci!)  
**Base case:** `dp[1] = 1`, `dp[2] = 2`

::: code-group

```js [JavaScript]
// Top-down (memoization)
function climbStairs(n) {
  const memo = new Map();

  function dp(i) {
    if (i <= 2) return i;
    if (memo.has(i)) return memo.get(i);

    const result = dp(i - 1) + dp(i - 2);
    memo.set(i, result);
    return result;
  }

  return dp(n);
}

// Bottom-up (iterative) — O(1) space
function climbStairsOptimal(n) {
  if (n <= 2) return n;

  let prev2 = 1;  // dp[i-2]
  let prev1 = 2;  // dp[i-1]

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

```java [Java]
// Top-down (memoization)
public int climbStairs(int n) {
    int[] memo = new int[n + 1];
    return dp(n, memo);
}

private int dp(int i, int[] memo) {
    if (i <= 2) return i;
    if (memo[i] != 0) return memo[i];
    memo[i] = dp(i - 1, memo) + dp(i - 2, memo);
    return memo[i];
}

// Bottom-up — O(1) space
public int climbStairsOptimal(int n) {
    if (n <= 2) return n;

    int prev2 = 1, prev1 = 2;

    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
```

:::

---

## Problem 2 — Coin Change ⭐ (Classic DP)

**Prompt:** Given coin denominations and an amount, find the minimum number of coins to make that amount.

**Define:** `dp[i]` = minimum coins to make amount `i`  
**Recurrence:** `dp[i] = min(dp[i - coin] + 1)` for each valid coin  
**Base case:** `dp[0] = 0`, `dp[i] = Infinity` initially

::: code-group

```js [JavaScript]
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;  // base case: 0 coins to make amount 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

```java [Java]
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);  // sentinel "infinity"
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}
```

:::

**Trace:** `coins=[1,5,6,9]`, `amount=11`
```
dp[0]=0
dp[1]=min(dp[0]+1)=1              (use coin 1)
dp[5]=min(dp[4]+1, dp[0]+1)=1    (use coin 5)
dp[6]=min(dp[5]+1, dp[0]+1)=1    (use coin 6)
dp[10]=min(dp[9]+1, dp[5]+1)=2   (use coin 5 twice, or 1+9)
dp[11]=min(dp[10]+1, dp[6]+1)=2  (6+5) ✓
```

---

## Problem 3 — Longest Common Subsequence (2D DP)

**Prompt:** Find the length of the longest common subsequence of two strings.

**Define:** `dp[i][j]` = LCS length of `text1[0..i-1]` and `text2[0..j-1]`  
**Recurrence:**
- If `text1[i-1] == text2[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1`
- Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

::: code-group

```js [JavaScript]
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  // dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;  // characters match
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);  // take best
      }
    }
  }

  return dp[m][n];
}
```

```java [Java]
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}
```

:::

---

## Problem 4 — House Robber

**Prompt:** Rob houses, can't rob two adjacent. Maximize total.

**Define:** `dp[i]` = max money robbing first `i` houses  
**Recurrence:** `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

::: code-group

```js [JavaScript]
function rob(nums) {
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

```java [Java]
public int rob(int[] nums) {
    int prev2 = 0, prev1 = 0;

    for (int num : nums) {
        int current = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
```

:::
