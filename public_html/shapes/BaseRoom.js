/* global stack, concrete */

function BaseRoom(){
}

BaseRoom.prototype.draw = function () {
    concrete.activate();
    gl.uniform1i(uColorMode, 1);

    this.drawFloor();
    this.drawWalls();

};

BaseRoom.prototype.drawFloor = function () {
    stack.push();
    stack.multiply(scalem(10, .01, 10));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

BaseRoom.prototype.drawWalls = function () {

    //left
    stack.push();
    stack.multiply(translate(-5.25, 5, 0));
    stack.multiply(scalem(.5, 10, 10));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //right
    stack.push();
    stack.multiply(translate(5.25, 5, 0));
    stack.multiply(scalem(.5, 10, 10));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();


    //ceiling
    stack.push();
    stack.multiply(translate(0, 9.75, 0));
    stack.multiply(scalem(10, .5, 10));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();


};
