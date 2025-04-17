# Account Management

## Login

The login flow allows customers to sign in using their email and password. It is built using a layered component structure that separates logic from presentation. Layout and behavior are customizable through named slots and props. The components are used in a full page login page as well as a modal opening from the header.

---

### Component Structure

The login page is composed of layered components:

1. **`pages/account/login.vue`** – wraps the login component in a responsive layout.
2. **`components/account/AccountLogin.vue`** – handles the login logic (loading state, error handling, redirection).
3. **`components/account/AccountLoginInner.vue`** – provides the form UI and emits the form submission event. Customizable via **named slots**.
---

### Named Slots

The `AccountLoginInner.vue` component exposes named slots for UI customization:

| Slot Name            | Description                               |
|----------------------|-------------------------------------------|
| `headline`           | Optional headline rendered above the form |
| `password-forgotten` | Link to account recovery flow             |
| `submit-button`      | Overwrites the login button               |
| `alert`              | Error shown on login failure              |
| `alert-icon`         | Icon in the alert message                 |

---

### Props

#### `AccountLogin.vue`

| Prop Name     | Type     | Required | Description                                         |
|---------------|----------|----------|-----------------------------------------------------|
| `redirect-to` | `string` | No       | Path to redirect the user to after successful login |

#### `AccountLoginInner.vue`

| Prop Name      | Type               | Required | Description                               |
|----------------|--------------------|----------|-------------------------------------------|
| `isLoading`    | `boolean`          | No       | Controls loading spinner on submit button |
| `errorMessage` | `string \| null`   | No       | Error message shown if login fails        |

---

### Events

#### `AccountLoginInner.vue`

| Event Name | Payload                  | Description                              |
|------------|--------------------------|------------------------------------------|
| `login`    | `{ username, password }` | Emits login data to the parent component |

---

### Usage Example

Here’s how you can use the login form with customized content:

```vue
<!-- components/account/AccountLogin.vue -->
<AccountLogin redirect-to="/dashboard">
    <template #headline>
        <h1 class="text-2xl font-bold mb-2">Welcome Back</h1>
        <p class="text-sm text-gray-500">Log in to access your dashboard</p>
    </template>
</AccountLogin>

<!-- components/account/AccountLoginInner.vue -->
<AccountLoginInner>
    <template #submit-button>
        <UiButton type="submit" class="w-full bg-primary text-white">
            Sign In
        </UiButton>
    </template>

    <template #password-forgotten>
        <NuxtLinkLocale to="/account/recover" class="text-sm text-gray-600 underline">
            Forgot your password?
        </NuxtLinkLocale>
    </template>

    <template #alert-icon>
        <Icon name="mdi:alert" class="text-red-500 mr-2" />
    </template>
</AccountLoginInner>
```
