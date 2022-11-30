import React from 'react';
import {undoLast, redoLast, clearCanvas, drawShapes, saveImage, changeColor} from '../utils/helpers'

interface AppProps {}

function App({}: AppProps) {
  return (
    <>
      <p>Testing...</p>
      <div className="field">
        <canvas id="canvas"></canvas>
        <div className="tools">
          <button onClick={() => undoLast()} type="button" className="button">Undo</button>
          <button onClick={() => redoLast()} type="button" id="buttonRedo" className="button">
            Redo
          </button>
          <button onClick={() => clearCanvas()} type="button" className="button" id="clear">
            Clear
          </button>
          <button onClick={() => drawShapes()} type="button" className="button" id="draw">A.i Draw</button>
          <button onClick={() => saveImage()} type="button" className="button" id="save">Save</button>

          <div onClick={() => changeColor} className="color-field" style={{background: 'red'}}></div>
          <div onClick={() => changeColor} className="color-field" style={{background: 'blue'}}></div>
          <div onClick={() => changeColor} className="color-field" style={{background: 'green'}}></div>
          <div onClick={() => changeColor} className="color-field" style={{background: 'yellow'}}></div>

          <input onInput={() => {}} type="color" className="color-picker" />
          <input type="range" min="1" max="100" className="pen-range" onInput={() => {}} />
        </div>
      </div>
    </>
  )
}

export default App;