export type Service<T, K> = {
	call(params: T): Promise<K>;
};
