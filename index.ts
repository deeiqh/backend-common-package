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
import { ReducePayload } from './dist/src/events-payload/decorators/reduce-payload.decorator';
export { ReducePayload };

import { UserPropsDto } from './dist/src/events-payload/dtos/user-props.dto';
export { UserPropsDto };

export class AB {
  kiuw: string;
}
