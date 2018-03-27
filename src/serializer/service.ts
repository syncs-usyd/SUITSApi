import { classToPlain, plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { Component } from "@nestjs/common";
import { BaseEntity } from "entities/entity.base";
import { BaseResource } from "resources/resource.base";

@Component()
export class SerializerService {

    serialize<R extends BaseResource>(resource: R) : Object {
        return classToPlain(resource)
    }

    getResource<E extends BaseEntity, R extends BaseResource>(entity: E, type: ClassType<R>): R {
        return plainToClass(type, entity)
    }

}
