import { ClassType } from "class-transformer/ClassTransformer"
import { BaseSubscriber } from "websocket/subscriber.base"
import { BaseResource } from "utils/resource.base"
import { EventSubscriber, getRepository } from "typeorm"
import { serialize } from 'utils/serialize'
import { BaseEntity } from "utils/entity.base";
import { EntityMetadata } from "typeorm/metadata/EntityMetadata";
import { MemberEntity } from "entities";

export function Subscriber<E extends BaseEntity, R extends BaseResource>
(EntityType: ClassType<E>, ResourceType: ClassType<R>) {

    @EventSubscriber()
    class Subscriber<E extends BaseEntity, R extends BaseResource> 
    extends BaseSubscriber<E, R> {

        getFullItem(id: number): Promise<E> {
            let repo = getRepository(EntityType)
            return repo.findOneById(id) as any as Promise<E>
        }

        serialize(data: E): R {
            return serialize(ResourceType, data) as any as R
        }

    }

    return Subscriber;

}