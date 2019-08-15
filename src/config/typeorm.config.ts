import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 54320,
    username: 'root',
    password: '123456',
    database: 'nestjs_task_management',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: true, // note: disable in production
};

export {
    typeOrmConfig,
};
