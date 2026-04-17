# 📚 Monotonic Stack

## When to Use

::: tip Recognition signals
- "**Next greater element**" / "next smaller element"
- "**Previous greater/smaller**" element
- "**Daily temperatures**" — how many days until warmer
- Histogram problems (largest rectangle)
- The answer for each element depends on the next/previous boundary element
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(n) — each element pushed and popped at most once |
| **Space** | O(n) — stack holds at most n elements |

---

## The Template

Maintain a stack that is always **monotonically increasing or decreasing**.  
When you find an element that violates the order → pop and process.

::: code-group

```js [JavaScript]
// Next Greater Element pattern
function nextGreater(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = [];  // stores indices, not values

  for (let i = 0; i < nums.length; i++) {
    // Pop elements smaller than current — current is their "next greater"
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }

  return result;  // remaining in stack have no next greater → stays -1
}
```

```java [Java]
int[] nextGreater(int[] nums) {
    int[] result = new int[nums.length];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();  // stores indices

    for (int i = 0; i < nums.length; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }

    return result;
}
```

:::

---

## Problem 1 — Daily Temperatures ⭐

**Prompt:** For each day, find how many days until a warmer temperature. Return `0` if no future warmer day.

`[73,74,75,71,69,72,76,73]` → `[1,1,4,2,1,1,0,0]`

::: code-group

```js [JavaScript]
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];  // monotonically decreasing stack of indices

  for (let i = 0; i < temperatures.length; i++) {
    // Current temp is warmer than top of stack
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const prevDay = stack.pop();
      result[prevDay] = i - prevDay;  // days until warmer
    }
    stack.push(i);
  }

  return result;
}
```

```java [Java]
public int[] dailyTemperatures(int[] temperatures) {
    int[] result = new int[temperatures.length];
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < temperatures.length; i++) {
        while (!stack.isEmpty() && temperatures[stack.peek()] < temperatures[i]) {
            int prevDay = stack.pop();
            result[prevDay] = i - prevDay;
        }
        stack.push(i);
    }

    return result;
}
```

:::

**Trace:**
```
temps = [73, 74, 75, 71, 69, 72, 76, 73]

i=0 (73): stack=[0]
i=1 (74): 74>73, pop 0 → result[0]=1-0=1. stack=[1]
i=2 (75): 75>74, pop 1 → result[1]=2-1=1. stack=[2]
i=3 (71): 71<75, push.  stack=[2,3]
i=4 (69): 69<71, push.  stack=[2,3,4]
i=5 (72): 72>69, pop 4→result[4]=1. 72>71, pop 3→result[3]=2. stack=[2,5]
i=6 (76): 76>72, pop 5→result[5]=1. 76>75, pop 2→result[2]=4. stack=[6]
i=7 (73): 73<76, push.  stack=[6,7]
Result: [1,1,4,2,1,1,0,0] ✓
```

---

## Problem 2 — Largest Rectangle in Histogram

::: code-group

```js [JavaScript]
function largestRectangleArea(heights) {
  const stack = [];  // monotonically increasing stack of indices
  let maxArea = 0;
  const n = heights.length;

  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];  // sentinel 0 at end flushes stack

    while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
}
```

```java [Java]
public int largestRectangleArea(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>();
    int maxArea = 0;
    int n = heights.length;

    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];  // sentinel

        while (!stack.isEmpty() && heights[stack.peek()] > h) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
}
```

:::
