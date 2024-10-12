---
author: Shravan Goswami
pubDatetime: 2024-10-06T04:02:55Z
title: 'A. Consecutive Sum Riddle (CF1594 800 RATED)'
slug: 1594-A-Consecutive-Sum-Riddle
tags: [CPP, Codeforces, CF800]
description: 'A. Consecutive Sum Riddle, 800 RATED - Codeforces Round 747 (Div. 2)'
---

<p class="hidden">Problem A 1594</p>

Problem Link: [A. Consecutive Sum Riddle, 800 RATED - Codeforces Round 747 (Div. 2)](https://codeforces.com/problemset/problem/1594/A)

## Approach

Sum of negative of `n-1` to `+n` is equals to `n`.

## Code Implementation
```c++
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
        int n; 
        cin >> n;
        cout << -(n - 1) << " " << n << endl;
    }

    return 0;   
}
```