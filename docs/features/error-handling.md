# Http Error Handling

## 404 Page Not Found
The NotFoundError component is used to display a 404 error page or a page not found error message to the user. It comes with customizable slots that allow you to override key elements of the page, including the title, subtitle, button, layout. This documentation will guide you through how to use and customize these slots.

### Default Structure

By default, the NotFoundError component includes the following:

Title: A large text that indicates the error (e.g., "Page Not Found").

Subtitle: A smaller description of the error (e.g., "Sorry, the page you're looking for doesn't exist").

Button: A button that users can click to navigate back to a home or specific page.

LayoutError: The Page layout containing the error message (eg. add in header).

Container: The wrapper for the error message.

### Basic Usage

```vue
<NotFoundErrorInner>
<template #title>
  Page Not Found
</template>
<template #subTitle>
  Sorry, the page you're looking for doesn't exist
</template>
<template #button>
  <div class="text-center"><a href="/">
    <UIButton :button-text="'Back to Homepage.'" />
  </a></div>
</template>
</NotFoundErrorInner>
```