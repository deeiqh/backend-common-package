import {
  CacheManagerOptions,
  CacheModule,
  DynamicModule,
  Module,
} from '@nestjs/common';
import { ClientsModule, KafkaOptions } from '@nestjs/microservices';
import { EventEmitter } from 'events';
import { ConsumerConfig, Kafka, KafkaConfig } from 'kafkajs';
import {
  EVALUATED_OPERATION_OTP,
  EVALUATED_OPERATION_OTP_RESULT,
} from './events/topics';
import { GuardsService } from './guards.service';
import { SendOperationOtpGuard } from './send-operation-otp.guard';
import { ValidatedOperationOtpGuard } from './validated-operation-otp.guard';

export interface IProvidersConfig {
  cacheConfig: CacheManagerOptions;
  kafkaConfig: KafkaOptions;
}

@Module({})
export class GuardsModule {
  static forRoot(configs: IProvidersConfig): DynamicModule {
    const { cacheConfig, kafkaConfig } = configs;

    return {
      module: GuardsModule,
      imports: [
        CacheModule.register<CacheManagerOptions>(cacheConfig),
        ClientsModule.register([{ name: 'CLIENT_KAFKA', ...kafkaConfig }]),
      ],
      providers: [
        EventEmitter,
        {
          provide: 'OTP_KAFKA_CONSUMER',
          useFactory: async (eventEmitter: EventEmitter) => {
            const kafka = new Kafka(
              kafkaConfig.options?.client as unknown as KafkaConfig,
            );

            const consumer = kafka.consumer(
              kafkaConfig.options?.consumer as unknown as ConsumerConfig,
            );
            await consumer.connect();
            await consumer.subscribe({
              topic: EVALUATED_OPERATION_OTP,
              fromBeginning: true,
            });

            await consumer.run({
              eachMessage: async ({ message }) => {
                const messageJson = JSON.parse(
                  message.value?.toString() as string,
                );

                eventEmitter.emit(EVALUATED_OPERATION_OTP_RESULT, {
                  operationUUID: messageJson.operationUUID,
                  isValid: messageJson.isValid,
                });
              },
            });

            return consumer;
          },
          inject: [EventEmitter],
        },
        SendOperationOtpGuard,
        ValidatedOperationOtpGuard,
        GuardsService,
      ],
      exports: [
        CacheModule,
        ClientsModule,
        EventEmitter,
        SendOperationOtpGuard,
        ValidatedOperationOtpGuard,
        GuardsService,
      ],
    };
  }
}
