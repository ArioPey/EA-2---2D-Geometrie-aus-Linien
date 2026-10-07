// 2D Geometrie aus Linien – WebGL / GL_LINES
"use strict";

const canvas = document.getElementById("glCanvas");
const statusElement = document.getElementById("status");
const vertexCountElement = document.getElementById("vertexCount");

// 42 2D-Vertices = 21 Liniensegmente.
// Je zwei aufeinanderfolgende Wertepaare bilden eine Linie.
const vertices = new Float32Array([
  -0.58,0.55,-0.38,0.88, -0.38,0.88,-0.18,0.68,
  -0.18,0.68,0.18,0.68, 0.18,0.68,0.38,0.88,
  0.38,0.88,0.58,0.55, 0.58,0.55,0.50,0.05,
  0.50,0.05,0.62,-0.22, 0.62,-0.22,0.48,-0.18,
  0.48,-0.18,0.28,-0.42, 0.28,-0.42,0.02,-0.55,
  0.02,-0.55,-0.28,-0.42, -0.28,-0.42,-0.48,-0.18,
  -0.48,-0.18,-0.62,-0.22, -0.62,-0.22,-0.50,0.05,
  -0.50,0.05,-0.58,0.55,

  -0.34,0.42,-0.20,0.42, -0.20,0.42,-0.20,0.30,
  -0.20,0.30,-0.34,0.30, -0.34,0.30,-0.34,0.42,

  0.20,0.42,0.34,0.42, 0.34,0.42,0.34,0.30,
  0.34,0.30,0.20,0.30, 0.20,0.30,0.20,0.42,

  -0.05,0.24,0.05,0.24, 0.05,0.24,0.00,0.15,
  0.00,0.15,-0.09,0.08, 0.00,0.15,0.09,0.08,

  -0.18,0.22,-0.48,0.26, -0.18,0.14,-0.50,0.12,
  0.18,0.22,0.48,0.26, 0.18,0.14,0.50,0.12,

  -0.16,-0.36,-0.08,-0.22, 0.08,-0.22,0.16,-0.36
]);

const vertexCount = vertices.length / 2;
vertexCountElement.textContent = vertexCount;

const vertexShaderSource = `
attribute vec2 a_position;
void main(){ gl_Position = vec4(a_position,0.0,1.0); }
`;

const fragmentShaderSource = `
precision mediump float;
void main(){ gl_FragColor = vec4(0.10,0.22,0.38,1.0); }
`;

function fail(message){
  console.error(message);
  statusElement.textContent = message;
}

function createShader(gl,type,source){
  const shader=gl.createShader(type);
  if(!shader) throw new Error("Shader konnte nicht erstellt werden.");
  gl.shaderSource(shader,source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
    const log=gl.getShaderInfoLog(shader)||"Unbekannter Shader-Fehler.";
    gl.deleteShader(shader);
    throw new Error(log);
  }
  return shader;
}

function createProgram(gl){
  const vs=createShader(gl,gl.VERTEX_SHADER,vertexShaderSource);
  const fs=createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource);
  const program=gl.createProgram();
  if(!program) throw new Error("WebGL-Programm konnte nicht erstellt werden.");
  gl.attachShader(program,vs);
  gl.attachShader(program,fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
    const log=gl.getProgramInfoLog(program)||"Unbekannter Linker-Fehler.";
    gl.deleteProgram(program);
    throw new Error(log);
  }
  return program;
}

function resize(gl){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const width=Math.floor(canvas.clientWidth*dpr);
  const height=Math.floor(canvas.clientWidth*(650/900)*dpr);
  if(canvas.width!==width||canvas.height!==height){
    canvas.width=width; canvas.height=height;
  }
  gl.viewport(0,0,canvas.width,canvas.height);
}

function init(){
  if(!window.WebGLRenderingContext){
    fail("WebGL wird von diesem Browser nicht unterstützt.");
    return;
  }

  const gl=canvas.getContext("webgl",{antialias:true,alpha:false});
  if(!gl){
    fail("WebGL-Kontext konnte nicht erstellt werden.");
    return;
  }

  try{
    const program=createProgram(gl);
    const buffer=gl.createBuffer();
    if(!buffer) throw new Error("Vertex-Buffer konnte nicht erstellt werden.");

    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    const position=gl.getAttribLocation(program,"a_position");
    if(position<0) throw new Error("Attribut a_position wurde nicht gefunden.");

    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);

    function draw(){
      resize(gl);
      gl.clearColor(0.985,0.99,0.995,1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // count = Anzahl der 2D-Vertices, nicht Anzahl der Array-Werte.
      gl.drawArrays(gl.LINES,0,vertexCount);
    }

    window.addEventListener("resize",draw);
    draw();

    statusElement.textContent="WebGL aktiv · Darstellung erfolgreich";
    console.info("WebGL erfolgreich initialisiert.");
    console.info("Vertex-Anzahl:",vertexCount);
    console.info("drawArrays count:",vertexCount);
  }catch(error){
    fail("WebGL-Fehler: "+error.message);
  }
}

init();
