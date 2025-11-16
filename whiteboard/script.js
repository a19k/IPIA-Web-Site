//Prikupi sve DOM elemente
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const eraserBtn = document.getElementById("eraserBtn");

//Pocetne postavke
let drawing = false;
let currentColor = colorPicker.value;
let isErasing = false;

//Crtanje
function startDraw(e){
	drawing = true;
	draw(e);
}

function endDraw(e){
	drawing = false;
	ctx.beginPath();
}

function draw(e){
	if(!drawing) return;

	const rect = canvas.getBoundingClientRect();

	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;

	const clientX = e.clientX || e.touches?.[0]?.clientX;
	const clientY = e.clientY || e.touches?.[0]?.clientY;

	const x = (clientX - rect.left) * scaleX;
	const y = (clientY - rect.top) * scaleY;

	ctx.lineWidth = brushSize.value;
	ctx.lineCap = "round";
	ctx.strokeStyle = isErasing ? "#FFFFFF" : currentColor;

	ctx.lineTo(x,y);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x,y);
}

//Mouse Events
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mousemove", draw);

//Touch Events
canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", (e) => {
	draw(e);
	e.preventDefault();
});
canvas.addEventListener("touchend", endDraw);

//Toolbar Logic
colorPicker.addEventListener("input", () => {
	currentColor = colorPicker.value;
	isErasing = false;
});

eraserBtn.addEventListener("click", () => {
	isErasing = !isErasing;
	if(isErasing) eraserBtn.style.backgroundColor = "salmon";
	else eraserBtn.style.backgroundColor = "pink";
});

clearBtn.addEventListener("click", () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener("click", () => {
	const image = canvas.toDataURL("image/png");
	const link = document.createElement("a");
	link.href = image;
	link.download = "moj_crtez.png";
	link.click();
});

