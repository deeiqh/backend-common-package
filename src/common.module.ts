import { DynamicModule, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { GuardsModule, IProvidersConfig } from './guards/guards.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule {
    return {
      module: CommonModule,
      imports: [GuardsModule.forRoot(configs)],
      exports: [GuardsModule],
    };
  }
}
