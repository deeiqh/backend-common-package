## Backend common package

### Snippets

##### CommonModule

```js
import { CommonModule } from 'backend-common-package';
```

```js
CommonModule.forRoot({
  cacheConfig: { store: redisStore },
  kafkaConfig:  {
    transport: Transport.KAFKA,
    options: {
      client: {
          clientId: 'client',
            brokers: ['localhost:9092')],
      },
      consumer: {
          groupId: 'service-consumer-group',
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
