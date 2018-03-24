import { Exclude } from 'class-transformer'

export abstract class BaseResource {

    @Exclude()
    protected readonly abstract prefix: string

    abstract id: number

    abstract getResourceName(): string

    get ref() : string {
        return `${this.prefix}/id`
    }
}