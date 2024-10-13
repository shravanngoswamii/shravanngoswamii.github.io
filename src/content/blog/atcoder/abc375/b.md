---
author: Shravan Goswami
pubDatetime: 2024-10-13T21:29:19+05:30
title: 'B - Traveling Takahashi Problem (AtCoder Beginner Contest 375)'
slug: abc375-B
tags: [CPP, AtCoder, AtCoder Beginner Contest]
description: 'B - Traveling Takahashi Problem - Panasonic Programming Contest 2024 (AtCoder Beginner Contest 375)'
---

<p class="hidden">Problem B - abc375</p>

Problem Link: [B - Traveling Takahashi Problem (AtCoder Beginner Contest 375)](https://atcoder.jp/contests/abc375/tasks/abc375_b)

## Approach
The code takes a list of points and calculates the total distance between them. It first reads the points, adds the origin $(0, 0)$ at the start and end, reverses the list, and then computes the distance between each pair of consecutive points. Finally, it prints the total distance with high precision.

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
    
    int t=1;
    // cin >> t;

    while (t--) {
        int n;
        cin >> n;
        vector<pair<int, int>> v(n);
        for (auto &x:v){
            cin >> x.first >> x.second;
        }
        v.emplace_back(0,0);
        reverse(v.begin(),v.end());
        v.emplace_back(0,0);
        n=size(v);
        long double ans=0;
        for (int i=0; i+1<n; i++) {
            const int x=v[i].first-v[i+1].first, y=v[i].second-v[i+1].second;
            ans+=sqrt(x*x+y*y);
        }
        cout << fixed << setprecision(20) << ans << endl;
    }
    return 0;   
}
```