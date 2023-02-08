/* eslint-disable @typescript-eslint/no-var-requires */
const { CommonModule } = require('./dist/common.module');
const { SendOtpGuard } = require('./dist/guards/send-otp.guard');
const { OtpValidatedGuard } = require('./dist/guards/otp-validated.guard');
const {
  ValidateOperationOtpService,
} = require('./dist/guards/validate-operation-otp.service');

module.exports = {
  CommonModule,
  SendOtpGuard,
  OtpValidatedGuard,
  ValidateOperationOtpService,
};
