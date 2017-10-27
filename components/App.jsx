import React, { Component } from 'react';

import Nav from './Nav';
import StopWatch from './StopWatch';
import List from './List';


const pad0 = (value) => {
   const result = value.toString();
   return result.length < 2 ? `0${result}` : result;
};

const format = times => `${times.minutes}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;

export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         running: false,
         times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
         },
         watch: null,
         records: []
      };
   }

   reset = () => {
      this.setState({
         times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
         }
      });
   }

   start = () => {
      // console.log(this.state.times);
      if (!this.state.running) {
         this.state.running = true;
         this.state.watch = setInterval(() => this.step(), 10);
      }
   }

   stop = () => {
      this.setState({
         running: false
      });
      clearInterval(this.state.watch);
   }

   step = () => {
      if (this.state.running) {
         this.calculate();
      }
   }

   calculate = () => {
      this.state.times.miliseconds += 1;
      if (this.state.times.miliseconds > 99) {
         this.setState({
            times: {
               minutes: this.state.times.minutes,
               seconds: this.state.times.seconds + 1,
               miliseconds: 0
            }
         });
      }
      if (this.state.times.seconds > 59) {
         this.setState({
            times: {
               minutes: this.state.times.minutes + 1,
               seconds: 0,
               miliseconds: this.state.times.miliseconds
            }
         });
      } else {
         this.setState({ times: this.state.times });
      }
   }


   submit = () => {
      // this.state.records.push(format(this.state.times));
      this.setState(prevState => ({
         records: [...prevState.records, format(this.state.times)]
      }));
      // const li = document.createElement('li');
      // li.innerText = this.format(this.times);
      // this.state.list.appendChild(li);
   }


   render() {
      return (
         <div
            className="wrapper"
         >
            <Nav
               onStart={this.start}
               onStop={this.stop}
               onReset={this.reset}
               onSubmit={this.submit}
            />
            <StopWatch
               times={format(this.state.times)}
            />
            <List
               items={this.state.records}
            />
         </div>
      );
   }
}
