export type PackageMeta = {
    type: string,
    name: string,
    tags: Record<string, string>,
    versions: {
        version: string,
        links: Record<string, string>,
    }[],
    links: Record<string, string>,
}