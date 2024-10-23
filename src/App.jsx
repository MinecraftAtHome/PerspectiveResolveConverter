import { useEffect, useState } from 'react';
import KeyFeatures from './components/KeyFeatures';
import DataList from './components/dataList';
import { aspectRatio } from './utils/math';

export default function App() {
	const [input, setInput] = useState('');
	const [jsonInput, setJsonInput] = useState(null);
	const [wantedScreenWidth, setWantedScreenWidth] = useState(1920);
	const [wantedScreenHeight, setWantedScreenHeight] = useState(1080);
	const [wantedAspectRatio, setWantedAspectRatio] = useState('1:1');

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
							value={wantedScreenWidth}
							onChange={editScreenWidth}
						></input>
						*
						<input
							id='wantedScreenHeight'
							type='number'
							maxLength={5}
							value={wantedScreenHeight}
							onChange={editScreenHeight}
						></input>
						{wantedAspectRatio}
					</span>
				</label>
				<button onClick={() => setWantedScreenSize(1920, 1080)}>1080p</button>
				<button onClick={() => setWantedScreenSize(2560, 1440)}>1440p</button>
				<button onClick={() => setWantedScreenSize(3840, 2160)}>4K</button>
			</div>
			<div className='dataOutput'>
				<DataList data={jsonInput} />
				<KeyFeatures data={jsonInput} />
			</div>
		</>
	);
}
