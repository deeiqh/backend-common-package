/* eslint-disable @typescript-eslint/no-var-requires */
const { CommonModule } = require('./dist/common.module');
const { SendOtpGuard } = require('./dist/guards/send-otp.guard');
const { OtpValidatedGuard } = require('./dist/guards/otp-validated.guard');

module.exports = { CommonModule, SendOtpGuard, OtpValidatedGuard };
