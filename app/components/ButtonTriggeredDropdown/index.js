/** @flow */

import React, { Component } from 'react';
import { Overlay } from 'react-overlays';

type Props = {
  iconName: string;
  toggle: () => any;
  buttonClassName?: string;
  contentClassName?: string|boolean;
  show: boolean;
  children?: any;
  style?: any;
};

export default class ButtonTriggeredDropdown extends Component {
  props: Props;

  static defaultProps = {
    iconName: 'star'
  };

  render() {
    const {
      iconName,
      toggle,
      show,
      contentClassName,
      buttonClassName,
      children,
      style
    } = this.props;

    return (
      <button
        onClick={toggle}
        ref='target'
        className={buttonClassName}
        style={style}
      >
        <i className={`ion-${iconName}`} />

        <Overlay
          show={show}
          onHide={toggle}
          target={() => this.refs.target}
          placement='bottom'
          rootClose
        >
          <div className={contentClassName}>
            {children}
          </div>
        </Overlay>
      </button>
    );
  }
}