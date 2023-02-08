export interface IProvidersConfig {
  cacheConfig: CacheManagerOptions;
  kafkaConfig: KafkaOptions;
}

export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule;
}
``;
