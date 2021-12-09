let $btn = document.querySelector('#add-btn');
let $area = document.querySelector('.area');
let $box = document.querySelector('.box');

const areaWidth = $area.offsetWidth;
const areaHeight = $area.offsetHeight;

const boxWidth = 200;
const boxHeight = 200;

let boxes = [];
let action = false;
let $selectedBox = null;
let selectedBoxIndex = null;

let startCoords ={
    x: 0,
    y: 0,
}
let currentCoords ={
    x: 0,
    y: 0,
}
let distance ={
    x: 0,
    y: 0,
}

if (!!localStorage.getItem('coords')) {
    boxes = JSON.parse(localStorage.getItem('coords'));
    boxGenerator(boxes);
}

function boxGenerator(list){
    let template = '';
    for(let i = 0; i< list.length; i++){
        template += '<div class="box" id="' +  String(i) + "box" + '" style="transform: translate(' + list[i].x + 'px, ' + 
        list[i].y + 'px)"><textarea class="textarea" resize=none id="' + String(i) + "textarea" +'"> ' + list[i].text + '</textarea></div>';
    }
    $area.innerHTML = template;
}

function boxController(coords){
    $selectedBox.style.cssText = 'transform: translate(' + coords.x + 'px, ' + coords.y + 'px)';
}

$area.addEventListener('mousedown', function(e){
    if(!!e.target.classList.contains('box')){
        action = true;
        $selectedBox = e.target;
        selectedBoxIndex = parseFloat($selectedBox.getAttribute('id'));
        startCoords.x = e.clientX;
        startCoords.y = e.clientY;
}
});

$area.addEventListener('mouseup', function(e){
    if(!e.target.classList.contains('add-btn')){
        action = false;
        boxes[selectedBoxIndex].x = distance.x;
        boxes[selectedBoxIndex].y = distance.y;
        localStorage.setItem('coords', JSON.stringify(boxes));
    }
});

$area.addEventListener('mousemove', function(e){
if(action){
    currentCoords.x = e.clientX;
    currentCoords.y = e.clientY;

    distance.x = boxes[selectedBoxIndex].x + (currentCoords.x - startCoords.x);
    distance.y = boxes[selectedBoxIndex].y + (currentCoords.y - startCoords.y);

    if (distance.x >= (areaWidth - boxWidth)) distance.x = areaWidth - boxWidth;
    if (distance.x <= 0) distance.x = 0;

    if (distance.y >= (areaHeight - boxHeight)) distance.y = areaHeight - boxHeight;
    if (distance.y <= 0) distance.y = 0;

    boxController(distance);
}
});

$btn.addEventListener('click', function(){
    if(!!boxes.length){
        boxes.push({
            x: 0,
            y: 0,
            text: "Заметка №" + (boxes.length + 1)
        })
    }
    else{
        boxes =[{
            x: 0,
            y: 0,
            text: "Заметка №" + (boxes.length + 1)
        }];
    }
    boxGenerator(boxes);
});



