export default function DataList({ data: propsData }) {
	if (!propsData) return;

	return (
		<ul>
			{Object.keys(propsData).map((key) => {
				const value = propsData[key];
				if (Array.isArray(value)) return;

				return (
					<li key={key}>
						{key}: {String(value)}
					</li>
				);
			})}
		</ul>
	);
}
