# lil text box

easy tiny zero dep terminal box maker

### usage

`lilTextbox(lines,{ padding, margin, print }){ ... }`

- lines: Array<String>, each line of text. try `\`Hello World\``.split("\n");
- padding: number, padding from edges, will automatically shrink before text is truncated; default 10
- margin: number, basically indent; default 2
- print: bool, true console.log's, false returns the resulting string; default true

### example:

```javascript
const lilTextbox = require("lil-textbox");

lilTextbox(["hello", "world", "~~~~~", 1, 2, 3]);
```

...

```

  ┌─────────────────────────┐
  │                         │
  │                         │
  │                         │
  │                         │
  │          hello          │
  │          world          │
  │          ~~~~~          │
  │          1              │
  │          2              │
  │          3              │
  │                         │
  │                         │
  │                         │
  │                         │
  └─────────────────────────┘
```
