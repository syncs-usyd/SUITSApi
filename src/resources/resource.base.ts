import { Expose } from 'class-transformer'
import { Allow } from 'class-validator';

export abstract class BaseResource {

    abstract id: number

    abstract getResourceName(): string

    @Expose()
    get ref() : string {
        return `${this.prefix}/${this.id}`
    }
    set ref(a: string) {} // ignore any setters for ref. idk why it breaks if this is not there

    abstract get prefix(): string
}