attribute vec4 a_position;
attribute vec3 a_color;
varying highp vec3 v_color;

void main() {
  gl_Position = a_position;
  v_color = a_color;
}
