// 2. TypeScript Type Definition

type NewPost = Omit<post, "id" | "const"> & { id?: number; content: string | null; };
