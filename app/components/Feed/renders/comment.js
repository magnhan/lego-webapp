// @flow
import React from 'react';
import Icon from 'app/components/Icon';
import { formatHeader } from './utils';
import { lookupContext, contextRender } from '../context';
import type { AggregatedActivity, Activity } from '../types';
import DisplayContent from 'app/components/DisplayContent';

/**
 * Comments are grouped by the comment target and date.
 * This makes it possible to use the latest activity to generate the header.
 */
export function activityHeader(
  aggregatedActivity: AggregatedActivity,
  htmlTag: Function => string
) {
  const latestActivity = aggregatedActivity.lastActivity;
  const actors = aggregatedActivity.actorIds.map(actorId => {
    return lookupContext(aggregatedActivity, actorId);
  });
  const target = lookupContext(aggregatedActivity, latestActivity.target);

  if (!(actors.length !== 0 && target)) {
    return null;
  }

  const actorsRender = actors.map(actor => {
    return htmlTag(contextRender[actor.contentType](actor));
  });

  return (
    <b>
      {formatHeader(actorsRender)} kommenterte på{' '}
      {htmlTag(contextRender[target.contentType](target))}
    </b>
  );
}

export function activityContent(activity: Activity) {
  return <DisplayContent content={activity.extraContext.content} />;
}

export function icon() {
  return <Icon name="text" />;
}

export function getURL(aggregatedActivity: AggregatedActivity) {
  const latestActivity = aggregatedActivity.lastActivity;
  const comment = lookupContext(aggregatedActivity, latestActivity.target);
  return commentURL(comment);
}

export const commentURL = (target: Object) => {
  switch (target.contentType) {
    case 'events.event':
      return !target ? '/events' : `/events/${target.id}`;
    case 'meetings.meetinginvitation':
      return !target ? '/meetings' : `/meetings/${target.id}`;
    case 'articles.article':
      return !target ? '/articles' : `/articles/${target.id}`;
    case 'gallery.gallerypicture':
      return !target
        ? '/photos'
        : `/photos/${target.gallery.id}/picture/${target.id}`;
    default:
      return '';
  }
};
