import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as Blockly from 'blockly';

declare var Blockly: any;

@Component({
  selector: 'app-edit-bot-blockly',
  templateUrl: './edit-bot-blockly.component.html',
  styleUrls: ['./edit-bot-blockly.component.scss']
})
export class EditBotBlocklyComponent implements OnInit {

  workspace: any;
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

  }

  onGetCode(){
    const blocklyDiv = document.getElementById('divBlockly');
    
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    
    console.log(code);
  }
}
