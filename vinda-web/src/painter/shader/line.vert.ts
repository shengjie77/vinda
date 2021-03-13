
export const LINE_VS = `

attribute vec2 a_position;

uniform mat3 u_projectMatrix;

varying vec2 v_position;

void main() {
	vec3 pos = u_projectMatrix * vec3(a_position, 1.0);
	gl_Position = vec4(pos, 1.0);

	v_position = a_position;
}

`
