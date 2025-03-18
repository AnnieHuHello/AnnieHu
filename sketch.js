let shapes = [];
let selectedShape = null;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let scaleY = 1;
let scaleZ = 1;
let isRotatingLeft = false;
let isRotatingRight = false;
const GRID_SIZE = 10;
const SHAPE_SIZE = 30;
const SPACING = 60;
const ROTATION_SPEED = 0.1;

function setup() {
    createCanvas(800, 800);
    background(240);
    
    // Create 10x10 grid of shapes
    createGrid();
}

function createGrid() {
    shapes = [];
    const startX = (width - (GRID_SIZE - 1) * SPACING) / 2;
    const startY = (height - (GRID_SIZE - 1) * SPACING) / 2;
    
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            shapes.push({
                x: startX + i * SPACING,
                y: startY + j * SPACING,
                size: SHAPE_SIZE,
                color: color(random(255), random(255), random(255)),
                rotation: 0
            });
        }
    }
}

function draw() {
    background(240);
    
    // Apply global transformations
    push();
    scale(1, scaleY, scaleZ);
    
    // Handle continuous rotation
    if (isRotatingLeft) {
        for (let shape of shapes) {
            shape.rotation -= ROTATION_SPEED;
        }
    }
    if (isRotatingRight) {
        for (let shape of shapes) {
            shape.rotation += ROTATION_SPEED;
        }
    }
    
    // Draw all shapes
    for (let shape of shapes) {
        push();
        translate(shape.x, shape.y);
        rotate(shape.rotation);
        
        // Draw a star shape
        fill(shape.color);
        stroke(0);
        strokeWeight(2);
        
        beginShape();
        for (let i = 0; i < 5; i++) {
            const angle = (i * TWO_PI) / 5;
            const x = cos(angle) * shape.size;
            const y = sin(angle) * shape.size;
            vertex(x, y);
        }
        endShape(CLOSE);
        
        // Draw inner points
        beginShape();
        for (let i = 0; i < 5; i++) {
            const angle = (i * TWO_PI) / 5 + PI / 5;
            const x = cos(angle) * (shape.size * 0.4);
            const y = sin(angle) * (shape.size * 0.4);
            vertex(x, y);
        }
        endShape(CLOSE);
        
        pop();
    }
    
    pop();
}

function mousePressed() {
    if (mouseButton === LEFT) {
        // 检查是否点击了某个图形
        for (let shape of shapes) {
            const dx = mouseX - shape.x;
            const dy = mouseY - shape.y;
            const distance = sqrt(dx * dx + dy * dy);
            
            if (distance < shape.size) {
                selectedShape = shape;
                isDragging = true;
                dragStartX = mouseX - shape.x;
                dragStartY = mouseY - shape.y;
                break;
            }
        }
    }
}

function mouseDragged() {
    if (isDragging && selectedShape) {
        selectedShape.x = mouseX - dragStartX;
        selectedShape.y = mouseY - dragStartY;
    }
}

function mouseReleased() {
    isDragging = false;
    selectedShape = null;
}

function keyPressed() {
    switch(key.toLowerCase()) {
        case 'w':
            scaleY = min(2, scaleY + 0.1);
            break;
        case 's':
            scaleY = max(0.5, scaleY - 0.1);
            break;
        case 'a':
            scaleZ = min(2, scaleZ + 0.1);
            break;
        case 'd':
            scaleZ = max(0.5, scaleZ - 0.1);
            break;
        case 'q':
            isRotatingLeft = true;
            break;
        case 'e':
            isRotatingRight = true;
            break;
    }
}

function keyReleased() {
    switch(key.toLowerCase()) {
        case 'q':
            isRotatingLeft = false;
            break;
        case 'e':
            isRotatingRight = false;
            break;
    }
}