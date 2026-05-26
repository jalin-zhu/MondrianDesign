# mondrian-design

Mondrian-inspired React UI component library. A design system built on bold geometry, primary colors, and thick black borders -- paying homage to the iconic style of Piet Mondrian.

## Features

- **17 production-ready components** covering common UI patterns
- **CSS custom properties theming** -- configure colors, spacing, borders, shadows, and motion
- **TypeScript-first** with full type definitions
- **Accessible** -- proper ARIA attributes, keyboard navigation, and screen-reader support
- **Tree-shakeable** -- import only what you need
- **Lightweight** -- no external runtime dependencies beyond React

## Installation

```bash
npm install mondrian-design
# or
pnpm add mondrian-design
# or
yarn add mondrian-design
```

### Peer Dependencies

`mondrian-design` requires `react` and `react-dom` (18.x or 19.x).

## Quick Start

```tsx
import { MondrianProvider, Button, Card, Input } from 'mondrian-design';
import 'mondrian-design/styles.css';

function App() {
  return (
    <MondrianProvider>
      <Card title="Welcome" subtitle="mondrian-design v0.1">
        <Input placeholder="Enter your name" />
        <Button tone="blue" style={{ marginTop: 12 }}>
          Get Started
        </Button>
      </Card>
    </MondrianProvider>
  );
}
```

The `MondrianProvider` injects CSS custom properties and the theme context. You can nest multiple providers for scoped theming.

## Custom Theme

```tsx
import { MondrianProvider, createMondrianTheme } from 'mondrian-design';

const darkMondrian = createMondrianTheme({
  palette: {
    red: '#ff4d4d',
    blue: '#3b82f6',
    black: '#eeeeee',
    white: '#1a1a2e',
    canvas: '#16213e',
  },
  border: { width: '3px' },
});

function App() {
  return <MondrianProvider theme={darkMondrian}>{/* ... */}</MondrianProvider>;
}
```

You can override any subset of the theme -- unspecified values fall back to the classic Mondrian palette. Use `useMondrianTheme()` to consume the current theme in your own components.

## Components

### Alert

A banner for status messages with an optional title, description, and action slot.

```tsx
import { Alert, Button } from 'mondrian-design';

<Alert title="Update available" tone="blue" action={<Button size="sm">Update</Button>}>
  A new version of the application is ready.
</Alert>
```

| Prop          | Type             | Default    | Description                           |
| ------------- | ---------------- | ---------- | ------------------------------------- |
| `title`       | `ReactNode`      | -          | Alert heading                         |
| `description` | `ReactNode`      | -          | Secondary text                        |
| `tone`        | `ComponentTone`  | `'yellow'` | Color tone (`red`/`yellow`/`blue`/`white`/`black`/`default`) |
| `action`      | `ReactNode`      | -          | Action slot (e.g., a button)          |
| `children`    | `ReactNode`      | -          | Body content                          |
| `className`   | `string`         | -          | Additional CSS class                  |

---

### AudioPlayer

An accessible audio player wrapped in a Mondrian-styled figure.

```tsx
import { AudioPlayer } from 'mondrian-design';

<AudioPlayer title="Episode 1" subtitle="Introduction" src="/audio/ep1.mp3" tone="white" />
```

| Prop            | Type            | Default      | Description                    |
| --------------- | --------------- | ------------ | ------------------------------ |
| `title`         | `ReactNode`     | -            | Figure caption                 |
| `subtitle`      | `ReactNode`     | -            | Supplementary description      |
| `tone`          | `ComponentTone` | `'white'`    | Background tone                |
| `captionsSrc`   | `string`        | -            | VTT captions URL               |
| `captionsLabel` | `string`        | `'Captions'` | Label for the track element    |

Also accepts all native `<audio>` HTML attributes.

---

### Avatar

Displays a user image or initials fallback.

```tsx
import { Avatar } from 'mondrian-design';

<Avatar name="Piet Mondrian" tone="blue" size={48} />
<Avatar src="/avatar.jpg" alt="Mondrian" size={40} tone="red" />
```

If the image fails to load, the component automatically shows the user's initials.

