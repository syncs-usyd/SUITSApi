import { Entity as TypeOrmEntity } from 'typeorm';

export abstract class BaseEntity {
    getTypeName() : string {
        return this.constructor.name;
    }
}