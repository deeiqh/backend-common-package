import { DynamicModule } from 'node_modules/@nestjs/common/interfaces/modules/dynamic-module.interface';
import { CacheManagerOptions } from 'node_modules/@nestjs/common/cache/interfaces/cache-manager.interface';
import { KafkaOptions } from 'node_modules/@nestjs/microservices/interfaces/microservice-configuration.interface';

export interface IProvidersConfig {
  cacheConfig: CacheManagerOptions;
  kafkaConfig: KafkaOptions;
}

export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule;
}