| Prop        | Type            | Default     | Description                                |
| ----------- | --------------- | ----------- | ------------------------------------------ |
| `src`       | `string`        | -           | Image URL                                  |
| `alt`       | `string`        | -           | Image alt text                             |
| `name`      | `string`        | -           | Used to generate initials when no `src`    |
| `size`      | `number`        | `36`        | Width and height in pixels                 |
| `tone`      | `ComponentTone` | `'yellow'`  | Background tone                            |
| `className` | `string`        | -           | Additional CSS class                       |

---

### Badge

A small inline label for statuses, counts, or categories.

```tsx
import { Badge } from 'mondrian-design';

<Badge tone="red">New</Badge>
<Badge tone="yellow">Draft</Badge>
```

| Prop        | Type            | Default     | Description       |
| ----------- | --------------- | ----------- | ----------------- |
| `tone`      | `ComponentTone` | `'yellow'`  | Background tone   |
| `children`  | `ReactNode`     | -           | Badge content     |
| `className` | `string`        | -           | Additional class  |

---

### Button

The primary action element. Supports size, tone, variant, and block modes. Built on `<button>` -- accepts all native button props and `ref`.

```tsx
import { Button } from 'mondrian-design';

<Button tone="red" size="lg" onClick={() => console.log('clicked')}>
  Delete
</Button>
<Button variant="outlined" tone="blue">
  Cancel
</Button>
<Button disabled>Saved</Button>
```

| Prop        | Type              | Default      | Description                                       |
| ----------- | ----------------- | ------------ | ------------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outlined'` | `'primary'` | Visual variant                                   |
| `tone`      | `ComponentTone`   | `'default'`  | Background / text tone                            |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`  | Size preset                                       |
| `block`     | `boolean`         | `false`      | Stretch to full width                             |
| `disabled`  | `boolean`         | -            | Disabled state (native)                           |
| `ref`       | `Ref<HTMLButtonElement>` | -     | Element ref                                       |

---

### Card

A container with a strong border, optional title and subtitle.

```tsx
import { Card, Button } from 'mondrian-design';

<Card title="Project Alpha" subtitle="Last edited 2 days ago" tone="white">
  <p>This project uses the Mondrian design system.</p>
  <Button tone="blue" size="sm">Open</Button>
</Card>
```

| Prop        | Type            | Default    | Description      |
| ----------- | --------------- | ---------- | ---------------- |
| `title`     | `ReactNode`     | -          | Card heading     |
| `subtitle`  | `ReactNode`     | -          | Secondary text   |
| `tone`      | `ComponentTone` | `'white'`  | Background tone  |
| `children`  | `ReactNode`     | -          | Body content     |
| `className` | `string`        | -          | Additional class |

---

### Checkbox

A labeled checkbox.

```tsx
import { Checkbox } from 'mondrian-design';

<Checkbox label="I agree to the terms" defaultChecked />
```

| Prop        | Type                              | Default | Description             |
| ----------- | --------------------------------- | ------- | ----------------------- |
| `label`     | `ReactNode`                       | -       | Label text              |
| `ref`       | `Ref<HTMLInputElement>`           | -       | Element ref             |

Accepts all native `<input type="checkbox">` attributes.

---

### Input

A text input field with size, tone, and error states. Built with `forwardRef`.

```tsx
import { Input } from 'mondrian-design';

<Input placeholder="Email address" tone="white" />
<Input placeholder="Required field" error />
<Input placeholder="Small input" size="sm" />
```

| Prop        | Type                              | Default    | Description                          |
| ----------- | --------------------------------- | ---------- | ------------------------------------ |
| `tone`      | `ComponentTone`                   | `'white'`  | Background tone                      |
| `size`      | `'sm' \| 'md' \| 'lg'`            | `'md'`     | Size preset                          |
| `error`     | `boolean`                         | `false`    | Show error styling and `aria-invalid`|
| `ref`       | `Ref<HTMLInputElement>`           | -          | Element ref                          |

Accepts all native `<input>` attributes.

---

### Modal

A modal dialog with backdrop, body scroll lock, and Escape-to-close. Supports controlled and uncontrolled usage.

```tsx
import { Modal, Button, useState } from 'mondrian-design';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Confirm" closeText="OK">
        <p>Are you sure you want to continue?</p>
      </Modal>
    </>
  );
}
```

| Prop               | Type                          | Default     | Description                           |
| ------------------ | ----------------------------- | ----------- | ------------------------------------- |
| `open`             | `boolean`                     | -           | Controlled open state                 |
| `defaultOpen`      | `boolean`                     | `false`     | Uncontrolled initial state            |
| `onOpenChange`     | `(open: boolean) => void`     | -           | Change callback                       |
| `title`            | `ReactNode`                   | -           | Dialog heading                        |
| `children`         | `ReactNode`                   | -           | Body content                          |
| `closeText`        | `string`                      | `'Close'`   | Close button label                    |
| `aria-label`       | `string`                      | -           | Accessible label (falls back to `title` when string) |
| `aria-describedby` | `string`                      | -           | Points to description element         |

---

### Progress

A linear progress bar with value clamping and percentage label.

```tsx
import { Progress } from 'mondrian-design';

