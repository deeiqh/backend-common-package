## Backend common package

## Moved to @hapi-corp/backend-common-package

### CommonModule

> You should append the `CommonModule.forRoot()` into your current module import array.

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

> Both, `SendOtpGuard`and `OtpValidatedGuard` need `CommonModule` to be already imported by current module.

#### Controllers

> whose constructor injects the following:\
> `@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,`\
> `@Inject('CLIENT_KAFKA') private readonly clientKafka: ClientKafka`\
> both, `CACHE_MANAGER` and `'CLIENT_KAFKA'` come from `CommonModule`

```js
import { validateOperationOtp } from 'backend-common-package';

await validateOperationOtp(this.cacheManager, this.clientKafka, input);
```
