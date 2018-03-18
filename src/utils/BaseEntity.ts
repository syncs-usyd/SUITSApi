import { Entity as TypeOrmEntity } from 'typeorm';

@TypeOrmEntity()
export abstract class BaseEntity {
    getTypeName() : string {
        return this.constructor.name;
    }
}