/* eslint-disable @typescript-eslint/no-var-requires */
const { OtpModule } = require('./dist/otp/otp.module');

const {
  ReducePayloadModule,
} = require('./dist/reduce-payload/reduce-payload.module');

const {
  SendOperationOtpGuard,
} = require('./dist/otp/guards/send-operation-otp.guard');

const {
  ValidatedOperationOtpGuard,
} = require('./dist/otp/guards/validated-operation-otp.guard');

const { OtpService } = require('./dist/otp/otp.service');

const {
  ReducePayloadService,
} = require('./dist/reduce-payload/reduce-payload.service');

const {
  ReducePayload,
} = require('./dist/reduce-payload/decorators/reduce-payload.decorator');

module.exports = {
  OtpModule,
  ReducePayloadModule,
  SendOperationOtpGuard,
  ValidatedOperationOtpGuard,
  OtpService,
  ReducePayloadService,
  ReducePayload,
};
