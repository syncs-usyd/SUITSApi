import { Subscriber } from './subscriber'
import { MemberEntity } from 'entities';
import { MemberResource } from 'resources/member';

let MemberSubscriber = Subscriber(MemberEntity, MemberResource)

export { MemberSubscriber } 
