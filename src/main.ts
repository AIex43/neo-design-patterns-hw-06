import 'reflect-metadata';  
import { MessageService } from './MessageService';
import { createRateLimitProxy } from './RateLimitProxy';

const service = createRateLimitProxy(new MessageService(), 1000);

console.log('Тестуємо систему анти-спаму:');
service.send('Привіт! Як справи?');

service.send('Чому не відповідаєш?');

setTimeout(() => {
  service.send('Це повідомлення вже пройде, бо ми почекали 1 секунду');
}, 1100);
