// import { DynamicModule } from 'node_modules/@nestjs/common/interfaces/modules/dynamic-module.interface';
// import { UserPropsDto } from 'src/events-payload/dtos/user-props.dto';
// export { UserPropsDto };
// import { UserVerifiedEventDto } from 'src/events-payload/dtos/user-verified-event.dto';
// import { ResultMessage } from 'src/guards/validate-operation-otp';
// import { OtpConfig } from 'src/otp/interfaces/otp-config.interface';
// import { ProvidersConfig } from 'src/otp/interfaces/providers-config.interface';

// export class OtpModule {
//   static forRoot(configs: OtpConfig & ProvidersConfig): DynamicModule;
// }

// export class SendOperationOtpGuard {}

// export class ValidatedOperationOtpGuard {}

// export class OtpService {
//   async validateOperationOtp(input: {
//     operationUUID: string;
//     otp: string;
//   }): Promise<ResultMessage>;
// }

// export const ReducePayload: () => ParameterDecorator;

// class A {
//   ty?: string;
// }
// export class UserVerifiedEventDto extends UserPropsDto {}

// /* eslint-disable @typescript-eslint/no-var-requires */
// const { OtpModule } = require('./dist/otp/otp.module');

// const {
//   SendOperationOtpGuard,
// } = require('./dist/otp/guards/send-operation-otp.guard');

// const {
//   ValidatedOperationOtpGuard,
// } = require('./dist/otp/guards/validated-operation-otp.guard');

// const { OtpService } = require('./dist/otp/otp.service');

// const {
//   ReducePayload,
// } = require('./dist/events-payload/decorators/reduce-payload.decorator');

// // const {
// //   UserVerifiedEventDto,
// // } = require('./dist/events-payload/dtos/user-verified-event.dto');

// module.exports = {
//   OtpModule,
//   SendOperationOtpGuard,
//   ValidatedOperationOtpGuard,
//   OtpService,
//   ReducePayload,
//   // UserVerifiedEventDto,
// };

import { ReducePayload } from './src/events-payload/decorators/reduce-payload.decorator';
export { ReducePayload };

import { UserVerifiedEventDto } from './src/events-payload/dtos/events/user-verified-event.dto';
export { UserVerifiedEventDto };
