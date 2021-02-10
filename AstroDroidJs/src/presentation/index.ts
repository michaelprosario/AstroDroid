function onMoveForward(obj: any) {
    obj.emit('OnMoveCommand', { moveRequest: 'forward' }, true);
}

function onMoveBack(obj: any) {
    obj.emit('OnMoveCommand', { moveRequest: 'back' }, true);
}

function onMoveLeft(obj: any) {
    obj.emit('OnMoveCommand', { moveRequest: 'left' }, true);
}

function onMoveRight(obj: any) {
    obj.emit('OnMoveCommand', { moveRequest: 'right' }, true);
}

// #https://stackoverflow.com/questions/46052476/can-a-keyboard-event-be-captured-on-an-aframe-entity
document.addEventListener('keydown', function (event) {
    document.querySelectorAll('.listenonkey').forEach(function (obj) {
        switch (event.key) {
            case 'i':
                onMoveForward(obj);
                break;
            case 'j':
                onMoveLeft(obj);
                break;
            case 'k':
                onMoveBack(obj);
                break;
            case 'l':
                onMoveRight(obj);
                break;
        }
    });
});
