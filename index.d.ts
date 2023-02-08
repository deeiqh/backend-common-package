import { CacheManagerOptions } from '@nestjs/common';
import { KafkaOptions } from '@nestjs/microservices';

export interface IProvidersConfig {
  cacheConfig: CacheManagerOptions;
  kafkaConfig: KafkaOptions;
}

export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule;
}
