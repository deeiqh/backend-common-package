import { DynamicModule, Module } from '@nestjs/common';
import { GuardsModule, IProvidersConfig } from './guards/guards.module';

@Module({})
export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule {
    return {
      module: CommonModule,
      imports: [GuardsModule.forRoot(configs)],
      exports: [GuardsModule],
    };
  }
}
