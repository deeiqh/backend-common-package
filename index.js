/* eslint-disable @typescript-eslint/no-var-requires */
const { CommonModule } = require('./dist/common.module');
const {
  SendOperationOtpGuard,
} = require('./dist/guards/send-operation-otp.guard');
const {
  ValidatedOperationOtpGuard,
} = require('./dist/guards/validated-operation-otp.guard');
const {
  ValidateOperationOtpService,
} = require('./dist/guards/validate-operation-otp.service');

module.exports = {
  CommonModule,
  SendOperationOtpGuard,
  ValidatedOperationOtpGuard,
  ValidateOperationOtpService,
};
