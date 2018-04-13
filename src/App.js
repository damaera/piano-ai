import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Tone from 'tone'
const synth = new Tone.PolySynth().toMaster();

const NOTES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'].reverse()

class Note extends Component {
  state = {
    active: false
  }
  render() {
    return (
      <div className='' />
    );
  }
}
class App extends Component {

  state = {
    notes: [
      { note: 'c5', time: 1 },
      { note: 'c5', time: 2 },
    ]
  }

  onPlay = () => {
    const CHORD_C = ["c3", "e3", "g3"];
    const CHORD_F = ["f3", "a3", "c4"];
    const CHORD_G = ["g3", "b3", "d4"];
    const CHORD_A_MIN = ["a3", "c4", "e4"];
    this.playNote({ note: CHORD_F, time: 1 });
    this.playNote({ note: CHORD_C, time: 9 });
    this.playNote({ note: CHORD_G, time: 17 });
    this.playNote({ note: CHORD_A_MIN, time: 25 });
  }

  // playChord = ({ chord, bar }) => {
  //   return this.playNote({ note: chord, time: (bar - 1) * 8 + 1 });
  // }

  playNote = ({ note, time }) => {
    if (time) {
      const barTime = Math.ceil(time / 16)
      const quarterTime = Math.ceil(time / 4) % 4 === 0 ? 4 : Math.ceil(time / 4) % 4;
      const sixteenTime = time % 4 === 0 ? 4 : time % 4
      const timeSynth = `${barTime}:${quarterTime}:${sixteenTime}`
      console.log(timeSynth)
      return synth.triggerAttackRelease(note, "4n", timeSynth);
    } else {
      return synth.triggerAttackRelease(note, "4n");
    }
  }

  toggle = ({ note, time }, isActive) => {
    if (!isActive) {
      this.setState({ notes: [
        ...this.state.notes, { note, time }
      ] });
    } else {
      this.setState({ notes: [...this.state.notes, { note, time }] });
    }
  }
  
  render() {
    return <div className="App">
        <div className='header'>
          {/* <button onClick={this.onPlay}>Play</button> */}
        </div>
        
        <div className='roll-wrapper'>
          <div className='tuts-wrapper'>
            {[5,4,3].map((octave) => {
              return NOTES.map((note) => {
                return (

                  <div key={note + octave} className='line'>
                    <div
                      onMouseDown={() => this.playNote({ note: note + octave })}
                      className={`tuts ${note.length === 2 ? "black" : "white"}`}>
                      { note + octave }
                    </div>
                    <div className='roll-row'>
                      {[1,2,3,4,5,6,7,8].map((i) => {
                        let isActive = false
                        this.state.notes.forEach((noteState) => {
                          if (noteState.note === (note + octave) && noteState.time === i) {
                            isActive = true
                          }
                        })
                        return (
                          <div
                            className={`roll-cell ${isActive && 'active'}`}
                            onMouseDown={() => this.toggle({ note: note + octave, time: i }, isActive)}
                          />
                        )
                      })}
                    </div>
                  </div>
                  
                )
              })
            })}
          </div>
        </div>
        
      </div>;
  }
}

export default App;
