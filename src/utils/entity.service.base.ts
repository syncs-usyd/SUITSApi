import { WebSocketService } from "websocket/service";
import { Repository, DeepPartial } from "typeorm";
import { BaseEntity } from "entities/entity.base";
import { ClassType } from "class-transformer/ClassTransformer";
import { BaseResource } from "resources/resource.base";

export abstract class BaseEntityService<E extends BaseEntity, R extends BaseResource> {

    constructor(
        protected readonly repo: Repository<E>,
        private readonly websocket: WebSocketService,
        private readonly resourceType: ClassType<R>
    ) {}

    protected async insert(data: DeepPartial<E>) : Promise<E> {
        let entity = this.repo.create(data)
        await this.repo.save(entity as any)
        entity = (await this.repo.findOneById(entity.id))!

        this.websocket.sendInsert(entity, this.resourceType)
        return entity
    }

    protected async update(id: number, data: DeepPartial<E>): Promise<E | undefined> {
        let entity = await this.repo.findOneById(id)
        if (!entity)
            return undefined

        entity = this.repo.merge(entity, data)
        await this.repo.updateById(id, entity as any)

        this.websocket.sendUpdate(entity, this.resourceType)
        return entity
    }

    protected async delete(id: number) : Promise<E | undefined> {
        let entity = await this.repo.findOneById(id)
        if (!entity)
            return undefined

        await this.repo.deleteById(id)

        this.websocket.sendDelete(entity, this.resourceType)
        return entity
    }
}