import { Exclude } from 'class-transformer'

export abstract class BaseResource {

    abstract id: number

    abstract getResourceName(): string

    get ref() : string {
        return `${this.prefix}/id`
    }

    abstract get prefix(): string
}