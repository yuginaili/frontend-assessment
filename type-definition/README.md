# TypeScript Type Definition

This project contains a TypeScript type definition example that demonstrates how to use the `Omit` utility type to create a new type based on an existing type, with some modifications.

## Type Definition

The `NewPost` type is defined as follows:

```typescript
type NewPost = Omit<post, "id" | "const"> & { id?: number; content: string | null; };
