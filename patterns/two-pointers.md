# 👉 Two Pointers

## When to Use

::: tip Recognition signals
- Input array or string is **sorted** (or can be sorted)
- Need to find a **pair** that satisfies a condition
- Need to **partition** or work from both ends
- Problem says "in-place", "no extra space"
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(n) — single pass with two pointers |
| **Space** | O(1) — no extra data structures |

---

## The Template

::: code-group

```js [JavaScript]
function twoPointers(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const current = someCondition(arr[left], arr[right]);

    if (current === target) {
      // found answer
    } else if (current < target) {
      left++;   // need larger value — move left forward
    } else {
      right--;  // need smaller value — move right back
    }
  }
}
```

```java [Java]
void twoPointers(int[] arr) {
    int left = 0;
    int right = arr.length - 1;

    while (left < right) {
        int current = someCondition(arr[left], arr[right]);

        if (current == target) {
            // found answer
        } else if (current < target) {
            left++;   // need larger value
        } else {
            right--;  // need smaller value
        }
    }
}
```

:::

---

## Problem 1 — Container With Most Water ⭐

**Prompt:** Given `n` vertical lines where `height[i]` is the height of line `i`, find two lines that form a container holding the most water.

### Step-by-step

**Step 1 — Understand:**
- Area = `min(height[left], height[right]) * (right - left)`
- We want to maximize this area
- Can't tilt the container

**Step 2 — Brute force:** Try all pairs — O(n²). Too slow.

**Step 3 — Pattern:** Start with the widest container (both ends). The width shrinks as we move inward. So we should only move inward when it might increase area — which means moving the **shorter** line inward.

**Why?** Moving the taller line inward can only decrease or maintain the height limit (still bounded by the shorter), while decreasing width. Net loss. Moving the shorter line gives a chance of finding a taller line that compensates.

**Step 4 — Code:**

::: code-group

```js [JavaScript]
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const water = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, water);

    // Move the shorter line inward — it's the bottleneck
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}
```

```java [Java]
public int maxArea(int[] height) {
    int left = 0;
    int right = height.length - 1;
    int maxWater = 0;

    while (left < right) {
        int water = Math.min(height[left], height[right]) * (right - left);
        maxWater = Math.max(maxWater, water);

        // Move the shorter line inward
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}
```

:::

**Step 5 — Trace:**
```
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]

left=0(1), right=8(7) → water = min(1,7)*8 = 8.  Move left (shorter)
left=1(8), right=8(7) → water = min(8,7)*7 = 49. Move right (shorter)
left=1(8), right=7(3) → water = min(8,3)*6 = 18. Move right
...
maxWater = 49 ✓
```

---

## Problem 2 — 3Sum

**Prompt:** Find all unique triplets in an array that sum to zero.

::: code-group

```js [JavaScript]
function threeSum(nums) {
  nums.sort((a, b) => a - b);  // must sort first
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // Skip duplicates for second and third element
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

```java [Java]
public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();

    for (int i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first element
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int left = i + 1;
        int right = nums.length - 1;

        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];

            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                // Skip duplicates
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}
```

:::

::: warning Complexity
Time: O(n²) — O(n log n) sort + O(n) per element  
Space: O(1) extra (output doesn't count)
:::

---

## Problem 3 — Valid Palindrome

::: code-group

```js [JavaScript]
function isPalindrome(s) {
  // Clean: only alphanumeric
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }

  return true;
}
```

```java [Java]
public boolean isPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;

    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
        // Skip non-alphanumeric from right
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;

        if (Character.toLowerCase(s.charAt(left)) !=
            Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}
```

:::