<Progress value={60} tone="red" />
<Progress value={75} max={100} tone="blue" showValue />
```

| Prop        | Type            | Default   | Description                          |
| ----------- | --------------- | --------- | ------------------------------------ |
| `value`     | `number`        | required  | Current value                        |
| `max`       | `number`        | `100`     | Maximum value                        |
| `tone`      | `ComponentTone` | `'blue'`  | Fill tone                            |
| `showValue` | `boolean`       | `true`    | Show percentage label                |
| `className` | `string`        | -         | Additional class                     |

---

### Radio

A labeled radio button.

```tsx
import { Radio } from 'mondrian-design';

<Radio name="option" value="a" label="Option A" />
<Radio name="option" value="b" label="Option B" defaultChecked />
```

| Prop        | Type                              | Default | Description             |
| ----------- | --------------------------------- | ------- | ----------------------- |
| `label`     | `ReactNode`                       | -       | Label text              |
| `ref`       | `Ref<HTMLInputElement>`           | -       | Element ref             |

Accepts all native `<input type="radio">` attributes.

---

### Select

A dropdown select with size, tone, and error states. Includes a custom dropdown arrow.

```tsx
import { Select } from 'mondrian-design';

<Select tone="white">
  <option value="">Choose a framework</option>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</Select>
```

| Prop        | Type                              | Default    | Description             |
| ----------- | --------------------------------- | ---------- | ----------------------- |
| `tone`      | `ComponentTone`                   | `'white'`  | Background tone         |
| `size`      | `'sm' \| 'md' \| 'lg'`            | `'md'`     | Size preset             |
| `error`     | `boolean`                         | `false`    | Error styling           |
| `ref`       | `Ref<HTMLSelectElement>`          | -          | Element ref             |

Accepts all native `<select>` attributes.

---

### Skeleton

A placeholder shimmer for loading states.

```tsx
import { Skeleton } from 'mondrian-design';

<Skeleton width={200} height={24} />
<Skeleton width={48} height={48} circle />
```

| Prop        | Type              | Default    | Description             |
| ----------- | ----------------- | ---------- | ----------------------- |
| `width`     | `number \| string` | `'100%'` | Element width           |
| `height`    | `number \| string` | `16`     | Element height          |
| `circle`    | `boolean`         | `false`    | Circular shape          |
| `className` | `string`          | -          | Additional class        |

---

### Switch

A toggle switch with label. Controlled and uncontrolled modes supported.

```tsx
import { Switch } from 'mondrian-design';

<Switch label="Dark mode" onCheckedChange={(v) => console.log(v)} />
<Switch checked={enabled} onCheckedChange={setEnabled} label="Notifications" tone="red" />
```

| Prop             | Type                          | Default    | Description                          |
| ---------------- | ----------------------------- | ---------- | ------------------------------------ |
| `checked`        | `boolean`                     | -          | Controlled checked state             |
| `defaultChecked` | `boolean`                     | `false`    | Uncontrolled initial state           |
| `onCheckedChange`| `(checked: boolean) => void`  | -          | Change callback                      |
| `label`          | `ReactNode`                   | -          | Label text                           |
| `tone`           | `ComponentTone`               | `'blue'`   | Active tone                          |
| `disabled`       | `boolean`                     | -          | Disabled state                       |

---

### Tabs

A tabbed interface with separate content panels.

```tsx
import { Tabs } from 'mondrian-design';

const items = [
  { key: 'overview', label: 'Overview', content: <p>Overview content</p> },
  { key: 'settings', label: 'Settings', content: <p>Settings panel</p> },
];

