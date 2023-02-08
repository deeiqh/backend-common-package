/* eslint-disable @typescript-eslint/no-var-requires */
const { CommonModule } = require('./dist/common.module');
const { SendOtpGuard } = require('./dist/guards/send-otp.guard');
const { OtpValidatedGuard } = require('./dist/guards/otp-validated.guard');
const {
  validateOperationOtp,
} = require('./dist/guards/validate-operation-otp');

module.exports = {
  CommonModule,
  SendOtpGuard,
  OtpValidatedGuard,
  validateOperationOtp,
};
