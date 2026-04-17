# ➕ Prefix Sum

## When to Use

::: tip Recognition signals
- "**Range sum** query" — sum from index `i` to `j`
- "**Subarray sum** equals k" — count subarrays with a specific sum
- Pre-computing cumulative totals to answer queries in O(1)
- Multiple queries on the same array
:::

---

## Complexity

| | Value |
|--|-------|
| **Build time** | O(n) |
| **Query time** | O(1) per query after build |
| **Space** | O(n) |

---

## The Template

::: code-group

```js [JavaScript]
// Build prefix sum
function buildPrefix(nums) {
  const prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }
  return prefix;
}

// Query: sum from index l to r (inclusive, 0-indexed)
function rangeSum(prefix, l, r) {
  return prefix[r + 1] - prefix[l];
}
```

```java [Java]
int[] buildPrefix(int[] nums) {
    int[] prefix = new int[nums.length + 1];
    for (int i = 0; i < nums.length; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    return prefix;
}

int rangeSum(int[] prefix, int l, int r) {
    return prefix[r + 1] - prefix[l];
}
```

:::

---

## Problem 1 — Subarray Sum Equals K ⭐

::: code-group

```js [JavaScript]
function subarraySum(nums, k) {
  // Map: prefixSum → how many times seen
  const map = new Map([[0, 1]]);
  let count = 0;
  let prefixSum = 0;

  for (const num of nums) {
    prefixSum += num;
    // sum(l..r) = prefix[r] - prefix[l-1] = k
    // so we need prefix[l-1] = prefixSum - k
    count += map.get(prefixSum - k) || 0;
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }

  return count;
}
```

```java [Java]
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> map = new HashMap<>();
    map.put(0, 1);
    int count = 0, prefixSum = 0;

    for (int num : nums) {
        prefixSum += num;
        count += map.getOrDefault(prefixSum - k, 0);
        map.merge(prefixSum, 1, Integer::sum);
    }

    return count;
}
```

:::

## Problem 2 — Product of Array Except Self

::: code-group

```js [JavaScript]
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Left pass: result[i] = product of all nums to the left
  let left = 1;
  for (let i = 0; i < n; i++) {
    result[i] = left;
    left *= nums[i];
  }

  // Right pass: multiply by product of all nums to the right
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }

  return result;
}
```

```java [Java]
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];

    // Left prefix products
    int left = 1;
    for (int i = 0; i < n; i++) {
        result[i] = left;
        left *= nums[i];
    }

    // Multiply by right suffix products
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= right;
        right *= nums[i];
    }

    return result;
}
```

:::
