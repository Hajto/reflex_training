import React from "react";
import _ from "lodash/fp";
import TrainingPot from "./TrainingPot";

const stateZero = [false, false, false, false];
const colors = ["red", "blue", "yellow", "green"];

const maxInASequence = process.env.REACT_APP_MAX_IN_SEQUENCE || 3;
const minorDelay = process.env.REACT_APP_MINOR_DELAY || 750;
const majorDelay = process.env.REACT_APP_MAJOR_DELAY || 3000;

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      pots: _.clone(stateZero),
      audios: this.setupAudio(),
      repeatingInterval: null
    };
    this.scheduleExecution = this.scheduleExecution.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  setupAudio() {
    let audios = [];
    for (let i = 1; i <= 4; i++) {
      const audioPath = process.env.PUBLIC_URL + "sounds/" + i + ".mp3";
      audios.push(new Audio(audioPath));
    }
    return audios;
  }

  render() {
    const pots = _.flow(
      _.zip(colors),
      _.entries,
      _.map(([index, [color, enabled]]) => (
        <TrainingPot key={index} potColor={color} enabled={enabled}>
          {parseInt(index) + 1}
        </TrainingPot>
      ))
    )(this.state.pots);

    return (
      <div>
        <div>
          <button onClick={this.handleToggle}>Toggle</button>
          <button onClick={this.handleStart}> Single run </button>
        </div>
        <div style={{ display: "flex" }}>{pots}</div>
      </div>
    );
  }

  handleStart() {
    const numberOfPots = this.getRandomInt(1, maxInASequence);
    const pots = _.flow(_.clone, _.shuffle, _.take(numberOfPots))(colors);
    this.scheduleExecution(pots);
  }

  handleToggle() {
    if (this.state.repeatingInterval != null) {
      clearInterval(this.state.repeatingInterval);
      this.setState({
        repeatingInterval: null
      });
    } else {
      this.handleStart();
      this.setState({
        repeatingInterval: setInterval(this.handleStart, majorDelay)
      });
    }
  }

  scheduleExecution(pots) {
    const newPotsState = _.clone(stateZero);

    if (pots.length > 0) {
      const processedPot = pots[0];
      const audioElementIndex = colors.indexOf(processedPot);

      newPotsState[audioElementIndex] = true;
      this.state.audios[audioElementIndex].play();

      setTimeout(() => {
        this.scheduleExecution(_.drop(1)(pots));
      }, minorDelay);
    }
    this.setState(state => ({ ...state, pots: newPotsState }));
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
