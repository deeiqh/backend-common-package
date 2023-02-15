/* eslint-disable @typescript-eslint/no-var-requires */
const { CommonModule } = require('./dist/common.module');
const {
  SendOperationOtpGuard,
} = require('./dist/guards/send-operation-otp.guard');
const {
  ValidatedOperationOtpGuard,
} = require('./dist/guards/validated-operation-otp.guard');
const { GuardsService } = require('./dist/guards/guards.service');
const { CommonService } = require('./dist/common.service');

module.exports = {
  CommonModule,
  SendOperationOtpGuard,
  ValidatedOperationOtpGuard,
  GuardsService,
  CommonService,
};
