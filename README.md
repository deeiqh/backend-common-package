## Backend common package

### Snippets

##### CommonModule

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

##### Guards

```js
import { SendOtpGuard, OtpValidatedGuard } from 'backend-common-package';
```

```js
@UseGuards(SendOtpGuard, OtpValidatedGuard)
```

##### Service

```js
import { ValidateOperationOtpService } from 'backend-common-package';

new ValidateOperationOtpService(
  this.cacheManager,
  this.clientKafka,
).validateOperationOtp(input),
```
