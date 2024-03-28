import nullCheck from "@/utils/null-check";
import WebGLRenderingTools from "./webgl-rendering-tools.renderer";

type SceneStore = Record<string, ((() => void) | null)>;

/**
 * Represents a WebGL renderer that renders a scene using WebGLRenderingContext.
 */
class WebGLRenderer {
  public tools: WebGLRenderingTools;


  // private scene: (() => void) | null = null;
  private sceneStore: SceneStore = { 'static': null };
  private time: number = 1;

  constructor(canvasId: string) {
    this.tools = new WebGLRenderingTools(canvasId);
  }

  /**
   * Validates the WebGL rendering context and the scene before rendering.
   * @throws {Error} If the WebGLRenderingContext is not initialized or the browser does not support WebGL.
   * @throws {Error} If the scene is not set.
   */
  private validateGl() {
    nullCheck(this.tools.getGl(), 'WebGLRenderingContext is not initialized or ypur browser does not support WebGL');
  }

  /**
   * Sets the scene for the WebGL renderer.
   * @param {() => void} scene - The scene function to be set.
   */
  public setScene(type: string, scene: () => void) {
    // this.scene = scene;
    this.sceneStore[type] = scene;
  }

  public animate(scene: (time: number) => void) {
    scene(this.time);
  }

  /**
   * Starts the rendering process.
   */
  public startRendering() {
    this.render();
  }

  private render() {
    this.validateGl();

    for (const sceneType in this.sceneStore) {
      if (this.sceneStore[sceneType] === null) continue;

      this.sceneStore[sceneType]!();
    }

    this.time++;

    requestAnimationFrame(this.render.bind(this));
  }
}

export default WebGLRenderer;
