---
author: Shravan Goswami
pubDatetime: 2024-10-12T15:59:19Z
title: 'A. Seats (AtCoder Beginner Contest 375)'
slug: abc375-A-Seats
tags: [CPP, AtCoder, AtCoder Beginner Contest]
description: 'A. Seats - Panasonic Programming Contest 2024 (AtCoder Beginner Contest 375)'
---

<p class="hidden">Problem A - abc375</p>

Problem Link: [A. Seats (AtCoder Beginner Contest 375)](https://atcoder.jp/contests/abc375/tasks/abc375_a)

## Approach
We just have to check the condition that seats $i$ and $i+2$ are occupied, and seat $i+1$ is unoccupied between $1$ to $n-2$ in string s.

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
    
    int n;
    string s;
    cin >> n;
    cin >> s;
    int ans=0;
    for (int i=0; i<=n-2; i++){
        ans+=s.substr(i,3)=="#.#";
    }
    cout << ans;
    return 0;   
}
```