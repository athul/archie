---
title: "Syntax Higlighters"
date: 2020-06-23
description: "Syntax Highlighting Examples"
tags: [Code]
---
## Python

```py
def sum(a,b):
    return a+b
print(f'The Sum of 4 and 5 is {sum(4,5)}')
```

## JavaScript

```js
const sum = (a,b)=>{
    return a+b
}
console.log(sum(4,5))
```

## Go

```go
package main

import (
	"fmt"
)

func addition(a int, b int) int {
	return a + b
}
func main() {
	x := addition(4, 5)
	fmt.Println(x)
}
```
|       Subject       |      {{subject}}     |
|:-------------------:|:--------------------:|
|      Hosted On      |     {{hosted_on}}    |
|         Site        |     {{site_url}}     |
|    Incident Time    | {{time_of_incident}} |
| Incident Ref Number |       {{name}}       |
|     Resolved By     |    {{resolved_by}}   |
|   Resolution Time   |  {{resolution_time}} |
