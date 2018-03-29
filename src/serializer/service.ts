import { classToPlain, plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { Component } from "@nestjs/common";
import { BaseEntity } from "entities/entity.base";
import { BaseResource } from "resources/resource.base";
import { validateSync } from 'class-validator'

@Component()
export class SerializerService {

    serialize<R extends BaseResource>(resource: R) : Object {
        let o = classToPlain(resource)
        return o
    }

    getResource<E extends BaseEntity, R extends BaseResource>(entity: E, type: ClassType<R>): R {
        let resource = plainToClass(type, entity)
        let err = validateSync(resource, {whitelist: true})
        return resource
    }

}
