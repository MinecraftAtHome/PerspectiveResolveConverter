export default function ResolveOutput({ data, frame, frames, newScreenSize }) {
	if (!data) return;

	let newData = { imageScale: data.imageScale, anchor: [data.frameCenterDx, data.frameCenterDy] };

	if (frames) {
		const startHeight = data.screenHeight / data.imageScale;
		const pixelChanges = frames * data.zoomSpeed;
		const finalHeight = startHeight - pixelChanges;
		newData.imageScale = data.screenHeight / finalHeight;

		newData.anchor[0] = data.frameCenterDx + data.zoomCenterSpeedX * frames;
		newData.anchor[1] = data.frameCenterDy + data.zoomCenterSpeedY * frames;
	}

	return (
		<>
			<table>
				<caption>Frame: {frame}</caption>
				<thead>
					<tr>
						<th>Operation</th>
						<th>X</th>
						<th>Y</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Scale</td>
						<td>{newData.imageScale.toFixed(3)}</td>
						<td>{newData.imageScale.toFixed(3)}</td>
					</tr>
					<tr>
						<td>Anchor</td>
						<td>{newData.anchor[0].toFixed(3)}</td>
						<td>{newData.anchor[1].toFixed(3)}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}
