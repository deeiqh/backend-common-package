## Backend common package

### CommonModule

```js
import { CommonModule } from 'backend-common-package';
```

```js
CommonModule.forRoot({
  cacheConfig: { store: example_redisStore },
  kafkaConfig:  {
    transport: Transport.KAFKA,
    options: {
      client: {
          clientId: process.env.CLIENT_ID,
            brokers: [process.env.BROKERS],
      },
      consumer: {
          groupId: process.env.GROUP_ID,
      },
    },,
}),
```

#### Guards

```js
import { SendOtpGuard, OtpValidatedGuard } from 'backend-common-package';
```

```js
@UseGuards(SendOtpGuard, OtpValidatedGuard)
```

#### Controllers

> whose constructor injects the following:\
> `@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,`\
> `@Inject('CLIENT_KAFKA') private readonly clientKafka: ClientKafka`

```js
import { validateOperationOtp } from 'backend-common-package';

await validateOperationOtp(this.cacheManager, this.clientKafka, input);
```
