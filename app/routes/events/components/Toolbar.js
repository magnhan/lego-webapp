// @flow

import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import Modal from 'app/components/Modal';
import Time from 'app/components/Time';
import EventEditor from './EventEditor';
import styles from './Toolbar.css';
import type { ActionGrant } from 'app/models';
import cx from 'classnames';

type Props = {
  actionGrant: ActionGrant
};

type State = {
  editorOpen: boolean
};

class Toolbar extends Component<Props, State> {
  state = {
    editorOpen: false
  };

  render() {
    const { actionGrant } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.time}>
          <Time format="ll" className={styles.timeNow} />
        </div>

        <IndexLink
          to="/events"
          activeClassName={styles.active}
          className={cx(styles.pickerItem, styles.list)}
        >
          Liste
        </IndexLink>

        <Link
          to="/events/calendar"
          activeClassName={styles.active}
          className={cx(styles.pickerItem, styles.calender)}
        >
          Kalender
        </Link>

        <div className={styles.create}>
          {actionGrant && actionGrant.includes('create') && (
            <Link to="/events/create">Lag nytt</Link>
          )}
        </div>

        <Modal
          keyboard={false}
          show={this.state.editorOpen}
          onHide={() => this.setState({ editorOpen: false })}
          closeOnBackdropClick={false}
        >
          <EventEditor />
        </Modal>
      </div>
    );
  }
}

export default Toolbar;
