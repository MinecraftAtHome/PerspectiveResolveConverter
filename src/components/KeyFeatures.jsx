import { aspectRatio } from '../utils/math';

export default function KeyFeatures({ data: propsData }) {
	if (!propsData) return;

	const screenWidth = propsData['screenWidth'];
	const screenHeight = propsData['screenHeight'];
	const screenAspectRatio = aspectRatio(screenWidth, screenHeight);

	return (
		<div>
			<p>
				Screensize: {screenWidth}px * {screenHeight}px
			</p>
			<p>
				Aspect Ratio: {screenAspectRatio[0]}:{screenAspectRatio[1]}
			</p>
		</div>
	);
}
