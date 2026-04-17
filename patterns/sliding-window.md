# 🪟 Sliding Window

## When to Use

::: tip Recognition signals
- "Longest/shortest **subarray** or **substring**"
- "Find contiguous elements satisfying a condition"
- "Maximum sum of subarray of size k"
- Input is an array or string, result is a range/window
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(n) — each element enters and exits the window once |
| **Space** | O(k) — where k is the window size or alphabet size |

---

## Two Flavors

### Fixed-size window
Window size is given (`k`). Slide it across, maintain a running aggregate.

### Variable-size window
Expand the right pointer freely. Shrink the left pointer when the window becomes invalid.

---

## The Templates

::: code-group

```js [JavaScript]
// Fixed size window
function fixedWindow(arr, k) {
  let windowSum = 0;
  let maxSum = 0;

  // Build initial window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide: add right element, remove left element
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Variable size window
function variableWindow(arr) {
  let left = 0;
  let result = 0;
  // state tracks what's inside the window (map, set, count, etc.)

  for (let right = 0; right < arr.length; right++) {
    // Expand: add arr[right] to window state

    // Shrink: while window is invalid, remove arr[left]
    while (windowIsInvalid()) {
      // remove arr[left] from state
      left++;
    }

    // Window is valid — update result
    result = Math.max(result, right - left + 1);
  }

  return result;
}
```

```java [Java]
// Fixed size window
int fixedWindow(int[] arr, int k) {
    int windowSum = 0;
    int maxSum = 0;

    // Build initial window
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;

    // Slide: add right, remove left
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

// Variable size window
int variableWindow(int[] arr) {
    int left = 0;
    int result = 0;
    // state: Map, Set, counter, etc.

    for (int right = 0; right < arr.length; right++) {
        // Expand: add arr[right] to window state

        // Shrink: while invalid
        while (windowIsInvalid()) {
            // remove arr[left] from state
            left++;
        }

        // Valid window — update result
        result = Math.max(result, right - left + 1);
    }

    return result;
}
```

:::

---

## Problem 1 — Longest Substring Without Repeating Characters ⭐

**Prompt:** Given a string `s`, find the length of the longest substring without repeating characters.

### Step-by-step

**Step 1 — Understand:**
- "substring" → contiguous → sliding window
- "without repeating" → window becomes invalid when a char appears twice

**Step 2 — Brute force:** Every start/end pair — O(n²).

**Step 3 — Pattern:** Variable-size window. Use a `Set` to track chars in the current window. When we see a duplicate, shrink from the left until the duplicate is removed.

::: code-group

```js [JavaScript]
function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink until no duplicate
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

```java [Java]
public int lengthOfLongestSubstring(String s) {
    Set<Character> charSet = new HashSet<>();
    int left = 0;
    int maxLength = 0;

    for (int right = 0; right < s.length(); right++) {
        // Shrink until no duplicate
        while (charSet.contains(s.charAt(right))) {
            charSet.remove(s.charAt(left));
            left++;
        }

        charSet.add(s.charAt(right));
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

:::

**Step 5 — Trace:**
```
s = "abcabcbb"

right=0 (a): set={a}, window="a", len=1
right=1 (b): set={a,b}, window="ab", len=2
right=2 (c): set={a,b,c}, window="abc", len=3
right=3 (a): 'a' in set! Shrink:
  remove s[0]='a', left=1. set={b,c}
  add 'a'. set={b,c,a}, window="bca", len=3
right=4 (b): 'b' in set! Shrink:
  remove s[1]='b', left=2. set={c,a}
  add 'b'. set={c,a,b}, window="cab", len=3
...
Result: 3 ✓
```

---

## Problem 2 — Minimum Window Substring

**Prompt:** Find the minimum window in `s` that contains all characters of `t`.

::: code-group

```js [JavaScript]
function minWindow(s, t) {
  if (!s || !t || s.length < t.length) return '';

  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;

  let left = 0;
  let formed = 0;              // how many unique chars satisfied
  const required = Object.keys(need).length;
  const window = {};
  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;

    if (need[c] && window[c] === need[c]) formed++;

    // Shrink while window is valid (all chars satisfied)
    while (formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const leftChar = s[left];
      window[leftChar]--;
      if (need[leftChar] && window[leftChar] < need[leftChar]) formed--;
      left++;
    }
  }

  return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
}
```

```java [Java]
public String minWindow(String s, String t) {
    if (s == null || t == null || s.length() < t.length()) return "";

    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);

    int left = 0, formed = 0;
    int required = need.size();
    Map<Character, Integer> window = new HashMap<>();
    int minLen = Integer.MAX_VALUE, minStart = 0;

    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        window.merge(c, 1, Integer::sum);

        if (need.containsKey(c) && window.get(c).equals(need.get(c))) formed++;

        while (formed == required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            char lc = s.charAt(left++);
            window.merge(lc, -1, Integer::sum);
            if (need.containsKey(lc) && window.get(lc) < need.get(lc)) formed--;
        }
    }

    return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
}
```

:::

::: warning Complexity
Time: O(|s| + |t|)  
Space: O(|s| + |t|) for the maps
:::

---

## Problem 3 — Max Sum Subarray of Size K (Fixed Window)

::: code-group

```js [JavaScript]
function maxSumSubarray(arr, k) {
  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];  // slide: add right, drop left
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

```java [Java]
public int maxSumSubarray(int[] arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    int maxSum = windowSum;

    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];  // slide
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}
```

:::
