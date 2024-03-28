import convertRGBA from "@/utils/convert-rgba";
import CustomMath from "@/utils/custom-math";
import { ShaderType, getShaderValue, getShader } from "@/utils/get-shader";

interface WebGLRendererState {
  shaders: {
    [key in ShaderType]: WebGLShader | null;
  }
  program: WebGLProgram | null;
  scene: (() => void) | null;
}

class WebGLRenderingTools {
  private gl: WebGLRenderingContext | null = null;

  private state: WebGLRendererState = {
    shaders: {
      vertex: null,
      fragment: null,
    },
    program: null,
    scene: null,
  }

  constructor(private canvasId: string) {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    this.gl = canvas.getContext("webgl");
    CustomMath.setCustomLenghts(canvas.width, canvas.height);
  }

  public getGl = () => this.gl;
  public getProgram = () => this.state.program;

  public setBuffer(buffer: WebGLBuffer) {
    if (this.gl) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    }
  }

  public setViewport() {
    if (this.gl) {
      const canvas = this.gl.canvas as HTMLCanvasElement;
      this.gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }

  public clearCanvas(colors: { red: number; green: number; blue: number; alpha: number }) {
    if (this.gl) {
      this.gl.clearColor(...convertRGBA(colors));
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  }

  public createAndCompileShader(shader: string, shaderType: ShaderType) {
    if (this.gl) {
      this.state.shaders[shaderType] = this.gl.createShader(getShaderValue(shaderType));

      if (this.state.shaders[shaderType]) {
        this.gl.shaderSource(this.state.shaders[shaderType]!!, shader);
        this.gl.compileShader(this.state.shaders[shaderType]!!);
      }
    }
  }

  public createAndLinkProgram() {
    if (this.gl) {
      this.state.program = this.gl.createProgram();

      if (this.state.program) {
        this.state.shaders.vertex && this.gl.attachShader(this.state.program, this.state.shaders.vertex);
        this.state.shaders.fragment && this.gl.attachShader(this.state.program, this.state.shaders.fragment);
        this.gl.linkProgram(this.state.program);
        this.gl.useProgram(this.state.program);

        return this.state.program;
      }
    }
    return null;
  }

  public createBufferWithData(data: number[], bufferType: number) {
    if (this.gl) {
      const buffer = this.gl.createBuffer();
      
      if (buffer) {
        this.gl.bindBuffer(bufferType, buffer);
        this.gl.bufferData(bufferType, new Float32Array(data), this.gl.STATIC_DRAW);

        return buffer;
      }
    }
    return null;
  }

  public drawLocation(buffer: WebGLBuffer | null, attributeLocation: number, vertexCount: number): void {
    if (this.gl && buffer) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      this.gl.enableVertexAttribArray(attributeLocation);
      this.gl.vertexAttribPointer(attributeLocation, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, vertexCount);
    }
  }

  public drawFanLocation(buffer: WebGLBuffer | null, attributeLocation: number, vertexCount: number): void {
    if (this.gl && buffer) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      this.gl.enableVertexAttribArray(attributeLocation);
      this.gl.vertexAttribPointer(attributeLocation, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, vertexCount);
    }
  }

  public getAttribLocation(name: string, program?: WebGLProgram) {
    if (this.gl && (program || this.state.program)) {
      return this.gl.getAttribLocation(program ?? this.state.program!!, name);
    }

    return null;
  }

  public attributeSetFloats(rsize: number, arr: number[]) {
    if (this.gl && this.state.program) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(arr), this.gl.STATIC_DRAW);

      const attr = this.gl.getAttribLocation(this.state.program, "draw_position");
      this.gl.enableVertexAttribArray(attr);
      this.gl.vertexAttribPointer(attr, rsize, this.gl.FLOAT, false, 0, 0);
    }
  }
}

export default WebGLRenderingTools;
