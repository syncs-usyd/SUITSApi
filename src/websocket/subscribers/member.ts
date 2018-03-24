import { Subscriber } from './subscriber'
import { MemberEntity } from 'entities';
import { MemberResource } from 'api/members/resources/member';

let MemberSubscriber = Subscriber(MemberEntity, MemberResource)

export { MemberSubscriber } 
