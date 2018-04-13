import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Tone from 'tone'
const synth = new Tone.PolySynth().toMaster();

const NOTES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']

class App extends Component {

  onPlay = () => {
    const CHORD_C = ["c3", "e3", "g3"];
    const CHORD_F = ["f3", "a3", "c4"];
    const CHORD_G = ["g3", "b3", "d4"];
    const CHORD_A_MIN = ["a3", "c4", "e4"];
    this.playChord({ chord: CHORD_F, bar: 1 });
    this.playChord({ chord: CHORD_C, bar: 2 });
    this.playChord({ chord: CHORD_G, bar: 3 });
    this.playChord({ chord: CHORD_A_MIN, bar: 4 });
  }

  playChord = ({ chord, bar }) => {
    return this.playNote({ note: chord, time: (bar - 1) * 8 + 1 });
  }

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
  
  render() {
    return <div className="App">
        <button onClick={this.onPlay}>Play</button>
        
        {[3,4,5].reverse().map((octave) => {
          return NOTES.reverse().map((note) => {
            return <div key={note + octave} onMouseDown={() => this.playNote(
                    { note: note + octave }
                  )} className={`tuts ${note.length === 2 ? "black" : "white"}`}>
                { note + octave }
              </div>;
          })
        })}
        
      </div>;
  }
}

export default App;
