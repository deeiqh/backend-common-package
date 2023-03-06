## Backend common package

### Events Payload DTO

#### Get the package

```js
git clone -b centralized-interface git@github.com:deeiqh/hapi-corp-backend-common-package.git
```

```js
nvm install
```

```js
npm install
```

#### Using a payload DTO

Suppose we have the following event handler and we would like to type the `payload`

```js
@EventPattern('user-verified')
async createApplication(@Payload() payload) {}
```

To do that we should

```js
import {
  ReducePayload,
  UserVerifiedEventDto,
} from '@hapi-corp/backend-common-package';
```

so doing

```js
@EventPattern('user-verified')
async createApplication(@ReducePayload() payload: UserVerifiedEventDto) {}
```

we get the payload typed.

#### Creating or updating the payload DTO

Suppose our previous payload event interface doesn't exists or we want to update it, and it is equivalent to the interface of the `user` in the `user` service, so creating the dto for the `user` would be enough, and then we could do something like

```js
export class UserVerifiedEventDto extends UserDto {}
```

So, to create the `UserDto`:

- Add `'user'` string parameter to `await generateDomainDto();`
- Paste the `domain` directory from user service in
  `src/events-payload` then restart the app.
- If some error about parsing a file is logged please fix the file content then restart. This is explained later.

The created `user.dto.ts` file will be saved in `src/events-payload/dtos/domain`, it will export the class `UserDto`.

We said the payload type of the `'user-verified'` event matches with the `UserDto` content, so we can create in `src/events-payload/dtos/events` the file `user-verified-event.dto.ts` whit the content mentioned earlier:

```js
export class UserVerifiedEventDto extends UserDto {}
```

To export the `UserVerifiedEventDto` from the package we should add

```js
import { UserVerifiedEventDto } from './src/events-payload/dtos/events/user-verified-event.dto';
export { UserVerifiedEventDto };
```

to the `index.ts` file.

#### Testing the package

To import from the package in other repositories we should execute

```
npm link
```

in the package repo we're working, and in the other one execute

```
npm link @hapi-corp/backend-common-package
```

#### Publishing the package

- Update the `version` field in`package.json`
- Commit the changes
- Execute:

```
npm publish
```

make sure you have access to the `@hapi-corp` organization in your npm account.

#### Common parsing errors:

a) There is a misspelling between the prop file and its inside interface.

> For example:
>
> > `Can't parse user-employer-position.ts. Fix it please then restart`
>
> is logged, and inside the file we get:
>
> > ```js
> > interface UserEmployerPostionProps {
> >   value: string;
> > }
> > ```
>
> so there is a misspelling, it should be `UserEmployerPositionProps` to match the file name.

b) There is not a misspelling, but there is a conflict between letter cases from the file name and its inside interface.

> For example:
>
> > `Can't parse user-total-networth.ts. Fix it please then restart`
>
> is logged, and its interface name and content is
>
> > ```js
> > interface UserTotalNetWorthProps {
> >   totalNetWorth: UserTotalNetWorthEnum;
> > }
> > ```
>
> the file name suggests the interface name should be `UserTotalNetworthProps` because its name is `user-total-networth.ts` instead of `user-total-net-worth.ts`

In this cases we should ensure to:

- Keep naming consistency (misspelling, naming follows file name) also in the main interface file inside `domain/interfaces`, for example in `domain/interfaces/user.interface.ts`.

- Decide to choose file name or property name consistency. So, change property name or propery file name.

- Replace (`Ctrl+h`) all terms with the correct one in the prop file (`user-employer-position.ts`, `user-total-networth.ts` for example) and main interface file (`user.interface.ts` for example).

- If an import error appears in some`formatted-domain` file, please fix it.

Note that we are working inside the previous pasted `domain` folder.

### CommonModule

> Append the `CommonModule.forRoot()` into your current module import array. This will allow you to use Guards, Services, etc.

```js
import { CommonModule } from 'backend-common-package';
```

```js
CommonModule.forRoot({
  cacheConfig?: { store: example_redisStore },
  kafkaConfig?:  {
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

> Request headers:\
> ` key: otp-target-type, value: 'email' or 'phone'`\
> ` key: otp-target, value: 'a@a.com' or '+51987654321' for example`\
> ` key: otp-new-uuid-for-this-operation, value: 'some random uuid'`

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
import { GuardsService } from 'backend-common-package';
```

```js
constructor(
  private readonly guardsService: GuardsService,
) {}
```

```js
await this.guardsService.validateOperationOtp(input: {
  operationUUID: string;
  otp: string;
}),
```
