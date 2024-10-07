---
title: 'Consecutive Sum Riddle (CF 800 Rated)'
description: 'A. Consecutive Sum Riddle, 800 RATED - Codeforces Round 747 (Div. 2)'
publishDate: '06 Oct 2024'
heroImage: '/blog-placeholder-2.jpg'
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