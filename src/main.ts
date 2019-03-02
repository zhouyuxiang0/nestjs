import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/HTTP-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //使用全局的异常过滤器 只要抛出异常 就会返回过滤器中的错误信息
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
