## Backend common package

### CommonModule

> You should append the `CommonModule.forRoot()` into your current module import array. This will allow you to use Guards, Services, etc.

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
import {
  SendOperationOtpGuard,
  ValidatedOperationOtpGuard,
} from 'backend-common-package';
```

```js
@UseGuards(SendOperationOtpGuard, ValidatedOperationOtpGuard)
```

#### Service

```js
import { ValidateOperationOtpService } from 'backend-common-package';

await new ValidateOperationOtpService().validateOperationOtp(input),
```
