type RequestAdapter = {
    get<RT>(url: string, options?: unknown): Promise<Response & { data: RT }>,
    post<DT, RT>(url: string, data: DT, options?: unknown): Promise<Response & { data: RT }>,
}