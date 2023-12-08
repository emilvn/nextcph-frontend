interface ICategory {
	category: {
		id: string;
		name: string;
		createdAt: string;
		updatedAt: string;
	}
}

interface ICategoryNames {
	name: string;
}

export type {ICategory, ICategoryNames};