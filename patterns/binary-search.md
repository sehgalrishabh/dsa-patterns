# 🔍 Binary Search

## When to Use

::: tip Recognition signals
- Input is **sorted** (or the answer space is monotonic)
- "Find the position / minimum / maximum"
- "Search in rotated array"
- "Koko eating bananas", "capacity to ship" → answer space binary search
- Any problem where you can ask: *"Is the answer ≥ X?"* and the answer flips from yes to no at exactly one point
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(log n) — halves the search space each step |
| **Space** | O(1) |

---

## The Templates

There are two forms. Know both.

### Form 1 — Find exact value

::: code-group

```js [JavaScript]
function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);  // avoids overflow

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return -1;  // not found
}
```

```java [Java]
int binarySearch(int[] arr, int target) {
    int lo = 0;
    int hi = arr.length - 1;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;  // prevents integer overflow

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return -1;
}
```

:::

### Form 2 — Find leftmost boundary (lower bound)

Use when you want the *first position* where a condition becomes true.

::: code-group

```js [JavaScript]
function lowerBound(arr, target) {
  let lo = 0;
  let hi = arr.length;  // note: hi = length, not length-1

  while (lo < hi) {   // note: strict less than
    const mid = lo + Math.floor((hi - lo) / 2);

    if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid;  // don't add 1 — mid might be the answer
    }
  }

  return lo;  // insertion point
}
```

```java [Java]
int lowerBound(int[] arr, int target) {
    int lo = 0;
    int hi = arr.length;

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;

        if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    return lo;
}
```

:::

---

## Problem 1 — Search in Rotated Sorted Array ⭐

**Prompt:** A sorted array was rotated at some unknown pivot. Find target.

`[4,5,6,7,0,1,2]`, target = 0 → return 4

### Step-by-step

**Key insight:** After computing `mid`, one half is always sorted. Check which half is sorted, then decide which half the target lives in.

::: code-group

```js [JavaScript]
function search(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[lo] <= nums[mid]) {
      if (target >= nums[lo] && target < nums[mid]) {
        hi = mid - 1;  // target is in left half
      } else {
        lo = mid + 1;  // target is in right half
      }
    } else {
      // Right half is sorted
      if (target > nums[mid] && target <= nums[hi]) {
        lo = mid + 1;  // target is in right half
      } else {
        hi = mid - 1;  // target is in left half
      }
    }
  }

  return -1;
}
```

```java [Java]
public int search(int[] nums, int target) {
    int lo = 0;
    int hi = nums.length - 1;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;

        if (nums[mid] == target) return mid;

        // Left half is sorted
        if (nums[lo] <= nums[mid]) {
            if (target >= nums[lo] && target < nums[mid]) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > nums[mid] && target <= nums[hi]) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
    }

    return -1;
}
```

:::

---

## Problem 2 — Koko Eating Bananas (Answer Space Binary Search)

**Prompt:** Koko has piles of bananas and `h` hours. Find minimum eating speed `k` such that she finishes in `h` hours.

**Key insight:** Binary search on the *answer* (the speed), not the array. Speed ranges from 1 to max(piles). For each candidate speed, check if it works in O(n). Total: O(n log m).

::: code-group

```js [JavaScript]
function minEatingSpeed(piles, h) {
  let lo = 1;
  let hi = Math.max(...piles);

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (canFinish(piles, mid, h)) {
      hi = mid;  // mid works, try smaller
    } else {
      lo = mid + 1;  // mid too slow, try faster
    }
  }

  return lo;
}

function canFinish(piles, speed, h) {
  let hours = 0;
  for (const pile of piles) {
    hours += Math.ceil(pile / speed);
  }
  return hours <= h;
}
```

```java [Java]
public int minEatingSpeed(int[] piles, int h) {
    int lo = 1;
    int hi = Arrays.stream(piles).max().getAsInt();

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;

        if (canFinish(piles, mid, h)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }

    return lo;
}

private boolean canFinish(int[] piles, int speed, int h) {
    int hours = 0;
    for (int pile : piles) {
        hours += (pile + speed - 1) / speed;  // ceiling division
    }
    return hours <= h;
}
```

:::

---

## Problem 3 — Find Minimum in Rotated Sorted Array

::: code-group

```js [JavaScript]
function findMin(nums) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] > nums[hi]) {
      lo = mid + 1;  // min is in the right half
    } else {
      hi = mid;      // min is mid or in the left half
    }
  }

  return nums[lo];
}
```

```java [Java]
public int findMin(int[] nums) {
    int lo = 0;
    int hi = nums.length - 1;

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;

        if (nums[mid] > nums[hi]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    return nums[lo];
}
```

:::
