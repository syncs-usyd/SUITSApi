import { classToPlain } from "class-transformer";
import { Component } from "@nestjs/common";
import { BaseEntity } from "entities/base.entity";
import { BaseResource } from "resources/base.resource";
import { transformAndValidateSync } from "class-transformer-validator";
import { EntityResourceMapperService } from "./entity-resource-mapper.service";

@Component()
export class SerializerService {
    constructor(
        private readonly entityResourceMapper: EntityResourceMapperService
    ) {}

    serialize(resource: BaseResource | BaseResource[]): Object {
        let o = classToPlain(resource);
        return o;
    }

    getResource(
        entity: BaseEntity | BaseEntity[]
    ): BaseResource | BaseResource[] {
        let resourceType: new (...args: any[]) => BaseResource;
        if (Array.isArray(entity)) {
            if (entity.length == 0) return [];
            else
                resourceType = this.entityResourceMapper.getResourceType(
                    entity[0]
                );
        } else resourceType = this.entityResourceMapper.getResourceType(entity);

        return transformAndValidateSync(resourceType, entity, {
            validator: { whitelist: true }
        });
    }
}
