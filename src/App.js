import './App.css';
import React from 'react';

// const keysVal = ["AC", "+/-", "%", "/", '7', '8', '9', "X", '4', '5', '6', "-", '1', '2', '3', "+", '0', ".", "="];
const keysVal = [{btn: "AC", val: "clear"}, {btn: "+/-", val: "sign"}, {btn: "%", val: "percent"}, {btn: "/", val: "divide"}, 
{btn: '7', val: "seven"}, {btn: '8', val: "eight"}, {btn: '9', val: "nine"}, {btn: "X", val: "multiply"}, {btn: '4', val: "four"}, 
{btn: '5', val: "five"}, {btn: '6', val: "six"}, {btn: "-", val: "subtract"}, {btn: '1', val: "one"}, {btn: '2', val: "two"}, 
{btn: '3', val: "three"}, {btn: "+", val: "add"}, {btn: '0', val: "zero"}, {btn: ".", val: "decimal"}, {btn: "=", val: "equals"}];

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      num: '0',
      res: '',
      sign: ""
    }
    this.handler=this.handler.bind(this);
  }

  handleClick = (e) => {
    let val = e.target.innerText;
    this.handler(val);
  } 

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress = (event) => {
    let val = event.key.toUpperCase();
    this.handler(val);
  }

  handler(val) {
    if (val >= 0 && val<=9) {
      if (this.state.num==='0') {
        this.setState({
          num: val
        });
      }else if (this.state.num==='-0') {
        this.setState({
          num: '-'+val
        });
      }else {
        this.setState({
          num: this.state.num + val
        });
      }
      if(this.state.sign===""){
        this.setState({
          res: "0"
        })
      }       
    } else if (val === 'AC') {
      this.setState({
        num: '0',
        res: '',
        sign: ""
      });
    } else if (val === '=') {
      this.compute();
      this.setState({
        sign: ""
      });
    } else if (val === '.') {
      if (!this.state.num.includes('.')) {
        this.setState({
          num: this.state.num + val
        });
      }
    } else if (val === '+/-') {
      if (!this.state.num.includes('-')) {
        this.setState({
          num: '-'+this.state.num
        });
      }else{
        this.setState({
          num: this.state.num.replace('-',"")
        });
      }
    } else if (val==="+" || val==="-" || val==="X" || val==="/"){ //need to let (-) be an option for second operand
      if((this.state.sign==="X" || this.state.sign==="/") && (val==="-") && (this.state.num==="" || this.state.num==="-")){
        if (!this.state.num.includes('-')) {
          this.setState({
            num: '-'+this.state.num
          });
        }else{
          this.setState({
            num: this.state.num.replace('-',"")
          });
        } 
      }else if((this.state.sign==="X" || this.state.sign==="/") && (val==="+") && (this.state.num==="" || this.state.num==="-")){
        this.setState({
          num: this.state.num.replace('-',""),
          sign: val
        });
      }else{
        this.setState({
          num: '',
          res: this.state.num===''? this.state.res : this.state.num,
          sign: val
        }); 
        this.compute();
      }     
    } else if (val==="%"){
      this.setState({
        num: '',
        res: this.state.num===''? this.state.res : this.state.num,
        sign: val
      }, this.compute);   //compute prior operation first
      this.compute();  
    } 
  }

  compute(){
    if (this.state.sign==="+") {
      let result = Number(this.state.res) + Number(this.state.num);
      if (this.state.num==='') {
        result = Number(this.state.res);
      }
      this.setState({
        num: '',
        res: result.toString()
      });
    } else if (this.state.sign==="-") {
      let result = Number(this.state.res) - Number(this.state.num);
      if (this.state.num==='') {
        result = Number(this.state.res);
      }
      this.setState({
        num: '',
        res: result.toString()
      });
    } else if (this.state.sign==="X") {
      let result = Number(this.state.res) * Number(this.state.num);
      if (this.state.num==='') {
        result = Number(this.state.res);
      }
      this.setState({
        num: '',
        res: result.toString()
      });
    } else if (this.state.sign==="/") {
      let result = Number(this.state.res) / Number(this.state.num);
      if (this.state.num==='') {
        result = Number(this.state.res);
      }
      this.setState({
        num: '',
        res: result.toString()
      });
    } else if (this.state.sign==="%") {
      let result = Number(this.state.res) / 100;
      this.setState({
        num: '',
        res: result.toString(),
        sign: ""
      });
    }else {
      this.setState({
        num: '',
        res: this.state.num===''? this.state.res : this.state.num,
      });
    }
    
  } 
  
  render(){
    return (
      <div className="App">
        <div className='display' id="display">
        {(this.state.num!=="")?this.state.num:this.state.res} 
        {/* : {this.state.num} , {this.state.res} , {this.state.sign} */}
        </div>
        <div className='keys'>
          {keysVal.map((item, i) => {
            return(
              <button 
                key={i} 
                id={item.val}
                onClick={this.handleClick}
              >{item.btn}</button>
            )
          })}
        </div>
      </div>
    );
  }
}
