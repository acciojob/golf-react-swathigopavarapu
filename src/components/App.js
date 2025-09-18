import React, { Component } from "react";
import '../styles/App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderBall: false,
      posi: 0,
      ballPosition: { left: "50%", top: "10%" }
    };
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    clearInterval(this.ballInterval);
  }

   handleKeyDown(e) {
    if (!this.state.renderBall) return;
    if (e.key === "ArrowRight") {
      this.setState(prevState => {
        const newPos = prevState.posi + 5;
        return {
          posi: newPos,
          ballPosition: { left: `calc(50% + ${newPos}px)`, top: "10%" }
        };
      });
    }
  }
  buttonClickHandler() {
    this.setState(
      { renderBall: true, posi: 0, ballPosition: { left: "50%", top: "10%" } },
      () => {
        let steps = 0;
        this.ballInterval = setInterval(() => {
          steps++;
          if (steps >= 20) {
            clearInterval(this.ballInterval);
          }
          this.setState(prevState => {
            const newPos = prevState.posi + 5;
            return {
              posi: newPos,
              ballPosition: { left: `calc(50% + ${newPos}px)`, top: "10%" }
            };
          });
        }, 100); 
      }
    );
  }
  renderBallOrButton() {
    if (this.state.renderBall) {
      return <div className="ball" style={this.state.ballPosition}></div>;
    } else {
      return <button className="start" onClick={this.buttonClickHandler}>Start</button>;
    }
  }
  render() {
    return (
      <div className="playground">
        {this.renderBallOrButton()}
      </div>
    );
  }
}

export default App;
