import { IMessageService } from './IMessageService';

export function createRateLimitProxy(
  wrappee: IMessageService,
  intervalMs: number
): IMessageService {
  let lastTime = 0;
  return new Proxy<IMessageService>(wrappee as any, {
    get(target, prop, receiver) {
      const orig = Reflect.get(target, prop, receiver);
      if (typeof orig !== 'function' || prop !== 'send') {
        return orig;
      }
      return function (message: string) {
        const now = Date.now();
        if (now - lastTime < intervalMs) {
          console.log('[RateLimit] skipped');
          return;
        }
        lastTime = now;
        return orig.call(target, message);
      };
    },
  });
}
