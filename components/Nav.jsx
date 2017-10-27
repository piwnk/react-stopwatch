import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import StopWatch from './StopWatch';

String.prototype.capitalize = function () {
   return this.slice(0, 1).toUpperCase() + this.slice(1, this.length);
};

// const stopwatchElement = new StopWatch(document.querySelector('.stopwatch'));

class Anchor extends Component {
   static propTypes = {
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
   }

   render() {
      return (
         <a
            id={this.props.label}
            label={this.props.label}
            href="#"
            className="button"
            onClick={this.props.onClick} // do osobnej metody
         >{this.props.label.capitalize()}
         </a>
      );
   }
}

const Anchors = ({ onStart, onStop, onReset, onSubmit }) => {
   const labels = ['start', 'stop', 'reset', 'submit'];

   return (
      <div>
         <Anchor label="start" onClick={onStart} />
         <Anchor label="stop" onClick={onStop} />
         <Anchor label="reset" onClick={onReset} />
         <Anchor label="submit" onClick={onSubmit} />
      </div>
   );
};

const Nav = ({ onStart, onStop, onReset, onSubmit }) => (
   <nav>
      <Anchors
         {...{
            onStart,
            onStop,
            onReset,
            onSubmit
         }}
      />
   </nav>
);

Anchors.propTypes = {
   onStart: PropTypes.func.isRequired,
   onStop: PropTypes.func.isRequired,
   onReset: PropTypes.func.isRequired,
   onSubmit: PropTypes.func.isRequired
};

Nav.propTypes = {
   onStart: PropTypes.func.isRequired,
   onStop: PropTypes.func.isRequired,
   onReset: PropTypes.func.isRequired,
   onSubmit: PropTypes.func.isRequired
};

export default Nav;
