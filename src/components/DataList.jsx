export default function DataList({ data }) {
	if (!data) return;

	return (
		<ul>
			{Object.keys(data).map((key) => {
				const value = data[key];
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
