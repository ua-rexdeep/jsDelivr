export type PackageDataT = {
    name: string,
    scope: string,
    version: string,
    description: string,
    keywords?: string[],
    date: string,
    links: Record<string, string>,
    author: {
        name: string,
    },
    publisher: {
        username: string,
        email: string,
    },
    maintainers: {
        username: string,
        email: string,
    }[],
}

export type PackageT = {
    package: PackageDataT,
    flags: Record<string, number> & {
        insecure: number,
    },
    score: {
        final: number,
        details: {
            quality: number,
            popularity: number,
            maintenance: number,
        }
    },
    searchScope: number
}

export type PackageSearchResponse = {
    objects: PackageT[],
    total: number,
    time: string,
}