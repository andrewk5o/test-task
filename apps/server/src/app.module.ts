import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SeedModule } from './seed/seed.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => typeOrmConfig,
        }),
        UsersModule,
        RolesModule,
        SeedModule,
    ],
})
export class AppModule { }

