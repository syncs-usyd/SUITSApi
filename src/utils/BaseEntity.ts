import { Entity as TypeOrmEntity } from 'typeorm';

@TypeOrmEntity()
export abstract class BaseEntity {
    getTypeName() : string {
        return typeof(this);
    }
}