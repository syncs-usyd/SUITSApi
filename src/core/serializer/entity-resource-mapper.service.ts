import { Injectable } from "@nestjs/common";
import { AttendanceEntity, EventEntity, MemberEntity } from "../../entities";
import { BaseEntity } from "../../entities/base.entity";
import { AttendanceResource, EventResource, MemberResource } from "../../resources";
import { BaseResource } from "../../resources/base.resource";

@Injectable()
export class EntityResourceMapperService {
    public getResourceType(
        entity: BaseEntity,
    ): new (...args: any[]) => BaseResource {
        const type = entity.constructor;

        switch (type) {
            case MemberEntity:
                return MemberResource;
            case EventEntity:
                return EventResource;
            case AttendanceEntity:
                return AttendanceResource;
        }

        throw new TypeError(`Entity ${type.name} has no valid resource!`);
    }
}