<Tabs items={items} defaultValue="overview" />
```

| Prop           | Type                        | Default | Description                |
| -------------- | --------------------------- | ------- | -------------------------- |
| `items`        | `TabItem[]`                 | required| Tab list                   |
| `value`        | `string`                    | -       | Controlled active tab key  |
| `defaultValue` | `string`                    | -       | Uncontrolled default       |
| `onValueChange`| `(value: string) => void`   | -       | Change callback            |
| `className`    | `string`                    | -       | Additional class           |

`TabItem` shape:

```ts
interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
}
```

---

### Textarea

A multi-line text input.

```tsx
import { Textarea } from 'mondrian-design';

<Textarea placeholder="Write a message..." rows={6} tone="white" />
<Textarea placeholder="Required" error />
```

| Prop        | Type                              | Default    | Description             |
| ----------- | --------------------------------- | ---------- | ----------------------- |
| `tone`      | `ComponentTone`                   | `'white'`  | Background tone         |
| `error`     | `boolean`                         | `false`    | Error styling           |
| `ref`       | `Ref<HTMLTextAreaElement>`        | -          | Element ref             |

Accepts all native `<textarea>` attributes.

---

### Toast

A timed notification that slides up from the bottom-right corner. Supports controlled and uncontrolled modes.

```tsx
import { Toast } from 'mondrian-design';

<Toast open title="Saved" description="Your changes have been saved." tone="black" duration={3000} />
```

| Prop           | Type                          | Default    | Description                          |
| -------------- | ----------------------------- | ---------- | ------------------------------------ |
| `open`         | `boolean`                     | -          | Controlled visibility                |
| `defaultOpen`  | `boolean`                     | `false`    | Uncontrolled initial state           |
| `onOpenChange` | `(open: boolean) => void`     | -          | Change callback                      |
| `title`        | `ReactNode`                   | required   | Toast heading                        |
| `description`  | `ReactNode`                   | -          | Detail text                          |
| `tone`         | `ComponentTone`               | `'black'`  | Background tone                      |
| `duration`     | `number`                      | `2500`     | Auto-dismiss delay in milliseconds   |

---

### VideoPlayer

An accessible video player wrapped in a Mondrian-styled figure.

```tsx
import { VideoPlayer } from 'mondrian-design';

<VideoPlayer
  title="Demo Reel"
  subtitle="Product showcase"
  src="/video/demo.mp4"
  tone="white"
  captionsSrc="/video/demo.vtt"
/>
```

| Prop            | Type            | Default      | Description                    |
| --------------- | --------------- | ------------ | ------------------------------ |
| `title`         | `ReactNode`     | -            | Figure caption                 |
| `subtitle`      | `ReactNode`     | -            | Supplementary description      |
| `tone`          | `ComponentTone` | `'white'`    | Background tone                |
| `captionsSrc`   | `string`        | -            | VTT captions URL               |
| `captionsLabel` | `string`        | `'Captions'` | Label for the track element    |

Also accepts all native `<video>` HTML attributes.

---

## Shared Types

### `ComponentTone`

```ts
type ComponentTone = 'default' | 'red' | 'yellow' | 'blue' | 'white' | 'black';
```

### `ComponentSize`

```ts
type ComponentSize = 'sm' | 'md' | 'lg';
```

### `ComponentVariant`

```ts
type ComponentVariant = 'primary' | 'secondary' | 'outlined';
```

### `MondrianTheme`

```ts
interface MondrianTheme {
  palette: {
    red: string;
    yellow: string;
    blue: string;
    white: string;
    black: string;
    canvas: string;
  };
  border: {
    width: string;
    strongWidth: string;
    radius: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadow: {
    sm: string;
    md: string;
  };
  motion: {
    fast: string;
    normal: string;
  };
}
```

## Hooks

### `useMondrianTheme()`

Returns the current `MondrianTheme` from the nearest `MondrianProvider`.

```tsx
import { useMondrianTheme } from 'mondrian-design';

function CustomComponent() {
  const theme = useMondrianTheme();
  return <div style={{ color: theme.palette.red }}>Themed text</div>;
}
```

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). CSS custom properties are required -- IE 11 is not supported.

## License

MIT
