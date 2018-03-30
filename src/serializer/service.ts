import { classToPlain } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { Component } from "@nestjs/common";
import { BaseEntity } from "entities/entity.base";
import { BaseResource } from "resources/resource.base";
import { transformAndValidateSync } from 'class-transformer-validator'

@Component()
export class SerializerService {

    serialize<R extends BaseResource>(resource: R | R[]) : Object {
        let o = classToPlain(resource)
        return o
    }

    getResource<E extends BaseEntity, R extends BaseResource>(entity: E | E[], type: ClassType<R>): R | R[] {
        return transformAndValidateSync(type, entity, {validator: {whitelist: true}})
    }

}
