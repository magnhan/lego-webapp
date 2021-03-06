// @flow

import * as React from 'react';
import { Link } from 'react-router';
import { ROLES } from 'app/utils/constants';
import styles from './GroupMembersList.css';
import Table from 'app/components/Table';

type Props = {
  fetching: boolean,
  hasMore: boolean,
  group: Object,
  memberships: Array<Object>,
  removeMember: Object => Promise<*>,
  showDescendants: boolean,
  groupsById: { [string]: { name: string } },
  fetch: ({ groupId: string, next: true }) => Promise<*>
};

const GroupMembersList = ({
  memberships,
  group,
  removeMember,
  showDescendants,
  fetch,
  hasMore,
  fetching,
  groupsById
}: Props) => {
  if (!memberships.length) {
    return <div>Ingen brukere</div>;
  }

  const columns = [
    {
      title: 'Navn',
      dataIndex: 'user.fullName',
      search: true,
      render: (fullName, membership) => {
        const { user } = membership;
        const performRemove = () =>
          confirm(`Er du sikker på at du vil melde ut ${user.fullName}?`) &&
          removeMember(membership);
        return (
          true && (
            <>
              {!showDescendants && (
                <i
                  key="icon"
                  className={`fa fa-times ${styles.removeIcon}`}
                  onClick={performRemove}
                />
              )}
              <Link key="link" to={`/users/${user.username}`}>
                {user.fullName} ({user.username})
              </Link>
            </>
          )
        );
      }
    },
    showDescendants
      ? {
          title: 'Gruppe',
          search: false,
          dataIndex: 'abakusGroup',
          render: abakusGroup =>
            true && (
              <Link
                to={`/admin/groups/${abakusGroup}/members?descendants=false`}
              >
                {groupsById[abakusGroup] && groupsById[abakusGroup].name}
              </Link>
            )
        }
      : null,
    {
      title: 'Rolle',
      dataIndex: 'role',
      search: true,
      filterMapping: role =>
        role === 'member' || !ROLES[role] ? '' : ROLES[role],
      render: (role: string) =>
        role !== 'member' && <span>{ROLES[role] || role} </span>
    },
    {
      title: 'E-post',
      dataIndex: 'user.internalEmailAddress',
      search: false,
      render: (internalEmail: string) =>
        internalEmail && <a href={`mailto:${internalEmail}`}>{internalEmail}</a>
    }
  ].filter(Boolean);
  return (
    <Table
      infiniteScroll
      columns={columns}
      onLoad={() => {
        fetch({ descendants: showDescendants, groupId: group.id, next: true });
      }}
      hasMore={hasMore}
      loading={fetching}
      data={memberships}
    />
  );
};

export default GroupMembersList;
