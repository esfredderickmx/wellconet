import React, { useEffect, useRef } from "react";

export function useSkipFirstRender(effect: React.EffectCallback, deps: React.DependencyList) {
	const isFirstRender = useRef<boolean>(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			
			return;
		}

		effect();
	}, deps);
}
