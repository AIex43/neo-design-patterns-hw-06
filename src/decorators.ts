import { IMessageService } from './IMessageService';

function pad(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function withTimestamp(
  _target: IMessageService,
  _propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original = descriptor.value;
  descriptor.value = function(this: any, message: string): void {
    const now = new Date();
    const ts = `[${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
               ` ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}] `;
    original.call(this, ts + message);
  };
  return descriptor;
}

export function uppercase(
  _target: IMessageService,
  _propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original = descriptor.value;
  descriptor.value = function(this: any, message: string): void {
    original.call(this, message.toUpperCase());
  };
  return descriptor;
}