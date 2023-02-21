/* eslint-disable @typescript-eslint/no-var-requires */
const { OtpModule } = require('./dist/otp/otp.module');

const {
  SendOperationOtpGuard,
} = require('./dist/otp/guards/send-operation-otp.guard');

const {
  ValidatedOperationOtpGuard,
} = require('./dist/otp/guards/validated-operation-otp.guard');

const { OtpService } = require('./dist/otp/otp.service');

const {
  ReducePayload,
} = require('./dist/reduce-payload/reduce-payload.decorator');

module.exports = {
  OtpModule,
  SendOperationOtpGuard,
  ValidatedOperationOtpGuard,
  OtpService,
  ReducePayload,
};
