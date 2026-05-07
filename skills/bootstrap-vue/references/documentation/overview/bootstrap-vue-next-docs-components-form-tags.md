# Form Tags ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-tags.html

##### On this page

-   [Basic usage ​](#basic-usage)
    
-   [Tag creation using separators ​](#tag-creation-using-separators)
    
-   [Last tag removal via backspace keypress ​](#last-tag-removal-via-backspace-keypress)
    
-   [Styling Options ​](#styling-options)
    
-   [Using with native browser <form> submission ​](#using-with-native-browser-form-submission)
    
-   [Tag validation ​](#tag-validation)
    -   [Detecting new, invalid, and duplicate tags ​](#detecting-new-invalid-and-duplicate-tags)
        
-   [Limiting tags ​](#limiting-tags)
    
-   [Custom rendering with default scoped slot ​](#custom-rendering-with-default-scoped-slot)
    -   [Scope properties ​](#scope-properties)
        -   [inputAttrs object properties ​](#inputattrs-object-properties)
            
        -   [inputHandlers object properties ​](#inputhandlers-object-properties)
            
    -   [Using native browser inputs ​](#using-native-browser-inputs)
        
    -   [Using custom form components ​](#using-custom-form-components)
        
    -   [Advanced custom rendering usage ​](#advanced-custom-rendering-usage)
        
    -   [Creating wrapper components ​](#creating-wrapper-components)
        
-   [<BFormTag> helper component ​](#bformtag-helper-component)
    
-   [Component Reference](#component-reference)
    -   [<BFormTags>](#b-form-tags)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BFormTag>](#b-form-tag)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Form Tags [​](#form-tags)

Lightweight custom tagged input form control, with options for customized interface rendering, duplicate tag detection and optional tag validation.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormTags/BFormTags.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-tags.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformtags)

Tags are arrays of short strings, used in various ways such as assigning categories. Use the default user interface, or create your own custom interface via the use of the default scoped slot.

## Basic usage [​](#basic-usage)

Tags will have any leading and tailing whitespace removed, and duplicate tags are not permitted. Tags that contain spaces are permitted by default.

Tags are added by clicking the Add button, pressing the Enter key or optionally when the `change` event fires on the new tag input (i.e. when focus moves from the input). The _Add_ button will only appear when the user has entered a new tag value.

Type a new tag and press enter

apple, orange

(Tag removed)

-   apple
-   orange
-   Add
    

Value: \[ "apple", "orange" \]

HTML StackBlitz

vue

```
<template>
  <label for="tags-basic">Type a new tag and press enter</label>
  <BFormTags
    v-model="value"
    input-id="tags-basic"
  />
  <p class="mt-2">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>(['apple', 'orange'])
</script>
```

## Tag creation using separators [​](#tag-creation-using-separators)

To auto create tags when a separator character is typed (i.e. Space, ,, etc.), set the `separator` prop to the character that will trigger the tag to be added. If multiple separator characters are needed, then include them as a single string (i.e. ' ,;'), or an array of characters (i.e. `[' ', ',', ';']`), which will trigger a new tag to be added when Space, ,, or ; are typed). Separators must be a single character.

The following example will auto create a tag when Space, ,, or ; are typed:

Enter tags separated by space, comma or semicolon

apple, orange

(Tag removed)

-   apple
-   orange
-   Add
    

Value: \[ "apple", "orange" \]

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="tags-separators">Enter tags separated by space, comma or semicolon</label>
    <BFormTags
      v-model="value"
      input-id="tags-separators"
      separator=" ,;"
      placeholder="Enter new tags separated by space, comma or semicolon"
      no-add-on-enter
    />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>(['apple', 'orange'])
</script>
```

## Last tag removal via backspace keypress [​](#last-tag-removal-via-backspace-keypress)

When the prop `remove-on-delete` is set, and the user presses Backspace (or Del) and the input value is empty, the last tag in the tag list will be removed.

Enter new tags separated by space

apple, orange, grape

(Tag removed)

-   apple
-   orange
-   grape
-   Add
    

Press Backspace to remove the last tag entered

Value: \[ "apple", "orange", "grape" \]

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="tags-remove-on-delete">Enter new tags separated by space</label>
    <BFormTags
      v-model="value"
      input-id="tags-remove-on-delete"
      :input-attrs="{'aria-describedby': 'tags-remove-on-delete-help'}"
      separator=" "
      placeholder="Enter new tags separated by space"
      remove-on-delete
      no-add-on-enter
    />
    <BFormText
      id="tags-remove-on-delete-help"
      class="mt-2"
    >
      Press <kbd>Backspace</kbd> to remove the last tag entered
    </BFormText>
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>(['apple', 'orange', 'grape'])
</script>
```

## Styling Options [​](#styling-options)

Several props are available to alter the basic styling of the default tagged interface:

| Prop | Description |
| --- | --- |
| `tag-pills` | Renders the tags with the appearance of pills |
| `tag-variant` | Applies one of the Bootstrap contextual variant theme colors to the tags |
| `size` | Set the size of the component's appearance. `sm`, `md` (default), or `lg` |
| `placeholder` | The placeholder text for the new tag input element |
| `state` | Sets the contextual state of the control. Set to `true` (for valid), `false` (for invalid), or `null` |
| `disabled` | Places the component in a disabled state |

For additional props, see the component reference section at the bottom of this page.

The focus and validation state styling of the component relies upon BootstrapVueNext's custom CSS.

Enter tags

apple, orange, grape

(Tag removed)

-   apple
-   orange
-   grape
-   Add
    

Value: \[ "apple", "orange", "grape" \]

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="tags-pills">Enter tags</label>
    <BFormTags
      v-model="value"
      input-id="tags-pills"
      tag-variant="primary"
      tag-pills
      size="lg"
      separator=" "
      placeholder="Enter new tags separated by space"
    />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>(['apple', 'orange', 'grape'])
</script>
```

## Using with native browser `<form>` submission [​](#using-with-native-browser-form-submission)

The value of the tagged input will not be submitted via standard form `action` unless you provide a name via the name prop. When a name is provided, `<BFormTags>` will create a hidden `<input>` for each tag. The hidden input will have the `name` attribute set to the value of the `name` prop.

The hidden inputs will also be generated when using [custom rendering](#custom-rendering-with-default-scoped-slot) (when the `name` prop is set).

## Tag validation [​](#tag-validation)

By default, `<BFormTags>` detects when the user is attempting to enter a (case-sensitive) duplicate tag, and will provide integrated feedback to the user.

You can optionally provide a tag validator method via the `tag-validator` prop. The validator function will receive one argument which is the tag being added, and should return either `true` if the tag passes validation and can be added, or `false` if the tag fails validation (in which case it is not added to the array of tags). Integrated feedback will be provided to the user listing the invalid tag(s) that could not be added.

Tag validation occurs only for tags added via user input. Changes to the tags via the `v-model` are not validated.

Tags validation example

(Tag removed)

-   Add
    

You must provide at least 3 tags and no more than 8

Tags must be 3 to 5 characters in length and all lower case. Enter tags separated by spaces or press enter.

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormGroup
      label="Tags validation example"
      label-for="tags-validation"
      :state="state"
    >
      <BFormTags
        v-model="tags"
        input-id="tags-validation"
        :input-attrs="{'aria-describedby': 'tags-validation-help'}"
        :tag-validator="tagValidator"
        :state="state"
        separator=" "
      />

      <template #invalid-feedback> You must provide at least 3 tags and no more than 8 </template>

      <template #description>
        <div id="tags-validation-help">
          Tags must be 3 to 5 characters in length and all lower case. Enter tags separated by
          spaces or press enter.
        </div>
      </template>
    </BFormGroup>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'

const dirty = ref<boolean>(false)
const tags = ref<string[]>([])

const state = computed(() =>
  // Overall component validation state
  dirty.value ? tags.value.length > 2 && tags.value.length < 9 : null
)

watch(tags, () => {
  // Set the dirty flag on first change to the tags array
  dirty.value = true
})

const tagValidator = (tag: string) =>
  // Individual tag validator function
  tag === tag.toLowerCase() && tag.length > 2 && tag.length < 6
</script>
```

### Detecting new, invalid, and duplicate tags [​](#detecting-new-invalid-and-duplicate-tags)

The event `tag-state` will be emitted whenever new tags are entered into the new tag input element, tags that do not pass validation, or duplicate tags are detected. The event handler will receive three arrays as its arguments:

-   `validTags` (tags that pass validation)
-   `invalidTags` (tags that do not pass validation)
-   `duplicateTags` (tags that would be a duplicate of existing or validTags)

The event will be emitted only when the new tag input changes (characters are entered that would be considered part of a tag), or when the user attempts to add a tag (i.e. via Enter, clicking the **Add** button, or entering a separator). The three arrays will be empty when the user clears the new tag input element (or contains just spaces).

If you are providing your own feedback for duplicate and invalid tags (via the use of the tag-state event) outside of the `<BFormTags>` component, you can disable the built in duplicate and invalid messages by setting the props duplicate-tag-text and invalid-tag-text (respectively) to either an empty string ('') or null.

Enter tags

(Tag removed)

-   Add
    

Tags: \[\]

Event values:

-   validTags: \[\]
-   invalidTags: \[\]
-   duplicateTags: \[\]

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="tags-state-event">Enter tags</label>
    <BFormTags
      v-model="tags"
      input-id="tags-state-event"
      :tag-validator="validator"
      placeholder="Enter tags (3-5 characters) separated by space"
      separator=" "
      @tag-state="onTagState"
    />
    <p class="mt-2">Tags: {{ tags }}</p>
    <p>Event values:</p>
    <ul>
      <li>validTags: {{ validTags }}</li>
      <li>invalidTags: {{ invalidTags }}</li>
      <li>duplicateTags: {{ duplicateTags }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tags = ref<string[]>([])
const validTags = ref<string[]>([])
const invalidTags = ref<string[]>([])
const duplicateTags = ref<string[]>([])
const onTagState = (valid: string[], invalid: string[], duplicate: string[]) => {
  validTags.value = valid
  invalidTags.value = invalid
  duplicateTags.value = duplicate
}
const validator = (tag: string) => tag.length > 2 && tag.length < 6
</script>
```

## Limiting tags [​](#limiting-tags)

If you want to limit the amount of tags the user is able to add use the `limit` prop. When configured, adding more tags than the `limit` allows is only possible by the `v-model`.

When the limit of tags is reached, the user is still able to type but adding more tags is disabled. A message is shown to give the user feedback about the reached limit. This message can be configured by the `limit-tags-text` prop. Setting it to either an empty string (`''`) or `null` will disable the feedback.

Removing tags is unaffected by the `limit` prop.

Enter tags

(Tag removed)

-   Add
    

Value: \[\]

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="tags-limit">Enter tags</label>
    <BFormTags
      v-model="value"
      input-id="tags-limit"
      :limit="limit"
      remove-on-delete
    />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>([])
const limit = ref<number>(5)
</script>
```

## Custom rendering with default scoped slot [​](#custom-rendering-with-default-scoped-slot)

If you fancy a different look and feel for the tags control, you can provide your own custom rendering via the default scoped slot. You can either create your own tags, or use our helper `<BFormTag>` component.

### Scope properties [​](#scope-properties)

The default scoped slot provides numerous properties and methods for use in rendering your custom interface. Not all properties or methods are required to generate your interface.

The default slot scope properties are as follows:

| Property | Type | Description |
| --- | --- | --- |
| `addButtonText` | `string` | The value of the `add-button-text` prop |
| `addButtonVariant` | `ButtonVariant | null` | The value of the `add-button-variant` prop |
| `addTag` | `(tag?: string) => void` | Method to add a new tag. Assumes the tag is the value of the input, but optionally accepts one argument which is the tag value to be added |
| `disableAddButton` | `boolean` | Will be `true` if the tag(s) in the input cannot be added (all invalid and/or duplicates) |
| `disabled` | `boolean` | `true` if the component is in the disabled state. Value of the `disabled` prop |
| `duplicateTagText` | `string` | The value of the `duplicate-tag-text` prop |
| `duplicateTags` | `string[]` | Array of the duplicate tag(s) the user has entered |
| `form` | `string` | The value of the `form` prop |
| `inputAttrs` | `object` | Object of attributes to apply to the new tag input element via `v-bind="inputAttrs"`. See below for details |
| `inputHandlers` | `object` | Object of event handlers to apply to the new tag input element via `v-on="inputHandlers"`. See below for details |
| `inputId` | `string` | ID to add to the new tag input element. Defaults to prop `input-id`. If not provided a unique ID is auto-generated. Also available via 'inputAttrs.id' |
| `inputType` | `InputType` | Type of input to render (normalized version of prop `input-type`) |
| `invalidTagText` | `string` | The value of the `invalid-tag-text` prop |
| `invalidTags` | `string[]` | Array of the invalid tag(s) the user has entered |
| `isDuplicate` | `boolean` | `true` if the user input contains duplicate tag(s) |
| `isInvalid` | `boolean` | `true` if the user input contains invalid tag(s) |
| `isLimitReached` | `boolean` | `true` if a `limit` is configured and the amount of tags has reached the limit |
| `limitTagsText` | `boolean` | The value of the `limit-tags-text` prop |
| `limit` | `number` | The value of the `limit` prop |
| `noTagRemove` | `boolean` | The value of the `no-tag-remove` prop |
| `placeholder` | `string` | The value of the `placeholder` prop |
| `removeTag` | `(tag?: string) => void` | Method to remove a tag. Accepts one argument which is the tag value to remove |
| `required` | `boolean` | The value of the `required` prop |
| `separator` | `string | readonly string[]` | The value of the `separator` prop |
| `size` | `Size` | The value of the `size` prop |
| `state` | `ValidationState` | The contextual state of the component. Value of the `state` prop. Possible values are `true`, `false`, or `null` |
| `tagClass` | `ClassValue` | The value of the `tag-variant` prop. Class (or classes) to apply to the tag elements |
| `tagPills` | `boolean` | The value of the `tag-pills` prop |
| `tagRemoveLabel` | `string` | Value of the `tag-remove-label` prop. Used as the `aria-label` attribute on the remove button of tags |
| `tagVariant` | `ColorVariant | null` | Value of the `tag-variant` prop |
| `tags` | `string[]` | Array of current tag strings |

#### `inputAttrs` object properties [​](#inputattrs-object-properties)

The `inputAttrs` object contains attributes to bind (`v-bind`) to the new tag input element.

| Property | Type | Description |
| --- | --- | --- |
| disabled | `boolean` | The `disabled` attribute for the new tag input. Value of the `disabled` prop |
| form | `string` | The value of the `form` prop |
| id | `string` | The `id` attribute for the new tag input |
| value | `string` | The `value` attribute for the new tag input |

The `inputAttrs` object will also include any attributes set via the `input-attrs` prop. Note that the above attributes take precedence over any of the same attributes specified in the `input-attrs` prop.

#### `inputHandlers` object properties [​](#inputhandlers-object-properties)

The `inputHandlers` object contains event handlers to bind (`v-on`) to the new tag input element.

| Property | Type | Description |
| --- | --- | --- |
| `change` | `(e: Readonly<Event> | string) => void` | Event handler for the input element `change` event. Accepts a single argument of either an event object or a string. Change will trigger adding the tag. |
| `input` | `(e: Readonly<Event> | string) => void` | Event handler for the input element `input` event. Accepts a single argument of either an event object or a string. Updates the internal v-model for the new tag input element |
| `keydown` | `(e: Readonly<KeyboardEvent>) => void` | Event handler for the input element keydown `Enter` and `Del` events. Accepts a single argument which is the native keydown event object |

The `change` handler, when needed, must be enabled via the `add-on-change` prop, otherwise it is a noop method.

### Using native browser inputs [​](#using-native-browser-inputs)

The scope contains attributes and event handlers that can be directly bound to native `<input>` or `<select>` elements.

The following example includes the suggested ARIA attributes and roles needed for screen-reader support.

apple, orange, banana, pear, peach

(Tag removed)

Add

-   **apple**remove
    
-   **orange**remove
    
-   **banana**remove
    
-   **pear**remove
    
-   **peach**remove
    

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormTags
      v-model="value"
      no-outer-focus
      class="mb-2"
    >
      <template #default="{tags, inputAttrs, inputHandlers, addTag, removeTag}">
        <BInputGroup aria-controls="my-custom-tags-list">
          <input
            v-bind="inputAttrs"
            placeholder="New tag - Press enter to add"
            class="form-control"
            v-on="inputHandlers"
          />
          <BInputGroupText>
            <BButton
              variant="primary"
              @click="addTag()"
              >Add</BButton
            >
          </BInputGroupText>
        </BInputGroup>
        <ul
          id="my-custom-tags-list"
          class="list-unstyled d-inline-flex flex-wrap mb-0"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions removals"
        >
          <!-- Always use the tag value as the :key, not the index! -->
          <!-- Otherwise screen readers will not read the tag additions and removals correctly -->
          <BCard
            v-for="tag in tags"
            :id="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
            :key="tag"
            tag="li"
            class="mt-1 me-1"
            body-class="py-1 pe-2 text-nowrap"
          >
            <strong>{{ tag }}</strong>
            <BButton
              variant="link"
              size="sm"
              :aria-controls="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
              @click="removeTag(tag)"
              >remove</BButton
            >
          </BCard>
        </ul>
      </template>
    </BFormTags>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>(['apple', 'orange', 'banana', 'pear', 'peach'])
</script>
```

### Using custom form components [​](#using-custom-form-components)

The scope contains attributes and event handlers that can be directly bound to most custom inputs or select components (the event handlers accept either a string tag value or a native event object). Any component that emits `input` as characters are typed, and (optionally) emits `change` when the input value changes (i.e on blur or select), and uses the prop `value` as the v-model, should work without modification.

In this example, we are using the [`<BFormTag>` helper component](#bformtag-helper-component), but feel free to render tags using standard HTML or components.

apple, orange, banana

(Tag removed)

Add

appleorangebanana

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormTags
      v-model="value"
      no-outer-focus
      class="mb-2"
    >
      <template #default="{tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag}">
        <BInputGroup class="mb-2">
          <BFormInput
            v-bind="inputAttrs"
            placeholder="New tag - Press enter to add"
            class="form-control"
            v-on="inputHandlers"
          />
          <BInputGroupText>
            <BButton
              variant="primary"
              @click="addTag()"
              >Add</BButton
            >
          </BInputGroupText>
        </BInputGroup>
        <div
          class="d-inline-block"
          style="font-size: 1.5rem"
        >
          <BFormTag
            v-for="tag in tags"
            :key="tag"
            :title="tag"
            :variant="tagVariant"
            class="me-1"
            @remove="removeTag(tag)"
            >{{ tag }}</BFormTag
          >
        </div>
      </template>
    </BFormTags>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>(['apple', 'orange', 'banana'])
</script>
```

The following is an example of using a custom select component for choosing from a pre-defined set of tags:

Tagged input using select

(Tag removed)

Choose a tag... AppleOrangeBananaLimePeachChocolateStrawberry

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormGroup
      label="Tagged input using select"
      label-for="tags-component-select"
    >
      <!-- Prop `add-on-change` is needed to enable adding tags vie the `change` event -->
      <BFormTags
        id="tags-component-select"
        v-model="value"
        size="lg"
        class="mb-2"
        add-on-change
        no-outer-focus
      >
        <template #default="{tags, inputAttrs, disabled, addTag, removeTag}">
          <ul
            v-if="tags.length > 0"
            class="list-inline d-inline-block mb-2"
          >
            <li
              v-for="tag in tags"
              :key="tag"
              class="list-inline-item"
            >
              <BFormTag
                :title="tag"
                :disabled="disabled"
                variant="info"
                @remove="removeTag(tag)"
                >{{ tag }}</BFormTag
              >
            </li>
          </ul>
          <BFormSelect
            v-bind="inputAttrs"
            :disabled="disabled || availableOptions.length === 0"
            :options="availableOptions"
            @update:model-value="addTag($event as string)"
          >
            <template #first>
              <!-- This is required to prevent bugs with Safari -->
              <option
                disabled
                value=""
              >
                Choose a tag...
              </option>
            </template>
          </BFormSelect>
        </template>
      </BFormTags>
    </BFormGroup>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const value = ref<string[]>([])
const options = ref<string[]>([
  'Apple',
  'Orange',
  'Banana',
  'Lime',
  'Peach',
  'Chocolate',
  'Strawberry',
])

const availableOptions = computed(() =>
  options.value.filter((opt) => value.value.indexOf(opt) === -1)
)
</script>
```

If the custom input is using custom event names that mimic `input` and `change`, or `keydown`, you can do something similar to below to bind the event handlers:

template

```
<template #default="{inputAttrs, inputHandlers, removeTag, tags}">
  <custom-input
    :id="inputAttrs.id"
    :custom-value-prop="inputAttrs.value"
    @custom-input-event="inputHandlers.input($event)"
    @custom-change-event="inputHandlers.change($event)"
    @custom-keydown-event="inputHandlers.keydown($event)"
  />
  <template v-for="tag in tags">
    <!-- Your custom tag list here -->
  </template>
</template>
```

The `inputHandlers.input` handler must be bound to an event that updates with each character entered by the user for the _as-you-type_ tag validation to work.

### Advanced custom rendering usage [​](#advanced-custom-rendering-usage)

In situations where the `inputHandlers` will not work with your custom input, or if you need greater control over tag creation, you can take advantage of the additional properties provided via the default slot's scope.

Disable

(Tag removed)

Add

Duplicate tag value cannot be added again!

There are no tags specified. Add a new tag above.

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormCheckbox
      v-model="disabled"
      switch
      size="lg"
      >Disable</BFormCheckbox
    >
    <BFormTags
      v-model="tags"
      tag-variant="success"
      class="mb-2 mt-2"
      :disabled="disabled"
      no-outer-focus
      placeholder="Enter a new tag value and click Add"
      :state="state"
      @update:model-value="resetInputValue()"
    >
      <template
        #default="{
          tags: innerTags,
          inputId,
          placeholder,
          disabled: innerDisabled,
          addTag,
          removeTag,
        }"
      >
        <BInputGroup>
          <!-- Always bind the id to the input so that it can be focused when needed -->
          <BFormInput
            :id="inputId"
            v-model="newTag"
            :placeholder="placeholder"
            :disabled="innerDisabled"
            :formatter="formatter"
          />
          <BInputGroupText>
            <BButton
              :disabled="innerDisabled || state === false"
              variant="primary"
              @click="addTag(newTag)"
              >Add</BButton
            >
          </BInputGroupText>
        </BInputGroup>
        <BFormInvalidFeedback :state="state">
          Duplicate tag value cannot be added again!
        </BFormInvalidFeedback>
        <ul
          v-if="innerTags.length > 0"
          class="mb-0"
        >
          <li
            v-for="tag in innerTags"
            :key="tag"
            :title="`Tag: ${tag}`"
            class="mt-2"
          >
            <span class="d-flex align-items-center">
              <span class="me-2">{{ tag }}</span>
              <BButton
                :disabled="disabled"
                size="sm"
                variant="outline-danger"
                @click="removeTag(tag)"
              >
                remove tag
              </BButton>
            </span>
          </li>
        </ul>
        <BFormText v-else> There are no tags specified. Add a new tag above. </BFormText>
      </template>
    </BFormTags>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const tags = ref<string[]>([])
const newTag = ref<string>('')
const disabled = ref<boolean>(false)
const state = computed(() =>
  // Return false (invalid) if new tag is a duplicate
  tags.value.indexOf(newTag.value.trim()) > -1 ? false : null
)
const resetInputValue = () => {
  newTag.value = ''
}
const formatter = (value: string) => value.toUpperCase()
</script>
```

The following is an example of using the `<BDropdown>` component for choosing or searching from a pre-defined set of tags:

Tagged input using dropdown

(Tag removed)

🔍 Choose tags

-   Search tags
    
-   * * *
    
-   Apple
-   Orange
-   Banana
-   Lime
-   Peach
-   Chocolate
-   Strawberry

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormGroup
      label="Tagged input using dropdown"
      label-for="tags-with-dropdown"
    >
      <BFormTags
        id="tags-with-dropdown"
        v-model="value"
        no-outer-focus
        class="mb-2"
      >
        <template #default="{tags, disabled, addTag, removeTag}">
          <ul
            v-if="tags.length > 0"
            class="list-inline d-inline-block mb-2"
          >
            <li
              v-for="tag in tags"
              :key="tag"
              class="list-inline-item"
            >
              <BFormTag
                :title="tag"
                :disabled="disabled"
                variant="info"
                @remove="removeTag(tag)"
                >{{ tag }}</BFormTag
              >
            </li>
          </ul>

          <BDropdown
            size="sm"
            variant="outline-secondary"
            block
            menu-class="w-100"
            no-caret
          >
            <template #button-content> &#x1f50d; <span>Choose tags</span> </template>
            <BDropdownForm @submit.stop.prevent="() => {}">
              <BFormGroup
                label="Search tags"
                label-for="tag-search-input"
                label-cols-md="auto"
                class="mb-0"
                label-size="sm"
                :description="searchDesc"
                :disabled="disabled"
              >
                <BFormInput
                  id="tag-search-input"
                  v-model="search"
                  type="search"
                  size="sm"
                  autocomplete="off"
                />
              </BFormGroup>
            </BDropdownForm>
            <BDropdownDivider />
            <BDropdownItemButton
              v-for="option in availableOptions"
              :key="option"
              @click="onOptionClick({option, addTag})"
            >
              {{ option }}
            </BDropdownItemButton>
            <BDropdownText v-if="availableOptions.length === 0">
              There are no tags available to select
            </BDropdownText>
          </BDropdown>
        </template>
      </BFormTags>
    </BFormGroup>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const options = ref<string[]>([
  'Apple',
  'Orange',
  'Banana',
  'Lime',
  'Peach',
  'Chocolate',
  'Strawberry',
])
const search = ref<string>('')
const value = ref<string[]>([])

const criteria = computed(() => search.value.trim().toLowerCase())

const availableOptions = computed(() => {
  const searchCriteria = criteria.value

  // Filter out already selected options
  const optionsFiltered = options.value.filter((opt) => value.value.indexOf(opt) === -1)
  if (searchCriteria) {
    // Show only options that match criteria
    return optionsFiltered.filter((opt) => opt.toLowerCase().indexOf(searchCriteria) > -1)
  }
  // Show all options available
  return optionsFiltered
})

const searchDesc = computed(() => {
  if (criteria.value && availableOptions.value.length === 0) {
    return 'There are no tags matching your search criteria'
  }
  return ''
})

const onOptionClick = ({option, addTag}: {option: string; addTag: (tag: string) => void}) => {
  addTag(option)
  search.value = ''
}
</script>
```

### Creating wrapper components [​](#creating-wrapper-components)

You can easily create a custom wrapper component with your preferred rendering style as follows:

vue

```
<!-- eslint-disable vue/no-unused-vars -->
<template>
  <BFormTags :value="modelValue">
    <template #default="{tags, addTag, removeTag, inputAttrs, inputHandlers}">
      <!-- Place your custom rendering here -->
    </template>
  </BFormTags>
</template>

<script setup lang="ts">
const modelValue = defineModel<string[]>({
  default: () => [],
})
</script>
```

## `<BFormTag>` helper component [​](#bformtag-helper-component)

BootstrapVueNext provides the helper component `<BFormTag>`, for use with the default scoped slot of `<BFormTags>`. The component is based upon [`<BBadge>`](/bootstrap-vue-next/docs/components/badge.html) and [`<BButton>`](/bootstrap-vue-next/docs/components/button.html).

`<BFormTag>` supports the same variants as `<BBadge>` and also supports pill styling. Sizing is based on the containing element's font-size.

The remove event is emitted when the `<BFormTag>` remove button is clicked.

Tags that are too wide for their parent container will automatically have their text content truncated with an ellipsis. For this reason, it is always good practice to supply a title via the title prop when using the default slot of `<BFormTag>` for the tag content.

Note `<BFormTag>` requires BootstrapVueNext's custom CSS/SCSS for proper styling.

## Component Reference

### `<BFormTags>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormTags/BFormTags.vue)

-   [<BFormTags> Properties](#comp-reference-bformtags-properties)
-   [<BFormTags> Events](#comp-reference-bformtags-events)
-   [<BFormTags> Slots](#comp-reference-bformtags-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑tags`

##### [Properties](#comp-reference-bformtags-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| no-remove | `boolean` | `false` | When set, the tag will not have a remove button |
| pill | `boolean` | `false` | Makes the tag have a pill appearance |
| remove-label | `string` | `'Remove tag'` | The value of the 'aria-label' attribute on the remove button in the tag |
| tag | `string` | `'<span>'` | Specify the HTML tag to render instead of the default tag |
| title | `string` | `undefined` | Value to place in the 'title' attribute of the tag. Will also be used for the tag content if no default slot provided |
| variant | `ColorVariant | null` | `'secondary'` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Events](#comp-reference-bformtags-events)

| Event | Args | Description |
| --- | --- | --- |
| remove | 
`remove``: string` - Text of the tag to remove

 | Emitted when the remove button is clicked |

##### [Slots](#comp-reference-bformtags-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the tag. Overrides the \`title\` prop |

### `<BFormTag>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormTags/BFormTag.vue)

-   [<BFormTag> Properties](#comp-reference-bformtag-properties)
-   [<BFormTag> Events](#comp-reference-bformtag-events)
-   [<BFormTag> Slots](#comp-reference-bformtag-slots)
-   [<BFormTag> Exposed](#comp-reference-bformtag-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑tag`

##### [Properties](#comp-reference-bformtag-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| add-button-text | `string` | `'Add'` | Text for the built-in 'Add' button. Slot \`add-button-text\` takes precedence |
| add-button-variant | `ButtonVariant | null` | `'outline-secondary'` | Applies one of the Bootstrap theme color variants to the 'Add' button |
| add-on-change | `boolean` | `false` | When set, enables adding the tag on the input's 'change' event |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| duplicate-tag-text | `string` | `'Duplicate tag(s)'` | The message when duplicate tags are detected. Set to an empty string to disable the message |
| feedback-aria-live | `string` | `''assertive''` | Value to use for the \`aria-live\` attribute on the feedback text |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| ignore-input-focus-selector | `string | readonly string[]` | `'['.b-form-tag', 'button', 'input', 'select']'` | Ignore certain elements from the click to focus input routine, specified by CSS selector(s) |
| input-attrs | `Readonly<AttrsValue>` | `undefined` | Additional attributes to apply to the new tag input element |
| input-class | `ClassValue` | `undefined` | Class (or classes) to apply to the new tag input element |
| input-id | `string` | `undefined` | ID to apply to the new tag input element. If not provided, a unique ID will be auto generated |
| input-type | `InputType` | `'text'` | Specifies the type of input to use: 'text', 'email', 'tel', 'url', or 'number'. Default is 'text' |
| invalid-tag-text | `string` | `'Invalid tag(s)'` | The error message when invalid tags are detected. Set to an empty string to disable the message |
| limit | `Numberish` | `undefined` | The maximum number of tags that can be added. The limit can still be exceeded if manipulated outside of the component |
| limit-tags-text | `string` | `'Tag limit reached'` | The message when the limit is reached. Set to an empty string to disable the message |
| model-value | `string[]` | `'() => []'` |  |
| name | `string` | `undefined` | Sets the value of the 'name' attribute on the form control. When set, creates a hidden input for each tag |
| no-add-on-enter | `boolean` | `false` | When set, disables adding the tag on the input's 'keydown.enter' event |
| no-outer-focus | `boolean` | `false` | When set, disables the focus styling of the component root element |
| no-tag-remove | `boolean` | `false` | When set, the tags will not have a remove button |
| placeholder | `string` | `'Add tag...'` | Sets the \`placeholder\` attribute value on the form control |
| remove-on-delete | `boolean` | `false` | When set, enables removal of last tag in tags when user presses delete or backspace and the input is empty |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| separator | `string | readonly string[]` | `undefined` | Separator character(s) that will trigger a tag to be created |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| tag-class | `ClassValue` | `undefined` | Class (or classes) to apply to the tags |
| tag-pills | `boolean` | `false` | Makes the built-in tags have a pill appearance |
| tag-remove-label | `string` | `undefined` | The value of the 'aria-label' attribute on the remove button in the tag |
| tag-removed-label | `string` | `'Tag removed'` |  |
| tag-validator | `(t: string) => boolean` | `'() => true'` | Optional tag validator method. Passed a single argument of tag being added. Should return 'true' if the tag passes validation, or 'false' if the tag cannot be added |
| tag-variant | `ColorVariant | null` | `'secondary'` | Applies one of the Bootstrap theme color variants to the tags |

##### [Events](#comp-reference-bformtag-events)

| Event | Args | Description |
| --- | --- | --- |
| blur | 
`event``: FocusEvent` - Native blur event (before any formatting)

 | Emitted when component loses focus |
| focus | 

`event``: FocusEvent` - Native focus event (before any formatting)

 | Emitted when component gains focus |
| focusin | 

`event``: FocusEvent` - Native focusin event (before any formatting)

 | Emitted when internal elements of component gain focus |
| focusout | 

`event``: FocusEvent` - Native focusout event (before any formatting)

 | Emitted when internal elements of component lose focus |
| tag-added | 

`value``: string[]` - Array of tag(s) that were successfully added

 | Emitted when one or more tags have been added |
| tag-state | 

`valid-tags``: Array` - Array of new tag(s) added (or that will be added). Will be zero length if no tags added

`invalid-tags``: Array` - Array of tag(s) that cannot be added because they did not pass validation. Will be zero length if no invalid tags

`duplicate-tags``: Array` - Array of tag(s) that cannot be added because they would be a duplicate tag. Will be zero length if no duplicate tags

 | Emitted when tags in the user input are parsed |
| update:model-value | 

`value``: Array` - Array of current tags

 | Emitted when the tags change. Updates the v-model |

##### [Slots](#comp-reference-bformtag-slots)

| Name | Scope | Description |
| --- | --- | --- |
| add-button-text |  | Content to place in the built-in 'Add' button. Takes precedence over the 'add-button-text' prop. Not used when the default scoped slot is provided |
| default | 
`add-button-text``: string` - Value of the 'add-button-text' prop

`add-button-variant``: string` - Value of the 'add-button-variant' prop

`add-tag``: (tag?: string) => void` - Method to add a new tag. Assumes the tag is the value of the input, but optionally accepts one argument which is the tag value to be added

`disable-add-button``: boolean` - Will be \`true\` if the tag(s) in the input cannot be added (all invalid and/or duplicates)

`disabled``: boolean` - If the component is in the disabled state. Value of the 'disabled' prop

`duplicate-tag-text``: string` - The value of the 'duplicate-tag-text' prop

`duplicate-tags``: Array` - Array of duplicate tag(s) that could not be added

`form``: string` - Value of the 'form' prop

`input-attrs``: Record<string, unknown>` - Object of attributes to apply to native input elements via 'v-bind="inputAttrs"'

`input-class``: ClassValue` - Class (or classes) to apply to the new tag input element. Value of the 'input-class' prop

`input-handlers``: Object` - Object of event handlers to apply to native input elements via 'v-on="inputHandlers"'

`input-id``: string` - ID to add to the new tag input element. Defaults to prop 'input-id'. If not provided a unique ID is auto-generated. Also available via 'inputAttrs.id'

`input-type``: InputType` - The type of input to use: 'text', 'email', 'tel', 'url', or 'number'. Default is 'text'. Normalized value of the 'input-type' prop

`invalid-tag-text``: string` - The value of the 'invalid-tag-text' prop

`invalid-tags``: Array` - Array of invalid tag(s) that could not be added. Requires a validator function via the 'tag-validator' prop

`is-duplicate``: boolean` - Will be \`true\` if the user has attempted to add duplicate tag(s)

`is-invalid``: boolean` - Will be \`true\` if the input has invalid tag(s). Requires a validator function via the 'tag-validator' prop

`is-limit-reached``: boolean` - Will be \`true\` if the input has reached the maximum number of tags defined by the 'limit' prop

`limit-tags-text``: string` - The value of the 'limit-tag-text' prop

`no-tag-remove``: boolean` - The value of the 'no-tag-remove' prop

`placeholder``: string` - The value of the 'placeholder' prop

`remove-tag``: (tag?: string) => void` - Method to remove a tag. Accepts one argument which is the tag value to remove

`required``: boolean` - Value of the 'required' prop

`separator``: string | readonly string[]` - The value of the 'separator' prop

`size``: Size` - The value of the 'size' prop

`state``: ValidationState` - The contextual state of the component. Value of the 'state' prop. Possible values are true, false or null

`tag-class``: ClassValue` - Class (or classes) to apply to the tag elements. Value of the 'tag-class' prop

`tag-pills``: boolean` - Value of the \`tag-pills\` prop

`tag-remove-label``: string` - ARIA label for the remove button on tags. Value of the 'tag-remove-label' prop

`tag-removed-label``: string` - Value of the 'tag-removed-label' prop

`tag-validator``: (t: string) => boolean` - Value of the 'tag-validator' prop

`tag-variant``: ColorVariant | null` - Value of the 'tag-variant' prop

 | Slot to override the default rendering of the tags component |
| tag | 

`tag``: string` - Value of the tag

`tag-class``: ClassValue` - Class (or classes) to apply to the tag element

`tag-variant``: ColorVariant | null` - Color variant to apply to the tag

`tag-pills``: boolean` - Render the tag as a pill

`remove-tag``: (tag?: string) => void` - Method to remove a tag. Accepts one argument which is the tag value to remove

 | Slot to override the default rendering of an individual tag |

##### [Exposed](#comp-reference-bformtag-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the tags input |
| element | `HTMLInputElement` | Reference to the underlying input element |
| focus | `() => void` | Sets focus on the tags input |
| inputValue | `Ref<string>` | Reactive reference to the current input value |
