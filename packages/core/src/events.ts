import { getUUID } from './uuid';

import {
  GroupEventType,
  GroupTraits,
  IdentifyEventType,
  JsonMap,
  ScreenEventType,
  TrackEventType,
  UserTraits,
  AliasEventType,
  EventType,
  SegmentEvent,
  Store,
} from './types';

export const createTrackEvent = ({
  event,
  properties = {},
}: {
  event: string;
  properties?: JsonMap;
}): TrackEventType => ({
  type: EventType.TrackEvent,
  event,
  properties,
});

export const createScreenEvent = ({
  name,
  properties = {},
}: {
  name: string;
  properties?: JsonMap;
}): ScreenEventType => ({
  type: EventType.ScreenEvent,
  name,
  properties,
});

export const createIdentifyEvent = ({
  userTraits = {},
}: {
  userTraits?: UserTraits;
}): IdentifyEventType => {
  return {
    type: EventType.IdentifyEvent,
    traits: userTraits,
  };
};

export const createGroupEvent = ({
  groupId,
  groupTraits = {},
}: {
  groupId: string;
  groupTraits?: GroupTraits;
}): GroupEventType => ({
  type: EventType.GroupEvent,
  groupId,
  traits: groupTraits,
});

export const createAliasEvent = ({
  anonymousId,
  userId,
  newUserId,
}: {
  anonymousId: string;
  userId?: string;
  newUserId: string;
}): AliasEventType => ({
  type: EventType.AliasEvent,
  userId: newUserId,
  previousId: userId || anonymousId,
});

const isAliasEvent = (event: SegmentEvent): event is AliasEventType =>
  event.type === EventType.AliasEvent;

export const applyRawEventData = (event: SegmentEvent, store: Store) => {
  const { system, userInfo } = store.getState();

  return {
    ...event,
    anonymousId: userInfo.anonymousId,
    messageId: getUUID(),
    timestamp: new Date().toISOString(),
    integrations: system.integrations,
    userId: isAliasEvent(event) ? event.userId : userInfo.userId,
  };
};
