---
author: Shravan Goswami
pubDatetime: 2024-10-12T06:40:53Z
title: 'A. Halloumi Boxes (CF1903 800 RATED)'
slug: 1903-A-Halloumi-Boxes
tags: [CPP, Codeforces, CF800, CP31]
description: 'A. Halloumi Boxes, 800 RATED - Codeforces Round 912 (Div. 2)'
---

<p class="hidden">Problem A 1903</p>

Problem Link: [A. Halloumi Boxes, 800 RATED - Codeforces Round 912 (Div. 2)](https://codeforces.com/problemset/problem/1903/A)

## Approach
If `k>1` or else array is already sorted then it's `YES` else `No`.

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
    	int n,k;
    	cin >> n >> k;
    	int arr[n];
    	for(int i=0; i<n; i++) {
    		cin >> arr[i];
    	}
    	if (is_sorted(arr, arr+n) || k>1)
    		cout << "YES" << endl;
    	else
    		cout << "NO" << endl;
        }

    return 0;   
}
```
