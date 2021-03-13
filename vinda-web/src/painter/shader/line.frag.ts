
export const LINE_FS = `

precision mediump float;

uniform int u_cap;
uniform vec2 u_capCenter;
uniform float u_width;

varying vec2 v_position;

const int NOT_CAP = -1;
const int BUTT_CAP = 0;
const int SQUARE_CAP = 1;
const int ROUND = 2;

void main() {
	vec4 color = vec4(0, 0, 0, 1);
	if (u_cap == BUTT_CAP) {
		color = vec4(0, 0, 0, 0);
	} else if (u_cap == ROUND) {
		if (distance(v_position, u_capCenter) < (u_width / 2.0)) {
			color = vec4(0, 0, 0, 1);
		} else {
			color = vec4(0, 0, 0, 0);
		}
	}

	gl_FragColor = color;
}

`
