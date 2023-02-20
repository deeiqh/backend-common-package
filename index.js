/* eslint-disable @typescript-eslint/no-var-requires */
const { CommonModule } = require('./dist/common.module');
const {
  ReducePayloadModule,
} = require('./dist/reduce-payload/reduce-payload.module');

const {
  SendOperationOtpGuard,
} = require('./dist/otp/guards/send-operation-otp.guard');
const {
  ValidatedOperationOtpGuard,
} = require('./dist/otp/guards/validated-operation-otp.guard');

const {
  ReducePayload,
} = require('./dist/reduce-payload/reduce-payload.decorator');

const { OtpService } = require('./dist/otp/otp.service');
const { CommonService } = require('./dist/common.service');

module.exports = {
  CommonModule,
  ReducePayloadModule,
  SendOperationOtpGuard,
  ValidatedOperationOtpGuard,
  ReducePayload,
  OtpService,
  CommonService,
};
