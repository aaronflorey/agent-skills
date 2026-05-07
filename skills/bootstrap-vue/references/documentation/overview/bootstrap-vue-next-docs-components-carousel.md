# Carousel ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/carousel.html

##### On this page

-   [Basic usage ​](#basic-usage)
    -   [Sizing ​](#sizing)
        
    -   [Responsive images ​](#responsive-images)
        
    -   [Indicators ​](#indicators)
        
    -   [Captions ​](#captions)
        
    -   [Crossfade ​](#crossfade)
        
-   [Autoplaying Carousels ​](#autoplaying-carousels)
    -   [Ride ​](#ride)
        
    -   [Interval ​](#interval)
        
    -   [Autoplay Reverse ​](#autoplay-reverse)
        
    -   [Autoplay Manipulation ​](#autoplay-manipulation)
        
-   [Touch Swiping ​](#touch-swiping)
    -   [Touch Threshold ​](#touch-threshold)
        
-   [Usage With v-model ​](#usage-with-v-model)
    -   [Changing the Starting Slide ​](#changing-the-starting-slide)
        
-   [Handling navigation events ​](#handling-navigation-events)
    
-   [Exposed Methods ​](#exposed-methods)
    
-   [Full Example ​](#full-example)
    
-   [Component Reference](#component-reference)
    -   [<BCarousel>](#b-carousel)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BCarouselSlide>](#b-carousel-slide)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Carousel [​](#carousel)

The carousel is a slideshow for cycling through a series of content. It works with a series of images, text, or custom markup. It also includes support for previous/next controls and indicators. Nested carousels are not supported. You should also be aware that carousels in general can often cause usability and accessibility challenges.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCarousel/BCarousel.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/carousel.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bcarousel)

## Basic usage [​](#basic-usage)

![](https://picsum.photos/1024/480/?image=1)

![](https://picsum.photos/1024/480/?image=2)

![](https://picsum.photos/1024/480/?image=3)

PreviousNext

HTML StackBlitz

template

```
<BCarousel controls>
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=1" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=2" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=3" />
</BCarousel>
```

### Sizing [​](#sizing)

Carousels don't automatically normalize slide dimensions. As such, you may need to use additional utilities or custom styles to appropriately size content. When using images in each slide, ensure they all have the same dimensions (or aspect ratio).

When using `img-src` or `img-blank` on `<BCarouselSlide>`, you can set the image width and height via the `img-width` and `img-height` props on `<BCarousel>` and have these values automatically applied to each `carousel-slide` image.

Note that images will still be responsive and automatically grow or shrink to fit within the width of its parent container.

Internally, `<BCarouselSlide>` uses the [`<BImg>`](/bootstrap-vue-next/docs/components/image.html) component to render the images. The `img-*` props map to the corresponding props available to `<BImg>`.

### Responsive images [​](#responsive-images)

Use the `img-srcset` prop on `<BCarouselSlide>` to provide a comma-separated list of candidate image sources, letting the browser pick the best fit for the current viewport and pixel density. This pairs naturally with `img-src` (which acts as the fallback).

![](https://picsum.photos/1200/480?image=40)

### First slide

![](https://picsum.photos/1200/480?image=41)

### Second slide

![](https://picsum.photos/1200/480?image=42)

### Third slide

PreviousNext

HTML StackBlitz

template

```
<BCarousel controls indicators :interval="0">
  <BCarouselSlide
    caption="First slide"
    img-src="https://picsum.photos/1200/480?image=40"
    img-srcset="https://picsum.photos/400/160?image=40 400w,
                https://picsum.photos/800/320?image=40 800w,
                https://picsum.photos/1200/480?image=40 1200w"
  />
  <BCarouselSlide
    caption="Second slide"
    img-src="https://picsum.photos/1200/480?image=41"
    img-srcset="https://picsum.photos/400/160?image=41 400w,
                https://picsum.photos/800/320?image=41 800w,
                https://picsum.photos/1200/480?image=41 1200w"
  />
  <BCarouselSlide
    caption="Third slide"
    img-src="https://picsum.photos/1200/480?image=42"
    img-srcset="https://picsum.photos/400/160?image=42 400w,
                https://picsum.photos/800/320?image=42 800w,
                https://picsum.photos/1200/480?image=42 1200w"
  />
</BCarousel>
```

### Indicators [​](#indicators)

With the `indicators` prop, can add indicators to the Carousel, along side the previous/next controls. The indicators let users jump to a particular slide.

![](https://picsum.photos/1024/480/?image=4)

![](https://picsum.photos/1024/480/?image=5)

![](https://picsum.photos/1024/480/?image=6)

HTML StackBlitz

template

```
<BCarousel indicators>
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=4" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=5" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=6" />
</BCarousel>
```

### Captions [​](#captions)

You can add captions to a particular slide using the following methods: using the `caption` prop, that will render its text, by using `captionHtml` prop, which will render html, or by using the `caption` _slot_.

![](https://picsum.photos/1024/480/?image=7)

### First Caption

![](https://picsum.photos/1024/480/?image=9)

### Second Caption

PreviousNext

HTML StackBlitz

template

```
<BCarousel
  controls
  indicators
>
  <BCarouselSlide
    img-src="https://picsum.photos/1024/480/?image=7"
    caption="First Caption"
  />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=9">
    <template #caption> Second Caption </template>
  </BCarouselSlide>
</BCarousel>
```

### Crossfade [​](#crossfade)

You can use the `fade` prop to animate slides with a fade transition instead of a slide.

![](https://picsum.photos/1024/480/?image=10)

![](https://picsum.photos/1024/480/?image=11)

![](https://picsum.photos/1024/480/?image=12)

PreviousNext

HTML StackBlitz

template

```
<BCarousel
  fade
  controls
  indicators
>
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=10" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=11" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=12" />
</BCarousel>
```

## Autoplaying Carousels [​](#autoplaying-carousels)

You can make your Carousels autoplay on a page load by setting the `ride` prop to `carousel`. Autoplaying Carousels are automatically paused when hovering with a mouse. You can disable pausing during hover by using the `noHoverPause` prop.

For accessibility reasons, we recommend avoiding the use of autoplaying carousels. If your page does include an autoplaying carousel, we recommend providing an additional button or control to explicitly pause/stop the carousel.

See [WCAG 2.1 Success Criterion 2.2.2 Pause, Stop, Hide.](https://www.w3.org/TR/WCAG21/#pause-stop-hide),

Related: [Autoplay Manipulation](#autoplay-manipulation),

### Ride [​](#ride)

![](https://picsum.photos/1024/480/?image=13)

![](https://picsum.photos/1024/480/?image=14)

![](https://picsum.photos/1024/480/?image=15)

PreviousNext

HTML StackBlitz

template

```
<BCarousel
  controls
  indicators
  ride="carousel"
>
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=13" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=14" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=15" />
</BCarousel>
```

When the `ride` prop is set to `true`, rather than `carousel`, the Carousel will not automatically start to cycle on page load. Instead, it will only start after the first user interaction.

![](https://picsum.photos/1024/480/?image=16)

![](https://picsum.photos/1024/480/?image=17)

![](https://picsum.photos/1024/480/?image=18)

PreviousNext

HTML StackBlitz

template

```
<BCarousel
  controls
  indicators
  :ride="true"
>
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=16" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=17" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=18" />
</BCarousel>
```

### Interval [​](#interval)

You can adjust the speed at which the Carousel is moving by adjusting the interval in real time. The default is `5000ms`. You can also set intervals per slide by setting the `interval` prop on the slide

![](https://picsum.photos/1024/480/?image=19)

![](https://picsum.photos/1024/480/?image=20)

![](https://picsum.photos/1024/480/?image=21)

PreviousNext

Minus 1000 Plus 1000

Current Interval Speed: 5000 ms

HTML StackBlitz

vue

```
<template>
  <BCarousel
    :interval="slideInterval"
    controls
    indicators
    ride="carousel"
  >
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=19" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=20" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=21" />
  </BCarousel>

  <BButtonGroup>
    <BButton
      variant="danger"
      @click="slideInterval = slideInterval - 1000"
    >
      Minus 1000
    </BButton>
    <BButton
      variant="success"
      @click="slideInterval = slideInterval + 1000"
    >
      Plus 1000
    </BButton>
  </BButtonGroup>

  Current Interval Speed: {{ slideInterval }} ms
</template>

<script setup lang="ts">
import {ref} from 'vue'

const slideInterval = ref(5000)
</script>
```

### Autoplay Reverse [​](#autoplay-reverse)

You can use the `ride-reverse` prop to reverse the direction that the Carousel will autoplay.

![](https://picsum.photos/1024/480/?image=22)

![](https://picsum.photos/1024/480/?image=23)

![](https://picsum.photos/1024/480/?image=24)

PreviousNext

HTML StackBlitz

template

```
<BCarousel
  controls
  indicators
  ride="carousel"
  :ride-reverse="true"
>
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=22" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=23" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=24" />
</BCarousel>
```

### Autoplay Manipulation [​](#autoplay-manipulation)

There can come situations where you need to manually pause/resume the state of an autoplay. BCarousel exposes two functions for this: `pause(), resume()`. These are accessed through the [template ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs).

![](https://picsum.photos/1024/480/?image=25)

![](https://picsum.photos/1024/480/?image=26)

![](https://picsum.photos/1024/480/?image=27)

PreviousNext

PauseResume

HTML StackBlitz

vue

```
<template>
  <BCarousel
    ref="myCarousel"
    :interval="2500"
    controls
    indicators
    ride="carousel"
  >
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=25" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=26" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=27" />
  </BCarousel>

  <BButtonGroup>
    <BButton
      variant="danger"
      @click="pause"
      >Pause</BButton
    >
    <BButton
      variant="success"
      @click="resume"
      >Resume</BButton
    >
  </BButtonGroup>
</template>

<script setup lang="ts">
import {BCarousel} from 'bootstrap-vue-next/components/BCarousel'
import {useTemplateRef} from 'vue'

const myCarousel = useTemplateRef('myCarousel')
const pause = () => myCarousel.value?.pause()
const resume = () => myCarousel.value?.resume()
</script>
```

## Touch Swiping [​](#touch-swiping)

BCarousel comes with automatic support for touch swiping devices. You can disable touch swiping by using the `no-touch` prop.

Due to touch swiping not being available to everyone, such as a user that is using a mouse, you will likely want to include multiple ways to transition the slides. Otherwise, transitioning can be impossible to those users.

![](https://picsum.photos/1024/480/?image=28)

![](https://picsum.photos/1024/480/?image=29)

![](https://picsum.photos/1024/480/?image=30)

HTML StackBlitz

template

```
<BCarousel no-touch>
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=28" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=29" />
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=30" />
</BCarousel>
```

### Touch Threshold [​](#touch-threshold)

You can adjust the distance in pixels it takes to cause a transition to occur by using the `touch-threshold` prop. A higher value will mean the user needs to swipe a longer distance in order to trigger a transition.

![](https://picsum.photos/1024/480/?image=31)

![](https://picsum.photos/1024/480/?image=32)

![](https://picsum.photos/1024/480/?image=33)

DecreaseIncrease

Threshold: 50

HTML StackBlitz

vue

```
<template>
  <BCarousel :touch-threshold="slideThreshold">
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=31" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=32" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=33" />
  </BCarousel>
  <BButtonGroup class="mt-3">
    <BButton
      variant="danger"
      @click="slideThreshold = slideThreshold - 10"
      >Decrease</BButton
    >
    <BButton
      variant="success"
      @click="slideThreshold = slideThreshold + 10"
      >Increase</BButton
    >
  </BButtonGroup>
  Threshold: {{ slideThreshold }}
</template>

<script setup lang="ts">
import {ref} from 'vue'
const slideThreshold = ref(50)
</script>
```

## Usage With v-model [​](#usage-with-v-model)

You are not required to, but you can bind the v-model. This allows for finer control and allows for outside manipulation of the slide, beyond the controls exposed through [Exposed Methods](#exposed-methods).

![](https://picsum.photos/1024/480/?image=1)

![](https://picsum.photos/1024/480/?image=2)

![](https://picsum.photos/1024/480/?image=3)

PreviousNext

HTML StackBlitz

vue

```
<template>
  <BCarousel
    v-model="slide"
    controls
  >
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=1" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=2" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=3" />
  </BCarousel>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const slide = ref(0)
</script>
```

### Changing the Starting Slide [​](#changing-the-starting-slide)

You can change the default starting slide by binding the v-model to the index of the slide you want the Carousel to start at.

-   Starts at the last index (2)

![](https://picsum.photos/1024/480/?image=34)

![](https://picsum.photos/1024/480/?image=35)

![](https://picsum.photos/1024/480/?image=36)

HTML StackBlitz

vue

```
<template>
  <BCarousel
    v-model="slide"
    indicators
  >
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=34" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=35" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=36" />
  </BCarousel>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const slide = ref(2)
</script>
```

## Handling navigation events [​](#handling-navigation-events)

`BCarousel` emits `prev-click` and `next-click` events when the user clicks the previous/next controls. These are useful for analytics, logging, or triggering side effects without reading the current slide index. Both events pass the native `MouseEvent`.

Note: these events fire only from the prev/next arrow controls — clicking the indicators or programmatic navigation (via `v-model` or the exposed `next()`/`prev()` methods) will not trigger them.

![](https://picsum.photos/1024/480/?image=50)

### First slide

![](https://picsum.photos/1024/480/?image=51)

### Second slide

![](https://picsum.photos/1024/480/?image=52)

### Third slide

PreviousNext

Previous-click count: 0

Next-click count: 0

Last event: `—`

HTML StackBlitz

vue

```
<template>
  <BCarousel controls :interval="0" @prev-click="onPrev" @next-click="onNext">
    <BCarouselSlide caption="First slide" img-src="https://picsum.photos/1024/480/?image=50" />
    <BCarouselSlide caption="Second slide" img-src="https://picsum.photos/1024/480/?image=51" />
    <BCarouselSlide caption="Third slide" img-src="https://picsum.photos/1024/480/?image=52" />
  </BCarousel>

  <div class="mt-3">
    <div>Previous-click count: {{ prevCount }}</div>
    <div>Next-click count: {{ nextCount }}</div>
    <div>
      Last event: <code>{{ lastEvent || '—' }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const prevCount = ref(0)
const nextCount = ref(0)
const lastEvent = ref('')

const onPrev = () => {
  prevCount.value += 1
  lastEvent.value = 'prev-click'
}
const onNext = () => {
  nextCount.value += 1
  lastEvent.value = 'next-click'
}
</script>
```

## Exposed Methods [​](#exposed-methods)

You can control the carousel programmatically using template ref methods. See the [Component Reference Exposed section](#comp-reference-bcarousel-exposed) for available methods.

![](https://picsum.photos/1024/480/?image=37)

![](https://picsum.photos/1024/480/?image=38)

![](https://picsum.photos/1024/480/?image=39)

Previous SlideNext Slide

HTML StackBlitz

vue

```
<template>
  <BCarousel ref="myCarousel">
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=37" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=38" />
    <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=39" />
  </BCarousel>

  <BButtonGroup class="mt-3">
    <BButton
      variant="danger"
      @click="prev"
      >Previous Slide</BButton
    >
    <BButton
      variant="success"
      @click="next"
      >Next Slide</BButton
    >
  </BButtonGroup>
</template>

<script setup lang="ts">
import {BCarousel} from 'bootstrap-vue-next/components/BCarousel'
import {useTemplateRef} from 'vue'

const myCarousel = useTemplateRef('myCarousel')

const prev = () => myCarousel.value?.prev()
const next = () => myCarousel.value?.next()
</script>
```

## Full Example [​](#full-example)

![](https://picsum.photos/1024/480/?image=40)

# First slide

Some more detailed description or whatever content.

![](https://picsum.photos/1024/480/?image=41)

### Second slide

Does the same, just a bit differently.

![image slot](https://picsum.photos/1024/480/?image=42)

# Third slide

Constains a customized background image

![Blank image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221024%22%20height%3D%22480%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201024%20480%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3Apink%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)

# Fourth slide

No background image

PreviousNext

HTML StackBlitz

template

```
<BCarousel
  controls
  indicators
>
  <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=40">
    <h1>First slide</h1>
    <p>Some more detailed description or whatever content.</p>
  </BCarouselSlide>
  <BCarouselSlide
    caption="Second slide"
    text="Does the same, just a bit differently."
    img-src="https://picsum.photos/1024/480/?image=41"
  />
  <BCarouselSlide>
    <template #img>
      <BImg
        width="1024"
        height="480"
        src="https://picsum.photos/1024/480/?image=42"
        alt="image slot"
      />
    </template>
    <h1>Third slide</h1>
    <p>Constains a customized background image</p>
  </BCarouselSlide>
  <BCarouselSlide
    img-width="1024"
    img-height="480"
    img-blank
    img-blank-color="pink"
    img-alt="Blank image"
  >
    <h1>Fourth slide</h1>
    <p>No background image</p>
  </BCarouselSlide>
</BCarousel>
```

## Component Reference

### `<BCarousel>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCarousel/BCarousel.vue)

-   [<BCarousel> Properties](#comp-reference-bcarousel-properties)
-   [<BCarousel> Events](#comp-reference-bcarousel-events)
-   [<BCarousel> Slots](#comp-reference-bcarousel-slots)
-   [<BCarousel> Exposed](#comp-reference-bcarousel-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.carousel`

##### [Properties](#comp-reference-bcarousel-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| background | `string` | `undefined` | Set the CSS color of the carousel's background |
| controls | `boolean` | `false` | Enable the previous and next controls |
| controls-next-text | `string` | `'Next'` | Set the text for the "Next" control |
| controls-prev-text | `string` | `'Previous'` | Set the text for the "Previous" control |
| fade | `boolean` | `false` | When set, changes the slide animation to a crossfade instead of a sliding effect |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| img-height | `string` | `undefined` | Set the default image 'height' attribute for all b-carousel-slide children |
| img-width | `string` | `undefined` | Set the default image 'width' attribute for all b-carousel-slide children |
| indicators | `boolean` | `false` | Enable the indicator buttons for jumping to specific slides |
| indicators-button-label | `string` | `'Slide'` | Set the aria-label for the indicator buttons |
| interval | `number` | `5000` | Set the delay time (in milliseconds) between slides |
| keyboard | `boolean` | `true` | Enable keyboard navigation with the right and left arrow keys |
| label-indicators | `string` | `'Select a slide to display'` | Set the aria-label for the indicators |
| model-value | `number` | `0` | The index of the currently active slide |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-hover-pause | `boolean` | `false` | When set, disables the pausing of the slide show when the current slide is hovered |
| no-touch | `boolean` | `false` | Disable controlling the slides via touch swipes |
| no-wrap | `boolean` | `false` | Do not restart the slide show when the end is reached |
| ride | `boolean | 'carousel'` | `false` | Set to "carousel" to animate slides automatically, true to animate on first interaction, false to disable animation |
| ride-reverse | `boolean` | `false` | When set, the carousel will animate in the reverse direction |
| touch-threshold | `Numberish` | `50` | The minimum distance the touch swipe must move to prevent the slide show from being paused |

##### [Events](#comp-reference-bcarousel-events)

| Event | Args | Description |
| --- | --- | --- |
| next-click | 
`click``: MouseEvent` - Native click event

 | Emitted when the next slide control is clicked |
| prev-click | 

`click``: MouseEvent` - Native click event

 | Emitted when the previous slide control is clicked |
| slid | 

`value``: BvCarouselEvent` - Indicates the slide \`direction\`, \`from\`, and \`to\` indices

 | Fired when the carousel has completed its slide transition. |
| slide | 

`value``: BvCarouselEvent` - Indicates the slide \`direction\`, \`from\`, and \`to\` indices

 | Fires immediately when the carousel starts its slide transition. |
| update:model-value | 

`update:model-value``: number` - modelValue

 | Standard event to update the v-model |

##### [Slots](#comp-reference-bcarousel-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (slides) to place in the carousel |

##### [Exposed](#comp-reference-bcarousel-exposed)

| Name | Type | Description |
| --- | --- | --- |
| next | `() => void` | Goes to the next slide |
| pause | `() => void` | Pauses the automatic cycling of slides |
| prev | `() => void` | Goes to the previous slide |
| resume | `() => void` | Resumes the automatic cycling of slides |

### `<BCarouselSlide>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCarousel/BCarouselSlide.vue)

-   [<BCarouselSlide> Properties](#comp-reference-bcarouselslide-properties)
-   [<BCarouselSlide> Slots](#comp-reference-bcarouselslide-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.carousel‑item`

##### [Properties](#comp-reference-bcarouselslide-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| background | `string` | `undefined` | CSS color to use as the slide's background color |
| caption | `string` | `undefined` | Text content to place in the caption |
| caption-tag | `string` | `'h3'` | Specify the HTML tag to render instead of the default tag for the caption wrapper |
| content-tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag for the content wrapper |
| content-visible-up | `string` | `undefined` | Specify the breakpoint that the textual content will start to be shown. Leave at default to always show the textual content |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| img-alt | `string` | `undefined` | Sets the value of the 'alt' attribute on the image |
| img-blank | `boolean` | `false` | If set, will render a blank image instead of the img-src |
| img-blank-color | `string` | `'transparent'` | Set the CSS color to use as the fill of the blank image |
| img-height | `Numberish` | `undefined` | Set the default image 'height' attribute for all b-carousel-slide children |
| img-src | `string` | `undefined` | Sets the URL of the image |
| img-srcset | `string | string[]` | `undefined` | Sets the srcset attribute for the image |
| img-width | `Numberish` | `undefined` | Set the default image 'width' attribute for all b-carousel-slide children |
| interval | `number` | `undefined` | Set the delay time (in milliseconds) before the slide is shown |
| text | `string` | `undefined` | Text content to place in the text of the slide |
| text-tag | `string` | `'p'` | Specify the HTML tag to render instead of the default tag for the text wrapper |

##### [Slots](#comp-reference-bcarouselslide-slots)

| Name | Scope | Description |
| --- | --- | --- |
| caption |  | Content to place in caption |
| default |  | Content to place in the carousel slide |
| img |  | Slot for img element or image component |
| text |  | Content to place in text area of the slide |
