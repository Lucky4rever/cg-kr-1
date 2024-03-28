import fragmentShader from '@/shaders/fragment.shader.glsl';
import vertexShader from '@/shaders/vertex.shader.glsl';

const ShaderLink = {
  'fragment': fragmentShader,
  'vertex': vertexShader,
} as const;

const ShaderValue = {
  'fragment': WebGLRenderingContext.FRAGMENT_SHADER,
  'vertex': WebGLRenderingContext.VERTEX_SHADER,
} as const;

/**
 * Represents the type of a shader.
 */
type ShaderType = keyof typeof ShaderLink;


/**
 * Retrieves the shader code based on the specified shader type.
 * @param type - The type of the shader.
 * @returns The shader code.
 */
function getShader(type: ShaderType) {
  const text = ShaderLink[type];
  return text;
}

/**
 * Retrieves the value associated with the specified shader type.
 * @param type The type of the shader.
 * @returns The value associated with the shader type.
 */
function getShaderValue(type: ShaderType) {
  const value = ShaderValue[type];
  return value;
}

export { ShaderType, getShader, getShaderValue };
