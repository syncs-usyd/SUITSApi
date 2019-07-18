import { Component } from "@nestjs/common";
import { AttendanceEntity, EventEntity, MemberEntity } from "../../entities";
import { BaseEntity } from "../../entities/base.entity";
import { AttendanceResource, EventResource, MemberResource } from "../../resources";
import { BaseResource } from "../../resources/base.resource";

@Component()
export class EntityResourceMapperService {
    public getResourceType(
        entity: BaseEntity,
    ): new (...args: any[]) => BaseResource {
        const type = entity.getType();

        switch (type) {
            case MemberEntity:
                return MemberResource;
            case EventEntity:
                return EventResource;
            case AttendanceEntity:
                return AttendanceResource;
        }

        throw new Error(`Entity ${type.name} has no valid resource!`);
    }
}
