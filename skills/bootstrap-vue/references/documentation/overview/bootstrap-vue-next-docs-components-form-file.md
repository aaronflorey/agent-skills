# Form File ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-file.html

##### On this page

-   [Overview ​](#overview)
    
-   [Single File Mode ​](#single-file-mode)
    
-   [Multiple File Mode ​](#multiple-file-mode)
    
-   [Limiting to certain file types ​](#limiting-to-certain-file-types)
    
-   [Drag and Drop Support ​](#drag-and-drop-support)
    
-   [Sizing ​](#sizing)
    
-   [Label ​](#label)
    
-   [Customizing Text and Placeholders ​](#customizing-text-and-placeholders)
    -   [Browse Button Text ​](#browse-button-text)
        
    -   [Drop Zone Placeholders ​](#drop-zone-placeholders)
        
-   [File Name Formatting ​](#file-name-formatting)
    
-   [Plain Mode ​](#plain-mode)
    
-   [Directory Mode ​](#directory-mode)
    -   [Accessing File Paths ​](#accessing-file-paths)
        
-   [Autofocus ​](#autofocus)
    
-   [Contextual State ​](#contextual-state)
    
-   [Important Notes ​](#important-notes)
    -   [Prop Reactivity ​](#prop-reactivity)
        
    -   [Modifying the file selection ​](#modifying-the-file-selection)
        
-   [Exposed functions ​](#exposed-functions)
    
-   [Component Reference](#component-reference)
    -   [<BFormFile>](#b-form-file)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Form File [​](#form-file)

File input control that supports single and multiple file modes, drag and drop, file type restrictions, and directory selection with contextual state feedback.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormFile/BFormFile.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-file.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformfile)

## Overview [​](#overview)

BFormFile provides a customized, cross-browser consistent file input control with support for:

-   Single and multiple file selection
-   Drag and drop file upload
-   Directory selection (browser support required)
-   File type filtering via accept attribute
-   Custom text and placeholders
-   Bootstrap validation states

## Single File Mode [​](#single-file-mode)

The default behavior is single file mode. While using single file mode the `modelValue` will be a single `File` object

Hello!

Browse

No file chosen

Files: **No file selected**

HTML StackBlitz

vue

```
<template>
  <BFormFile
    v-model="file"
    label="Hello!"
  />
  <div class="mt-3">
    Files: <strong>{{ file?.name || 'No file selected' }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const file = ref<null | File>(null)
</script>
```

## Multiple File Mode [​](#multiple-file-mode)

To toggle multiple file mode, simply set the `multiple` prop to `true`. While in multiple file mode, the `modelValue` will be a `File[]`, even if only one file is selected

Browse

No file chosen

Files: **No files selected**

HTML StackBlitz

vue

```
<template>
  <BFormFile
    v-model="files"
    multiple
  />
  <div class="mt-3">
    Files: <strong>{{ files?.map((file) => file.name).join(', ') || 'No files selected' }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const files = ref<null | File[]>(null)
</script>
```

## Limiting to certain file types [​](#limiting-to-certain-file-types)

You can limit the file types by setting the `accept` prop. The `accept` attribute is a csv list of acceptable types. This can be a `string` or `string[]`. If a `string[]` is inputted, it simply gets joined as a csv list

Browse

No file chosen

Files: **No file selected**

HTML StackBlitz

vue

```
<template>
  <BFormFile
    v-model="file"
    accept="image/*"
  />
  <div class="mt-3">
    Files: <strong>{{ file?.name || 'No file selected' }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const file = ref<null | File>(null)
</script>
```

## Drag and Drop Support [​](#drag-and-drop-support)

Drag and drop support uses the browsers default behavior. You can explicitly disable drag and drop by using the `noDrop` prop

Browse

No file chosen

Files: **No file selected**

HTML StackBlitz

vue

```
<template>
  <BFormFile
    v-model="file"
    no-drop
  />
  <div class="mt-3">
    Files: <strong>{{ file?.name || 'No file selected' }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const file = ref<null | File>(null)
</script>
```

## Sizing [​](#sizing)

You can modify the size of the form control by using the `size` prop

Browse

No file chosen

Browse

No file chosen

Browse

No file chosen

HTML StackBlitz

template

```
<template>
  <BFormFile
    class="mt-3"
    size="sm"
  />
  <BFormFile class="mt-3" />
  <BFormFile
    class="mt-3"
    size="lg"
  />
</template>
```

## Label [​](#label)

You can add a label above the input by using the `label` prop or the `label` slot

I am first!

Browse

No file chosen

I am second!

Browse

No file chosen

HTML StackBlitz

template

```
<template>
  <BFormFile
    class="mt-3"
    label="I am first!"
  />
  <BFormFile class="mt-3">
    <template #label> I am second! </template>
  </BFormFile>
</template>
```

## Customizing Text and Placeholders [​](#customizing-text-and-placeholders)

### Browse Button Text [​](#browse-button-text)

Customize the browse button text using the `browseText` prop (custom mode only):

Choose File

No files selected

Selected: **None**

* * *

Pick a File

Select a document

Selected: **None**

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormFile
      v-model="file1"
      browse-text="Choose File"
      placeholder="No files selected"
    />
    <div class="mt-3">
      Selected: <strong>{{ file1?.name || 'None' }}</strong>
    </div>

    <hr />

    <BFormFile
      v-model="file2"
      browse-text="Pick a File"
      placeholder="Select a document"
      class="mt-3"
    />
    <div class="mt-3">
      Selected: <strong>{{ file2?.name || 'None' }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const file1 = ref<File | null>(null)
const file2 = ref<File | null>(null)
</script>
```

### Drop Zone Placeholders [​](#drop-zone-placeholders)

Customize the placeholder text shown in different states (custom mode only):

Browse

Choose files or drag them here

Selected: 0 files

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormFile
      v-model="files"
      multiple
      drop-placeholder="Drop files here..."
      no-drop-placeholder="Drag and drop is disabled"
      placeholder="Choose files or drag them here"
    />
    <div class="mt-3">Selected: {{ files?.length || 0 }} files</div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const files = ref<File[] | null>(null)
</script>
```

## File Name Formatting [​](#file-name-formatting)

Use the `fileNameFormatter` prop to customize how selected file names are displayed (custom mode only):

Browse

Choose multiple files

Display: None

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormFile
      v-model="files"
      multiple
      :file-name-formatter="formatNames"
      placeholder="Choose multiple files"
    />
    <div class="mt-3">Display: {{ displayText }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const files = ref<File[] | null>(null)

const formatNames = (files: readonly File[]): string => {
  if (files.length === 1 && files[0] !== undefined) {
    return files[0].name
  }
  return `${files.length} files selected (${files.map((f) => f.name).join(', ')})`
}

const displayText = computed(() => {
  if (!files.value || files.value.length === 0) return 'None'
  return formatNames(files.value)
})
</script>
```

## Plain Mode [​](#plain-mode)

Use the `plain` prop to render a native HTML file input without custom styling. This provides 100% backward compatibility with the original implementation:

Selected: 0 files

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormFile
      v-model="files"
      multiple
      plain
      placeholder="Choose files"
    />
    <div class="mt-3">Selected: {{ files?.length || 0 }} files</div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const files = ref<File[] | null>(null)
</script>
```

Plain mode uses the native browser file input, which has limited styling options but provides maximum compatibility. Custom mode (default) provides drag-and-drop support and better visual customization.

## Directory Mode [​](#directory-mode)

By adding the `directory` prop, a user can select directories instead of files.

Directory mode uses the non-standard \`webkitdirectory\` attribute. Supported browsers include Chrome, Edge, Safari, Opera, and Firefox (desktop). Mobile browser support varies. The component gracefully degrades to standard file selection if unsupported. Use with caution in production environments requiring broad compatibility.

Browse Directories

Select a directory

No directory selected

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormFile
      v-model="files"
      directory
      multiple
      placeholder="Select a directory"
      browse-text="Browse Directories"
    />
    <div class="mt-3">
      <div v-if="files && files.length > 0">
        <strong>{{ files.length }} files selected from directory:</strong>
        <ul class="mt-2 font-monospace small">
          <li
            v-for="(file, index) in files.slice(0, 10)"
            :key="index"
          >
            {{ file.webkitRelativePath || file.name }}
          </li>
          <li v-if="files.length > 10">
            <em>...and {{ files.length - 10 }} more files</em>
          </li>
        </ul>
        <p class="text-muted small mt-2">
          Each file includes a <code>webkitRelativePath</code> property with its relative path.
        </p>
      </div>
      <div v-else>No directory selected</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const files = ref<File[] | null>(null)
</script>
```

### Accessing File Paths [​](#accessing-file-paths)

When using `directory` mode, each `File` object includes the standard `webkitRelativePath` property containing the relative path from the selected directory root:

ts

```
// Example: After selecting a directory with BFormFile
const files: File[] = [] // Your selected files from v-model

files.forEach((file: File) => {
  console.log(file.name) // "helpers.ts"
  console.log(file.webkitRelativePath) // "src/utils/helpers.ts"
})
```

The `webkitRelativePath` property allows you to:

-   Display the full file path to users
-   Reconstruct directory structure in your application
-   Group files by folder
-   Preserve directory hierarchy when processing files

Browser Compatibility

The `webkitRelativePath` property is available in all browsers that support directory selection. It's part of the standard File API when using the `webkitdirectory` attribute.

## Autofocus [​](#autofocus)

If you set the `autofocus` prop to true, the input will be focused when the component is inserted

Browse

No file chosen

HTML StackBlitz

template

```
<template>
  <BFormFile
    class="mt-3"
    autofocus
  />
</template>
```

## Contextual State [​](#contextual-state)

You can use the `state` prop to provide visual feedback on the state of the input

Browse

No file chosen

Browse

No file chosen

HTML StackBlitz

template

```
<template>
  <BFormFile
    class="mt-3"
    :state="false"
  />
  <BFormFile
    class="mt-3"
    :state="true"
  />
</template>
```

## Important Notes [​](#important-notes)

### Prop Reactivity [​](#prop-reactivity)

The `accept`, `multiple`, and `directory` props support runtime changes. The file dialog and drop zone will automatically reflect updated values when these props change.

Drop Zone Multiple Limitation

The drop zone's `multiple` validation is set at component initialization and will not update if the `multiple` prop changes at runtime. However, the actual file handling logic respects the current `multiple` prop value, so files will be processed correctly. If you need the drop zone validation to update, remount the component with a new `key` attribute when changing the `multiple` prop.

### Modifying the file selection [​](#modifying-the-file-selection)

With inputs that are of type `file`, the value is strictly `uni-directional`. Meaning that you cannot change the value of the input via JavaScript. You can change the value of the `v-model`, and this will work for an "outside view", however, the actual `input` element will not have its [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList) changed. This is for security reasons as a malicious script could attempt to read and steal documents

## Exposed functions [​](#exposed-functions)

`BFormFile` exposes functions through template refs. See the [Component Reference Exposed section](#comp-reference-bformfile-exposed) for details.

## Component Reference

### `<BFormFile>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormFile/BFormFile.vue)

-   [<BFormFile> Properties](#comp-reference-bformfile-properties)
-   [<BFormFile> Events](#comp-reference-bformfile-events)
-   [<BFormFile> Slots](#comp-reference-bformfile-slots)
-   [<BFormFile> Exposed](#comp-reference-bformfile-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑file`

##### [Properties](#comp-reference-bformfile-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| accept | `string | readonly string[]` | `''` | Value to set on the file input's \`accept\` attribute. Restricts file types that can be selected |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| aria-labelledby | `string` | `undefined` | The ID of the element that provides a label for this component. Used as the value for the \`aria-labelledby\` attribute |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| browse-text | `string` | `'Browse'` | Text for the browse button (custom mode only) |
| capture | `'user' | 'environment'` | `undefined` | When set, will instruct the browser to use the device's camera (if supported). 'user' requests the user-facing camera, 'environment' requests the outward-facing camera |
| directory | `boolean` | `false` | Enable \`directory\` mode (on browsers that support it) |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| drop-placeholder | `string` | `undefined` | Text to display when dragging files over the drop zone (custom mode only). Defaults to "Drop files here..." when not specified |
| file-name-formatter | `(files: readonly File[]) => string` | `undefined` | Custom formatter function for displaying selected file names (custom mode only) |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| label | `string` | `''` | Sets the label for the form group which the file input is rendered |
| label-class | `ClassValue` | `undefined` | Sets the styling for the label |
| model-value | `readonly File[] | File | null` | `undefined` | The current value of the file input. Will be a single \`File\` object or an array of \`File\` objects (if \`multiple\` or \`directory\` is set). Can be set to \`null\`, or an empty array to reset the file input |
| multiple | `boolean` | `false` | When set, will allow multiple files to be selected. \`v-model\` will be an array |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| no-button | `boolean | null` | `undefined` | Hide the file input button |
| no-drop | `boolean` | `false` | Disable drag and drop mode |
| placeholder | `string` | `'No file chosen'` | Text to display when no file is selected (custom mode only) |
| plain | `boolean` | `false` | Don't add any additional styling or classes to the file input |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| show-file-names | `boolean` | `false` | Display selected file names in custom mode |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |

##### [Events](#comp-reference-bformfile-events)

| Event | Args | Description |
| --- | --- | --- |
| change | 
`value``: Event | CustomEvent` - Native Event (plain mode) or CustomEvent with file data (custom mode)

 | Emitted when the file selection changes. In plain mode, receives the native Event from the file input. In custom mode, receives a CustomEvent with \`detail.files\` (File\[\]), \`detail.target.files\` (FileList-like), and a \`files\` property for convenience. |
| update:model-value | 

`value``: File | File[] | null` - Will be a single File object in single mode or an array of File objects in multiple mode

 | Updates the \`v-model\` value (see docs for more details) |

##### [Slots](#comp-reference-bformfile-slots)

| Name | Scope | Description |
| --- | --- | --- |
| drop-placeholder |  | Slot to customize the drag-and-drop overlay text (shown during drag operations) |
| file-name | 
`files``: readonly File[]` - Array of selected File objects

`names``: readonly string[]` - Array of file names

 | Slot to customize how selected file names are displayed |
| label |  | Slot to customize the label content |
| placeholder |  | Slot to customize the placeholder text shown when no files are selected |

##### [Exposed](#comp-reference-bformfile-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the file input |
| element | `HTMLElement` | Reference to the underlying file input or browse button element |
| focus | `() => void` | Sets focus on the file input |
| reset | `() => void` | Resets the file input, clearing selected files |
