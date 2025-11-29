---
author: Shravan Goswami
pubDatetime: 2024-10-12T10:32:19Z
title: "A. Line Trip (CF1901 800 RATED)"
slug: 1901-A-Line-Trip
tags: [CPP, Codeforces, CF800, CP31]
description: "A. Line Trip, 800 RATED - Educational Codeforces Round 158 (Rated for Div. 2)"
aliases:
  - /posts/1901-A-Line-Trip
---

<p class="hidden">Problem A 1901</p>

Problem Link: [A. Line Trip, 800 RATED - Educational Codeforces Round 158 (Rated for Div. 2)](https://codeforces.com/problemset/problem/1901/A)

## Approach

1. Calculate the maximum distances from $0$ to the first gas station, between consecutive gas stations, and from the last gas station to $x$ (doubled for the return trip).
2. The minimum gas tank volume is the maximum of these distances.

## Code Implementation

```cpp
#include <bits/stdc++.h>
#define int long long
#define endl '\n'
using namespace std;

signed main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t;
    cin >> t;

    while (t--) {
        int n, x;
        cin >> n >> x;
        vector<int> s(n);
        for (int i = 0; i < n; ++i) {
            cin >> s[i];
        }

        int d = 0;
        d = max(d, s[0]);

        for (int j = 1; j < n; ++j) {
            d = max(d, s[j] - s[j - 1]);
        }

        d = max(d, 2 * (x - s[n - 1]));
        cout << d << endl;
    }

    return 0;
}
```
