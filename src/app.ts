import MatrixAnimation from "./tools/webgl-animation.renderer";
import WebGLRenderer from "./tools/webgl-renderer.renderer";
import CustomMath from "./utils/custom-math";
import { getShader } from "./utils/get-shader";
import normaliseCoordinates from "./utils/normalise-coordinates";
import nullCheck from "./utils/null-check";

function App() {
  const renderer = new WebGLRenderer("glcanvas");

  renderer.setScene('static', () => {
    renderer.tools.setViewport();
    renderer.tools.clearCanvas({ red: 255, green: 255, blue: 255, alpha: 100 });

    // shaders
    renderer.tools.createAndCompileShader(getShader("vertex"), "vertex");
    renderer.tools.createAndCompileShader(getShader("fragment"), "fragment");

    // program
    const shaderProgram = renderer.tools.createAndLinkProgram();

    nullCheck(shaderProgram, "Shader program isn't created or linked correctly");
  });



  renderer.setScene('oval 1', () => renderer.animate((time) => {
    const radiusX = 1.0;
    const radiusY = 0.75;
    const segments = 64;
    const hiddenSegmentsStart = 29;
    const hiddenSegmentsEnd = 43;

    const isSegmentHidden = (i: number) => i <= hiddenSegmentsEnd && i >= hiddenSegmentsStart;

    // oval buffers
    let ovalCoordinates = [];
    let ovalColors = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = radiusX * Math.cos(theta);
      const y = radiusY * Math.sin(theta);
      ovalCoordinates.push(...normaliseCoordinates({ x, y, z: 0.0 }));
      if (isSegmentHidden(i)) {
        ovalColors.push(1.0, 1.0, 1.0, 1.0);
      } else {
        ovalColors.push(0.0, 0.0, 0.0, 0.0);
      }
    }

    //animation
    const matrixRotation = new MatrixAnimation(ovalCoordinates);
    ovalCoordinates = matrixRotation.rotate(CustomMath.radians(time));
    ovalCoordinates = matrixRotation.hover(1, CustomMath.radians(time));

    const ovalPositionBuffer = renderer.tools.createBufferWithData(ovalCoordinates, WebGLRenderingContext.ARRAY_BUFFER);
    const ovalColorBuffer = renderer.tools.createBufferWithData(ovalColors, WebGLRenderingContext.ARRAY_BUFFER);

    nullCheck(ovalPositionBuffer, "Position buffer for oval isn't created correctly");
    nullCheck(ovalColorBuffer, "Color buffer for oval isn't created correctly");
    
    // program
    const shaderProgram = renderer.tools.createAndLinkProgram();

    nullCheck(shaderProgram, "Shader program isn't created or linked correctly");

    // locations
    const positionAttributeLocation = renderer.tools.getAttribLocation("a_position");
    const colorAttributeLocation = renderer.tools.getAttribLocation("a_color");

    nullCheck(positionAttributeLocation, "Position location is incorrect");
    nullCheck(colorAttributeLocation, "Color location is incorrect");

    // rendering
    renderer.tools.drawLocation(ovalPositionBuffer, positionAttributeLocation!, segments + 1);
    renderer.tools.drawLocation(ovalColorBuffer, colorAttributeLocation!, segments + 1);
}));

  
  renderer.startRendering();
}

export default App;
