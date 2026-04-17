# 🗂️ HashMap & HashSet

## When to Use

::: tip Recognition signals
- "Find **pair** with sum/difference equal to target"
- "**Count frequency** of elements"
- "Check for **duplicates**"
- "**Group** elements by some property"
- You're doing O(n) lookup inside a loop — the loop goes O(n²), HashMap makes it O(n)
- Anagram problems, complement-finding, "seen before"
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(n) — single pass with O(1) per lookup |
| **Space** | O(n) — storing up to n entries |

---

## Core Operations

::: code-group

```js [JavaScript]
// Map (key-value)
const map = new Map();
map.set('key', value);
map.get('key');           // undefined if missing
map.has('key');           // boolean
map.delete('key');
map.size;

// Frequency counting
const freq = {};
for (const x of arr) {
  freq[x] = (freq[x] || 0) + 1;
}

// Set (unique values)
const set = new Set();
set.add(value);
set.has(value);           // O(1)
set.delete(value);
```

```java [Java]
// HashMap
Map<String, Integer> map = new HashMap<>();
map.put("key", value);
map.get("key");                      // null if missing
map.getOrDefault("key", 0);         // safe get
map.containsKey("key");
map.remove("key");

// Frequency counting
Map<Integer, Integer> freq = new HashMap<>();
for (int x : arr) {
    freq.merge(x, 1, Integer::sum);  // elegant frequency update
}

// HashSet
Set<Integer> set = new HashSet<>();
set.add(value);
set.contains(value);                 // O(1)
set.remove(value);
```

:::

---

## Problem 1 — Two Sum ⭐

**Prompt:** Find two indices that add to target.

::: code-group

```js [JavaScript]
function twoSum(nums, target) {
  const seen = new Map();  // value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(nums[i], i);
  }
}
```

```java [Java]
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];

        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }

        seen.put(nums[i], i);
    }

    return new int[]{};
}
```

:::

**Template the insight:** For each element `x`, ask *"have I seen `target - x` before?"* Instead of searching, store what you've seen. O(n²) → O(n).

---

## Problem 2 — Group Anagrams

**Prompt:** Group strings that are anagrams of each other.

::: code-group

```js [JavaScript]
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // Sorted string as canonical key for all anagrams
    const key = str.split('').sort().join('');

    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return [...map.values()];
}
```

```java [Java]
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();

    for (String str : strs) {
        char[] chars = str.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);  // sorted = canonical key

        map.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
    }

    return new ArrayList<>(map.values());
}
```

:::

---

## Problem 3 — Longest Consecutive Sequence

**Prompt:** Find the length of the longest consecutive elements sequence. O(n) required.

::: code-group

```js [JavaScript]
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (const num of numSet) {
    // Only start counting from the beginning of a sequence
    if (!numSet.has(num - 1)) {
      let current = num;
      let length = 1;

      while (numSet.has(current + 1)) {
        current++;
        length++;
      }

      longest = Math.max(longest, length);
    }
  }

  return longest;
}
```

```java [Java]
public int longestConsecutive(int[] nums) {
    Set<Integer> numSet = new HashSet<>();
    for (int n : nums) numSet.add(n);

    int longest = 0;

    for (int num : numSet) {
        // Only start from sequence beginnings
        if (!numSet.contains(num - 1)) {
            int current = num;
            int length = 1;

            while (numSet.contains(current + 1)) {
                current++;
                length++;
            }

            longest = Math.max(longest, length);
        }
    }

    return longest;
}
```

:::

**Key insight:** Only start counting from a number that has no predecessor (`num - 1` not in set). This ensures each sequence is counted exactly once — O(n) total.

---

## Problem 4 — Subarray Sum Equals K (also see Prefix Sum pattern)

::: code-group

```js [JavaScript]
function subarraySum(nums, k) {
  const prefixCounts = new Map([[0, 1]]);  // prefix 0 seen once
  let count = 0;
  let runningSum = 0;

  for (const num of nums) {
    runningSum += num;
    // If (runningSum - k) was seen before, there's a subarray summing to k
    count += prefixCounts.get(runningSum - k) || 0;
    prefixCounts.set(runningSum, (prefixCounts.get(runningSum) || 0) + 1);
  }

  return count;
}
```

```java [Java]
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCounts = new HashMap<>();
    prefixCounts.put(0, 1);  // empty prefix
    int count = 0, runningSum = 0;

    for (int num : nums) {
        runningSum += num;
        count += prefixCounts.getOrDefault(runningSum - k, 0);
        prefixCounts.merge(runningSum, 1, Integer::sum);
    }

    return count;
}
```

:::
