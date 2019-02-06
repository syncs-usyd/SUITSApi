import { Component } from "@nestjs/common";
import { BaseEntity } from "entities/base.entity";
import { BaseResource } from "resources/base.resource";
import { MemberEntity, EventEntity, AttendanceEntity } from "entities";
import { MemberResource, EventResource, AttendanceResource } from "resources";

@Component()
export class EntityResourceMapperService {
    getResourceType(entity: BaseEntity): new (...args: any[]) => BaseResource {
        let type = entity.getType();

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
