import { aspectRatio } from '../utils/math';

export default function KeyFeatures({ data }) {
	if (!data) return;

	const screenWidth = data['screenWidth'];
	const screenHeight = data['screenHeight'];
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
