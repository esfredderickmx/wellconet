import { useMemo } from "react";

export function useQuery<T extends string | number | boolean>(param: string): T | null;
export function useQuery<T extends string | number | boolean>(param: string, defaultValue: T): T;
export function useQuery<T extends string | number | boolean>(param: string, defaultValue?: T): T | null {
	const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);

	const value = searchParams.get(param);

	if (value === null) {
		return defaultValue !== undefined ? defaultValue : null;
	}

	if (typeof defaultValue === "number") {
		return (isNaN(Number(value)) ? defaultValue : Number(value)) as T;
	}

	if (typeof defaultValue === "boolean") {
		return (value === "true") as T;
	}

	return value as T;
}
