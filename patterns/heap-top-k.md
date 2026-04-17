# ⛰️ Heap / Top-K

## When to Use

::: tip Recognition signals
- "**Kth largest / smallest**" element
- "**Top K** frequent elements"
- "**Median** of a data stream"
- "**Merge K** sorted lists/arrays"
- You need fast access to the **minimum or maximum** of a changing set
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(n log k) — insert n elements, heap size stays k |
| **Space** | O(k) — heap stores k elements |

---

## Heap Basics

::: code-group

```js [JavaScript]
// JavaScript has NO built-in heap/priority queue.
// In interviews, implement a min-heap or use a sorted structure.

// MinHeap class (interview-ready implementation)
class MinHeap {
  constructor() { this.heap = []; }

  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return min;
  }

  peek() { return this.heap[0]; }
  size() { return this.heap.length; }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] > this.heap[i]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }

  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}
```

```java [Java]
// Java has PriorityQueue built in — min-heap by default.

// Min-heap (smallest on top)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// Max-heap (largest on top)
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
// or: new PriorityQueue<>((a, b) -> b - a);

// Custom comparator (e.g., sort int[] by second element)
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);

// Key operations:
pq.offer(val);      // insert — O(log n)
pq.poll();          // remove and return top — O(log n)
pq.peek();          // peek top — O(1)
pq.size();
```

:::

---

## Problem 1 — Kth Largest Element ⭐

**Prompt:** Find the kth largest element in an unsorted array.

**Approach:** Maintain a min-heap of size `k`. The top of the heap is always the kth largest.

::: code-group

```js [JavaScript]
function findKthLargest(nums, k) {
  const heap = new MinHeap();

  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) {
      heap.pop();  // remove the smallest — keep only k largest
    }
  }

  return heap.peek();  // smallest of the k largest = kth largest
}
```

```java [Java]
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll();  // remove smallest, keep k largest
        }
    }

    return minHeap.peek();  // kth largest
}
```

:::

**Why min-heap?** We keep only the k largest elements. The min-heap's top is the smallest of those k elements — which is exactly the kth largest overall.

---

## Problem 2 — Top K Frequent Elements

::: code-group

```js [JavaScript]
function topKFrequent(nums, k) {
  // Count frequencies
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  // Min-heap by frequency — keep top k
  const heap = new MinHeap();  // stores [frequency, value]
  // (simplified: use array-based approach for interview)

  // Bucket sort approach — O(n) alternative
  const buckets = new Array(nums.length + 1).fill(null).map(() => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}
```

```java [Java]
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int n : nums) freq.merge(n, 1, Integer::sum);

    // Min-heap by frequency
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);

    for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
        pq.offer(new int[]{entry.getKey(), entry.getValue()});
        if (pq.size() > k) pq.poll();  // remove least frequent
    }

    int[] result = new int[k];
    for (int i = k - 1; i >= 0; i--) {
        result[i] = pq.poll()[0];
    }

    return result;
}
```

:::

---

## Problem 3 — K Closest Points to Origin

::: code-group

```js [JavaScript]
function kClosest(points, k) {
  // Max-heap — keep k closest. If farther than current max, discard.
  // Use negative distance to simulate max-heap with min-heap
  const heap = new MinHeap(); // stores [-distance, x, y]

  for (const [x, y] of points) {
    const dist = x * x + y * y;  // no sqrt needed for comparison
    heap.push(dist);              // simplified: adapt MinHeap for this
    if (heap.size() > k) heap.pop();
  }

  // Return the k points in heap
  return points
    .map(([x, y]) => ({ dist: x * x + y * y, point: [x, y] }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k)
    .map(item => item.point);
}
```

```java [Java]
public int[][] kClosest(int[][] points, int k) {
    // Max-heap by distance — evict farthest when size > k
    PriorityQueue<int[]> pq = new PriorityQueue<>(
        (a, b) -> (b[0]*b[0]+b[1]*b[1]) - (a[0]*a[0]+a[1]*a[1])
    );

    for (int[] point : points) {
        pq.offer(point);
        if (pq.size() > k) pq.poll();  // remove farthest
    }

    int[][] result = new int[k][2];
    for (int i = 0; i < k; i++) result[i] = pq.poll();
    return result;
}
```

:::
