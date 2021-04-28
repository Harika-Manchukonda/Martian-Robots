import React, { Component } from 'react';
import * as PropTypes from 'prop-types'
import Chance from 'chance'; 
import { bounds } from '../config';
import { instruct } from '../controller';
import Robot from '../classes/martianRobot';
import Martian from '../classes/martian';

const chance = new Chance();

export default class Instruct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      txtInstructions: '',
      txtInstructionErrors: ''
    };
  }

  handleInstructionChange = (event) => {
    this.setState({txtInstructions: event.target.value});
  }

  /**
   * Handler for submitting instructions and updating application
   * state with data required to render MarsList, MarsGrid etc.
   * TODO: Add error text for failed instructions.
   */
  submitInstructions = (e) => {
    e.preventDefault();

    const inputArr = this.state.txtInstructions.split('\n\n');
    // const beforeInstructions = [];

    const afterInstructions = inputArr.map((instruction, i) => {
      const currentInstructionSet = instruction.split('\n');

      if (i === 0) {
        const defaultsArr = currentInstructionSet[0].split(' ');
        if (bounds.isSet === false) {
          bounds.x = defaultsArr[0];
          bounds.y = defaultsArr[1];
          currentInstructionSet.shift(); // after we get the bounds delete its element from the instruction array.
        }
      }

      const [martianStr, instructionsStr] = currentInstructionSet;
      const [x, y, o, type = 'R'] = martianStr.trim().split(' ');
      let tempMartian;

      // create a martian/robot with the line 1 of each instruction pair
      try {
        if (type.trim().toUpperCase() === 'M') {
          tempMartian = new Martian(chance.syllable({length: 5}), Number.parseInt(x, 10), Number.parseInt(y, 10), o);
        }
        else {
          tempMartian = new Robot(chance.syllable({length: 5}), Number.parseInt(x, 10), Number.parseInt(y, 10), o);
        }
      }
      catch (e) {
        this.setState({txtInstructionErrors: 'You failed to make a martian/robot.'});
        return null;
      }

      try {
        return instruct(tempMartian, instructionsStr);
      }
      catch (e) {
        this.setState({txtInstructionErrors: 'Your instructions failed. Please check the readme.'});
      }
    });

    this.props.addToStore(afterInstructions);
    this.setState({txtInstructions: '', txtInstructionErrors: ''}); // clear text area
  }


  /**
   * Toggles ability to submit instructions.
   * We need at least 2 or 3 lines to try and do anything valuable
   */
  isValidInstruction = () => {
    const compareTo = bounds.isSet ? 2 : 3;
    return !(this.state.txtInstructions.length >= 0 &&
      this.state.txtInstructions.trim().split('\n').length >= compareTo);
  }


  /**
   * Does what it says on the label: clears text from instruction area
   */
  resetForm = (e) => {
    e.preventDefault();
    this.setState({txtInstructions: ''});
  }

  render() {
    const errMsg = this.state.txtInstructionErrors;
    const InstructionErrors = errMsg.length > 0 ? <span id='InstructionErrors' className="alert label">{errMsg}</span> : null;
    return (
      <form ref={input => this.instructionsForm = input} onSubmit={e => this.submitInstructions(e)}>
        <label>
          Please enter intructions:
          <textarea
            id='txtIntructions'
            onChange={this.handleInstructionChange}
            cols='30'
            value={this.state.txtInstructions}
          >
          </textarea>
        </label>
        {InstructionErrors}
        <div className='small expanded button-group'>
          <button title='Run Instructions' className='success button' type='submit' disabled={this.isValidInstruction()} >Instruct</button>
          <button title='Clear Instructions' className='button' type='button' disabled={this.state.txtInstructions.length === 0} onClick={this.resetForm} >Clear</button>
        </div>
      </form>
    );
  }

  static propTypes = {
    addToStore: PropTypes.func.isRequired,
  };

}
