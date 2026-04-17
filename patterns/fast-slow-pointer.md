# 🐢 Fast & Slow Pointer

## When to Use

::: tip Recognition signals
- **Linked list** problems (almost always applies)
- "Detect a **cycle**" in a linked list
- "Find the **middle**" of a linked list
- "Find start of cycle"
- "**Palindrome** linked list"
- "Kth element from end"
- Anything where two pointers moving at different speeds reveals structure
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(n) — both pointers traverse the list at most once |
| **Space** | O(1) — only two pointer variables |

---

## The Template

::: code-group

```js [JavaScript]
function fastSlowTemplate(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;        // moves 1 step
    fast = fast.next.next;   // moves 2 steps

    // Check condition (e.g., cycle detected)
    if (slow === fast) {
      // they met — cycle exists
    }
  }

  // When fast reaches end: slow is at the middle
  return slow;
}
```

```java [Java]
ListNode fastSlowTemplate(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;       // 1 step
        fast = fast.next.next;  // 2 steps

        if (slow == fast) {
            // cycle detected
        }
    }

    return slow;  // middle node when fast reaches end
}
```

:::

---

## Problem 1 — Detect Cycle in Linked List ⭐

**Why it works (Floyd's algorithm):** If there's a cycle, fast eventually laps slow inside the cycle — they must meet. If no cycle, fast reaches `null`.

::: code-group

```js [JavaScript]
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;  // met inside cycle
  }

  return false;  // fast reached end — no cycle
}

// Bonus: find cycle start
function detectCycle(head) {
  let slow = head;
  let fast = head;

  // Phase 1: detect cycle
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (fast === null || fast.next === null) return null;  // no cycle

  // Phase 2: find start — reset slow to head, keep fast at meeting point
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;  // both move 1 step now
  }

  return slow;  // cycle start
}
```

```java [Java]
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }

    return false;
}

// Find cycle start (Floyd's phase 2)
public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }

    if (fast == null || fast.next == null) return null;

    slow = head;
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}
```

:::

---

## Problem 2 — Middle of Linked List

::: code-group

```js [JavaScript]
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // When fast reaches end, slow is at middle
  // For even length: slow is the second middle
  return slow;
}
```

```java [Java]
public ListNode middleNode(ListNode head) {
    ListNode slow = head, fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}
```

:::

---

## Problem 3 — Palindrome Linked List

**Strategy:** Find middle → reverse second half → compare both halves.

::: code-group

```js [JavaScript]
function isPalindrome(head) {
  // Step 1: Find middle
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev = null;
  let curr = slow;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Step 3: Compare
  let left = head;
  let right = prev;  // head of reversed second half
  while (right !== null) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
}
```

```java [Java]
public boolean isPalindrome(ListNode head) {
    // Find middle
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse second half
    ListNode prev = null, curr = slow;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Compare halves
    ListNode left = head, right = prev;
    while (right != null) {
        if (left.val != right.val) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}
```

:::
