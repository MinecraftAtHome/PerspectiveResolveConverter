import { useEffect, useState } from 'react';
import ResolveOutput from './components/ResolveOutput';
import KeyFeatures from './components/KeyFeatures';
import DataList from './components/DataList';
import { aspectRatio } from './utils/math';

export default function App() {
	const [input, setInput] = useState('');
	const [jsonInput, setJsonInput] = useState(null);
	const [wantedScreenWidth, setWantedScreenWidth] = useState(1920);
	const [wantedScreenHeight, setWantedScreenHeight] = useState(1080);
	const [wantedAspectRatio, setWantedAspectRatio] = useState('1:1');
	const [startFrame, setStartFrame] = useState(0);
	const [referenceFrame, setReferenceFrame] = useState(0);
	const [endFrame, setEndFrame] = useState(1);

	function convertInput(event) {
		const inputText = event.target.value;
		setInput(inputText);
		try {
			setJsonInput(JSON.parse(inputText));
		} catch (e) {
			setJsonInput(null);
		}
	}

	function editScreenWidth(event) {
		setWantedScreenWidth(event.target.value.slice(0, 5));
	}

	function editScreenHeight(event) {
		setWantedScreenHeight(event.target.value.slice(0, 5));
	}

	function setWantedScreenSize(width, height) {
		setWantedScreenWidth(width);
		setWantedScreenHeight(height);
	}

	function editStartFrame(event) {
		if (event.target.value < 0) setStartFrame(0);
		else setStartFrame(event.target.value.slice(0, 5));
	}

	function editReferenceFrame(event) {
		if (event.target.value < 0) setReferenceFrame(0);
		else setReferenceFrame(event.target.value.slice(0, 5));
	}

	function editEndFrame(event) {
		if (event.target.value < 0) setEndFrame(0);
		setEndFrame(event.target.value.slice(0, 5));
	}

	useEffect(() => {
		if (!jsonInput) return;
		setReferenceFrame(jsonInput.frames[jsonInput.mainFrameIndex].time);
	}, [jsonInput]);

	useEffect(() => {
		const ratio = aspectRatio(wantedScreenWidth, wantedScreenHeight);
		setWantedAspectRatio(`${ratio[0]}:${ratio[1]}`);
	}, [wantedScreenWidth, wantedScreenHeight]);

	return (
		<>
			<div className='input'>
				<label>
					Input data
					<textarea defaultValue={input} onChange={convertInput} cols={50} rows={10} />
				</label>
				<label>
					Wanted Screen Resolution
					<span>
						<input
							id='wantedScreenWidth'
							type='number'
							maxLength={5}
							min={0}
							max={99999}
							value={wantedScreenWidth}
							onChange={editScreenWidth}
						></input>
						*
						<input
							id='wantedScreenHeight'
							type='number'
							maxLength={5}
							min={0}
							max={99999}
							value={wantedScreenHeight}
							onChange={editScreenHeight}
						></input>
						{wantedAspectRatio}
					</span>
				</label>
				<button onClick={() => setWantedScreenSize(1920, 1080)}>1080p</button>
				<button onClick={() => setWantedScreenSize(2560, 1440)}>1440p</button>
				<button onClick={() => setWantedScreenSize(3840, 2160)}>4K</button>
				<label>
					Start Frame
					<input
						id='startFrame'
						type='number'
						maxLength={5}
						min={0}
						max={99999}
						value={startFrame}
						onChange={editStartFrame}
					></input>
				</label>
				<label>
					Reference Frame
					<input
						id='startFrame'
						type='number'
						maxLength={5}
						min={0}
						max={99999}
						value={referenceFrame}
						onChange={editReferenceFrame}
					></input>
				</label>
				<label>
					End Frame
					<input
						id='endFrame'
						type='number'
						maxLength={5}
						min={0}
						max={99999}
						value={endFrame}
						onChange={editEndFrame}
					></input>
				</label>
				<ResolveOutput
					data={jsonInput}
					frame={startFrame}
					frames={startFrame - referenceFrame}
					newScreenSize={[wantedScreenWidth, wantedScreenHeight]}
				/>
				<ResolveOutput
					data={jsonInput}
					frame={endFrame}
					frames={endFrame - startFrame}
					newScreenSize={[wantedScreenWidth, wantedScreenHeight]}
				/>
			</div>
			<div className='dataOutput'>
				<DataList data={jsonInput} />
				<KeyFeatures data={jsonInput} />
			</div>
		</>
	);
}
