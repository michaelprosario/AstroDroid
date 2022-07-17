import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as Blockly from 'blockly';
import { GameConstants } from '../core/entities/game-constants';
import { GridBot, GridBotSetup } from '../core/entities/grid-bot';
import { GridBotIdleBehavior } from '../grid-bot/grid-bot-idle-behavior';
import { GridBotMoveBehavior } from '../grid-bot/grid-bot-move-behavior';
import { GridBotView } from '../grid-bot/grid-bot-view';
declare var require: any;
var Interpreter = require('js-interpreter');
declare var Blockly: any;

@Component({
  selector: 'app-edit-bot-blockly',
  templateUrl: './edit-bot-blockly.component.html',
  styleUrls: ['./edit-bot-blockly.component.scss']
})
export class EditBotBlocklyComponent implements OnInit {

  workspace: any;
  botCanvas: any;
  botImage: any;
  gridBot: GridBot | undefined;

  // @ts-ignore
  gridBotView: GridBotView;
  constructor() { }

  ngOnInit() {
    const blocklyDiv = document.getElementById('divBlockly');
    const xmlToolBox = document.getElementById('xmlToolBox');

    this.workspace = Blockly.inject(blocklyDiv, {
      readOnly: false,
      media: 'media/',
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      toolbox:  xmlToolBox?.outerHTML   } as Blockly.BlocklyOptions);

      this.makeBot();   
      
      this.botCanvas = document.getElementById("botCanvas");

      this.botImage = new Image();
      this.botImage.src = "../../../assets/bot.png"
      this.botImage.onload = () => {        
        
        if(this.gridBot){
          this.gridBotView = new GridBotView(this.gridBot, this.botCanvas, this.botImage );
        }        
        this.sceneUpdate();        
      }      
  }

  runBlocklyCode(code: string){
    
    let context = this;
    var initFunc = function(interpreter: any, globalObject: any) {
      var moveForward = (delta: number) => { return context.gridBot?.moveForward(delta); };
      var moveLeft = (delta: number) => { return context.gridBot?.moveLeft(delta); };
      var moveRight = (delta: number) => { return context.gridBot?.moveRight(delta); };
      interpreter.setProperty(globalObject, 'moveForward',interpreter.createNativeFunction(moveForward));
      interpreter.setProperty(globalObject, 'moveLeft',interpreter.createNativeFunction(moveLeft));
      interpreter.setProperty(globalObject, 'moveRight',interpreter.createNativeFunction(moveRight));
    };    
    
    const myInterpreter = new Interpreter(code,initFunc);    
    
    // run code runner ...
    function nextStep() {
      if (myInterpreter.step()) {
        window.setTimeout(nextStep, 10);
      }
    }
    nextStep();    
  }

  private makeBot() {
    this.gridBot = new GridBot();
    this.gridBot.setupBot(new GridBotSetup(5, 5, GameConstants.gridHeight));
    this.gridBot.currentBehavior = new GridBotIdleBehavior();
    this.gridBot.moveBehavior = new GridBotMoveBehavior();
    this.gridBot.start();
  }

  sceneUpdate(){
    let ctx = this.botCanvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.setTransform(1,0,0,1,0,0); 
    ctx.fillRect(0,0,this.botCanvas.width, this.botCanvas.height);
    
    this.gridBot?.update();
    this.gridBotView.update();

    setTimeout(() => this.sceneUpdate(), 5);
  }

  executeCode(){
    const blocklyDiv = document.getElementById('divBlockly');    
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    console.log(code);
    this.runBlocklyCode(code);    
  }
}
