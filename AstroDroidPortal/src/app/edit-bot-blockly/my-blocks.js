
Blockly.Blocks['fwd'] = {
  init: function () {
      this.setHelpUrl('http://www.example.com/');
      this.appendValueInput("blocks")
          .setCheck("Number")
          .appendField("fwd angle=");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
  }
};

Blockly.JavaScript['fwd'] = function (block) {
  var value_blocks = Blockly.JavaScript.valueToCode(block, 'blocks', Blockly.JavaScript.ORDER_ATOMIC);

  var code = "moveForward(" + value_blocks + ");\n";
  return code;
};

Blockly.Blocks['turn'] = {
  init: function () {
      this.setHelpUrl('http://www.example.com/');
      this.appendValueInput("angle")
          .setCheck("Number")
          .appendField("turn angle=");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
  }
};

Blockly.JavaScript['turn'] = function (block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);

  var code = "turn(" + angle + ");\n";
  return code;
};


Blockly.Blocks['left'] = {
  init: function () {
      this.setHelpUrl('http://www.example.com/');
      this.appendValueInput("angle")
          .setCheck("Number")
          .appendField("left angle=");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
  }
};

Blockly.JavaScript['left'] = function (block) {
  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);

  var code = "moveLeft(" + value_angle + ");\n";
  return code;
};


Blockly.Blocks['right'] = {
  init: function () {
      this.setHelpUrl('http://www.example.com/');
      this.appendValueInput("angle")
          .setCheck("Number")
          .appendField("right angle=");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
  }
};

Blockly.JavaScript['right'] = function (block) {
  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);

  var code = "moveRight(" + value_angle + ");\n";
  return code;
};




Blockly.Blocks['chkpt'] = {
  init: function () {
      this.setHelpUrl('http://www.example.com/');
      this.appendValueInput("title")
          .setCheck("String")
          .appendField("checkPoint title=");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
  }
};

Blockly.JavaScript['chkpt'] = function (block) {
  var value_title = Blockly.JavaScript.valueToCode(block, 'title', Blockly.JavaScript.ORDER_ATOMIC);

  var code = "saveLocation(" + value_title + ");\n";
  return code;
};



Blockly.Blocks['move'] = {
  init: function () {
      this.setHelpUrl('http://www.example.com/');
      this.appendValueInput("title")
          .setCheck("String")
          .appendField("moveToCheckPoint title=");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
  }
};

Blockly.JavaScript['move'] = function (block) {
  var value_title = Blockly.JavaScript.valueToCode(block, 'title', Blockly.JavaScript.ORDER_ATOMIC);

  var code = "moveToLocation(" + value_title + ");\n";
  return code;
};

