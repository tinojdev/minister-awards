import { useGetCategoriesQuery } from "@/state/api";

export default function CategoriesScene() {
	const { data, error, isLoading } = useGetCategoriesQuery();
	return (
		<div>
			<h1 style={{ color: "black" }}>Categories</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<ul>
					{data.map((category) => (
						<li key={category.id}>{category.name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
