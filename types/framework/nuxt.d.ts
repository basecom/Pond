import type { AccessToken } from '~/plugins/10.pond.plugin';

export interface PondHooks {
  'pond:determine-access-token': (accessKey: AccessToken) => HookResult
}

declare module '#app' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RuntimeNuxtHooks extends PondHooks {}
}
