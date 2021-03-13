import { Transform } from 'src/math';
import { Painter, Pen, Brush } from 'src/painter';

export class MockPainter implements Painter {

	public pen = new Pen();

	public brush = new Brush();

	public transform = new Transform();

	public strokeLine = jest.fn();

	public strokePath = jest.fn();

	public strokeRect = jest.fn();

	public strokeRoundedRect = jest.fn();

	public strokePolygon = jest.fn();

	public fillPath = jest.fn();

	public fillRect = jest.fn();

	public fillRoundedRect = jest.fn();

	public fillPolygon = jest.fn();

	public save = jest.fn();

	public restore = jest.fn();

}
