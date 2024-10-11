---
author: Shravan Goswami
pubDatetime: 2024-10-06
title: 'Consecutive Sum Riddle (CF 800 Rated)'
slug: 1594-A-consecutive-sum-riddle
featured: true
draft: false
tags: ["C++", "Codeforces"]
description: 'A. Consecutive Sum Riddle, 800 RATED - Codeforces Round 747 (Div. 2)'
---

Problem Link: [A. Consecutive Sum Riddle, 800 RATED - Codeforces Round 747 (Div. 2)](https://codeforces.com/problemset/problem/1594/A)

## Code
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

## Approach

Sum of negative of `n-1` to `+n` is equals to `n`.