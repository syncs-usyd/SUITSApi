import { ClassType } from "class-transformer/ClassTransformer"
import { EventSubscriber, getRepository } from "typeorm"

import { BaseSubscriber } from "websocket/subscriber.base"
import { BaseResource } from "resources/resource.base"
import { serialize } from 'utils/serialize'
import { BaseEntity } from "entities/entity.base";

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