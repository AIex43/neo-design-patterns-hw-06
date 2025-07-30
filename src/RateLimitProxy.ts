import { IMessageService } from './IMessageService';

export class RateLimitProxy implements IMessageService {
  private lastTimestamp = 0;

  constructor(
    private wrappee: IMessageService,
    private intervalMs: number
  ) {}

  public send(message: string): void {
    const now = Date.now();
    if (now - this.lastTimestamp < this.intervalMs) {
      console.log('[RateLimit] skipped');
      return;
    }
    this.wrappee.send(message);
    this.lastTimestamp = now;
  }
}

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  return new RateLimitProxy(service, intervalMs);
}