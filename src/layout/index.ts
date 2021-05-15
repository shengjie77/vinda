
interface Layout {}

interface LayoutItem {
	setSizePolicy(hor: SizePolicy, ver: SizePolicy): void;
	horizontalSizePolicy: SizePolicy;
	verticalSizePolicy: SizePolicy;
}

enum SizePolicy {
	Fixed,
	Preferred,
	Stretch,
}
