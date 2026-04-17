# 🔀 Merge Intervals

## When to Use

::: tip Recognition signals
- "**Merge overlapping** intervals"
- "**Meeting rooms**" — can one person attend all, or minimum rooms needed?
- "**Non-overlapping** intervals" — remove minimum to make non-overlapping
- "**Insert** an interval into sorted list"
- Any problem involving **ranges, schedules, time slots**
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(n) — output array |

---

## The Template

::: code-group

```js [JavaScript]
function mergeIntervals(intervals) {
  // Step 1: Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      // Overlapping — extend the end if needed
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap — add as new interval
      result.push(current);
    }
  }

  return result;
}
```

```java [Java]
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

    List<int[]> result = new ArrayList<>();
    result.add(intervals[0]);

    for (int i = 1; i < intervals.length; i++) {
        int[] current = intervals[i];
        int[] last = result.get(result.size() - 1);

        if (current[0] <= last[1]) {
            // Overlapping — merge
            last[1] = Math.max(last[1], current[1]);
        } else {
            result.add(current);
        }
    }

    return result.toArray(new int[0][]);
}
```

:::

---

## Problem 1 — Merge Intervals ⭐

**Trace:**
```
intervals = [[1,3],[2,6],[8,10],[15,18]]

After sort: [[1,3],[2,6],[8,10],[15,18]]

result = [[1,3]]
[2,6]: 2<=3 → overlap → merge to [1,6].  result=[[1,6]]
[8,10]: 8>6 → no overlap → add.          result=[[1,6],[8,10]]
[15,18]: 15>10 → no overlap → add.       result=[[1,6],[8,10],[15,18]] ✓
```

---

## Problem 2 — Meeting Rooms II (Minimum Rooms)

**Prompt:** Given meeting time intervals, find the minimum number of conference rooms required.

**Strategy:** Track end times with a min-heap. For each new meeting, if the earliest-ending meeting is already done, reuse that room. Otherwise, add a new room.

::: code-group

```js [JavaScript]
function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Min-heap of end times (simulated with sorted array for interview)
  const endTimes = [];  // In real code: use MinHeap

  for (const [start, end] of intervals) {
    // Check if earliest ending room is free
    const earliest = endTimes[0];

    if (earliest !== undefined && earliest <= start) {
      // Reuse the room — update its end time
      endTimes.shift();
    }
    // else: new room needed (don't shift)

    endTimes.push(end);
    endTimes.sort((a, b) => a - b);  // keep sorted (use heap in practice)
  }

  return endTimes.length;  // number of rooms in use
}

// Cleaner approach: split starts and ends
function minMeetingRoomsClean(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

  let rooms = 0;
  let endPtr = 0;

  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endPtr]) {
      rooms++;        // need new room
    } else {
      endPtr++;       // meeting ended, reuse room
    }
  }

  return rooms;
}
```

```java [Java]
public int minMeetingRooms(int[][] intervals) {
    if (intervals.length == 0) return 0;

    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

    PriorityQueue<Integer> endTimes = new PriorityQueue<>();

    for (int[] interval : intervals) {
        // If earliest ending room is free, reuse it
        if (!endTimes.isEmpty() && endTimes.peek() <= interval[0]) {
            endTimes.poll();
        }
        endTimes.offer(interval[1]);
    }

    return endTimes.size();
}
```

:::

---

## Problem 3 — Insert Interval

**Prompt:** Insert a new interval into a sorted, non-overlapping list.

::: code-group

```js [JavaScript]
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  // Add all intervals that end before new interval starts
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i++]);
  }

  // Merge all overlapping intervals with newInterval
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // Add remaining intervals
  while (i < n) {
    result.push(intervals[i++]);
  }

  return result;
}
```

```java [Java]
public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0, n = intervals.length;

    // Before overlap
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i++]);
    }

    // Merge overlapping
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);

    // After overlap
    while (i < n) result.add(intervals[i++]);

    return result.toArray(new int[0][]);
}
```

:::
