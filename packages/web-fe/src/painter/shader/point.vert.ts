
export const POINT_VERT = `
attribute vec2 a_position;

uniform mat3 u_projectMatrix;

void main() {
	vec3 pos = u_projectMatrix * vec3(a_position, 1.0);
	gl_Position = vec4(pos, 1.0);
	gl_PointSize = 10.0;
}

`
