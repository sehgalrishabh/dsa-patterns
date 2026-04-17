# 🌊 BFS — Breadth-First Search

## When to Use

::: tip Recognition signals
- "**Shortest path**" or "fewest steps" in an unweighted graph
- "**Level by level**" tree traversal
- "Spreading" problems — fire spreading, infection, rotten oranges
- Finding nodes **closest to source** first
- Any problem where you need to process nodes by distance from start
:::

---

## Complexity

| | Value |
|--|-------|
| **Time** | O(V + E) — visits every vertex and edge once |
| **Space** | O(V) — queue can hold all vertices in worst case |

---

## The Template

::: code-group

```js [JavaScript]
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  let level = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;  // process one level at a time

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // Process node here
      if (node === target) return level;

      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    level++;
  }

  return -1;  // target not reachable
}
```

```java [Java]
int bfs(Map<Integer, List<Integer>> graph, int start, int target) {
    Queue<Integer> queue = new LinkedList<>();
    Set<Integer> visited = new HashSet<>();

    queue.offer(start);
    visited.add(start);
    int level = 0;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();  // process one level at a time

        for (int i = 0; i < levelSize; i++) {
            int node = queue.poll();

            if (node == target) return level;

            for (int neighbor : graph.get(node)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }

        level++;
    }

    return -1;
}
```

:::

---

## Problem 1 — Number of Islands ⭐

**Prompt:** Given a 2D grid of `'1'` (land) and `'0'` (water), count the number of islands.

### Step-by-step

**Step 1 — Understand:**
- An island is surrounded by water, formed by connecting adjacent (`4-directional`) land cells
- Islands count as separate even if diagonal

**Step 2 — Brute force:** For each cell, scan all connected cells — this IS the algorithm, but done efficiently via BFS.

**Step 3 — Pattern:** For each unvisited land cell, do BFS to "sink" the entire island, incrementing the count. Each BFS call = one island.

::: code-group

```js [JavaScript]
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  function bfs(r, c) {
    const queue = [[r, c]];
    grid[r][c] = '0';  // mark visited by sinking land

    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

    while (queue.length > 0) {
      const [row, col] = queue.shift();

      for (const [dr, dc] of dirs) {
        const nr = row + dr;
        const nc = col + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
          grid[nr][nc] = '0';
          queue.push([nr, nc]);
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        bfs(r, c);  // sink this entire island
      }
    }
  }

  return islands;
}
```

```java [Java]
public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) return 0;

    int rows = grid.length, cols = grid[0].length;
    int islands = 0;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                islands++;

                // BFS to sink the island
                Queue<int[]> queue = new LinkedList<>();
                queue.offer(new int[]{r, c});
                grid[r][c] = '0';

                while (!queue.isEmpty()) {
                    int[] cell = queue.poll();

                    for (int[] dir : dirs) {
                        int nr = cell[0] + dir[0];
                        int nc = cell[1] + dir[1];

                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                                && grid[nr][nc] == '1') {
                            grid[nr][nc] = '0';
                            queue.offer(new int[]{nr, nc});
                        }
                    }
                }
            }
        }
    }

    return islands;
}
```

:::

---

## Problem 2 — Binary Tree Level Order Traversal

::: code-group

```js [JavaScript]
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

```java [Java]
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        result.add(level);
    }

    return result;
}
```

:::

---

## Problem 3 — Word Ladder (Shortest Transformation)

**Prompt:** Find the shortest path from `beginWord` to `endWord` changing one letter at a time, using only words from `wordList`.

::: code-group

```js [JavaScript]
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];  // [word, steps]
  const visited = new Set([beginWord]);

  while (queue.length > 0) {
    const [word, steps] = queue.shift();

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {  // 'a' to 'z'
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

        if (newWord === endWord) return steps + 1;

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, steps + 1]);
        }
      }
    }
  }

  return 0;
}
```

```java [Java]
public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord)) return 0;

    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int steps = 1;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();

        for (int i = 0; i < levelSize; i++) {
            String word = queue.poll();
            char[] chars = word.toCharArray();

            for (int j = 0; j < chars.length; j++) {
                char original = chars[j];

                for (char c = 'a'; c <= 'z'; c++) {
                    chars[j] = c;
                    String newWord = new String(chars);

                    if (newWord.equals(endWord)) return steps + 1;

                    if (wordSet.contains(newWord)) {
                        wordSet.remove(newWord);  // mark visited
                        queue.offer(newWord);
                    }
                }

                chars[j] = original;  // restore
            }
        }

        steps++;
    }

    return 0;
}
```

:::
