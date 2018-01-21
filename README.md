# image-viewer
image viewer, that use rendering by canvas.

# demo
[demo](https://naoki-tomita.github.io/image-viewer/test/)

# api
## ImageViewer 
### constructor
```ts
constructor(
  element: string | HTMLElement, 
  width: number, 
  height: number, 
  images?: string[], 
  backgroundColor?: string[]);
```

### show
```ts
function show(): void;
```

### hide
```ts
function hide(): void;
```

### addImage
```ts
function addImage(imageUrl: string): void;
```

### next
```ts
function next(): void;
```

### prev
```ts
function prev(): void;
```

### expand
```ts
function expand(): void;
```

### shrink
```ts
function shrink(): void;
```

### rotate
```ts
function rotate(): void;
```

### move
```ts
function move(dx: number, dy: number): void;
```
