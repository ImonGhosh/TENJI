import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    Neo4jModule,
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_URL,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
