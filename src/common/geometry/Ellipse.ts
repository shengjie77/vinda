
export class Ellipse {

	public static from(param: EllipseParam) {
		const ellipse = new Ellipse();
		ellipse.x = param.x;
		ellipse.y = param.y;
		ellipse.width = param.width;
		ellipse.height = param.height;
	}

	public x: number = 0;

	public y: number = 0;

	public width: number = 0;

	public height: number = 0;

}

interface EllipseParam {
	x: number;
	y: number;
	width: number;
	height: number;
}
