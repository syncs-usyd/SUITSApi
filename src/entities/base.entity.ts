export abstract class BaseEntity {
    public abstract id: number;

    public abstract getType(): new (...args: any[]) => BaseEntity;
}
