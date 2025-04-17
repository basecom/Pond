# Account management

## Account Recovery

The **Account Recovery** page provides users with a secure way to initiate a password reset via email. When a user submits an email address:

- If the email is **registered**, a recovery link is sent and a generic success message is displayed.
- If the email is **not registered**, a generic success message is still displayed to prevent account enumeration.

### Component Structure

This page is composed of layered components:

1. **`pages/account/recover.vue`**  
   Wraps the recovery component in a responsive layout.

2. **`components/AccountRecover.vue`**  
   Manages the logic, loading state, and message display.

3. **`components/AccountRecoverInner.vue`**  
   Provides the form UI and emits the form submission event. Customizable via **named slots**.

---

### Named Slots

The `AccountRecoverInner.vue` component exposes several named slots for UI customization:

| Slot Name         | Description                                                  |
|-------------------|--------------------------------------------------------------|
| `wrapper`         | Wraps the component, including form and messages             |
| `success-message` | Overrides the default success alert                          |
| `alert-icon`      | Overrides the default success alert icon                     |
| `header`          | Overrides the default heading                                |
| `info-text`       | Overrides the informational text displayed below the heading |
| `form`            | Wraps the form                                               |
| `buttons`         | Wraps the buttons                                            |
| `back-button`     | Overrides the back to login button                           |
| `submit-button`   | Overrides the submit button                                  |

---

### Props

`AccountRecoverInner.vue` accepts two optional props:

| Prop Name            | Type      | Description                                 |
|----------------------|-----------|---------------------------------------------|
| `isLoading`          | `boolean` | Controls a loading spinner on submit button |
| `showSuccessMessage` | `boolean` | Controls whether the success message shows  |

---

### Events

| Event Name | Payload               | Description                      |
|------------|-----------------------|----------------------------------|
| `recover`  | `{ email: string }`   | Emitted when form is submitted   |

---

### Usage Example: Custom Header & Message

```vue
<AccountRecoverInner>
    <template #header>
        <h1 class="text-2xl font-bold text-primary">Reset Your Password</h1>
        <p class="text-sm text-gray-500">Enter your email to receive a recovery link.</p>
        <hr class="my-4" />
    </template>

    <template #success-message>
        <UiAlert variant="successful" class="mb-4">
            <Icon name="mdi:check" class="mr-2" />
            <span>We've sent a link to your inbox—check your email!</span>
        </UiAlert>
    </template>
</AccountRecoverInner>
```

### Technical Notes

This component uses the `resetPassword` method from the `useCustomerPassword` composable under the hood.

You can learn more about the `useCustomerPassword` composable in the Shopware Frontends documentation:  [Shopware Frontends – useCustomerPassword](https://frontends.shopware.com/packages/composables/useCustomerPassword.html)

