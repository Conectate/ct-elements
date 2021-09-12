interface RoverOptions {
	targets: NodeListOf<HTMLElement>;
	active: HTMLElement;
	index: number;
}
const state = new Map<HTMLElement | string, HTMLElement | RoverOptions>();

export const rovingIndex = ({ element: rover, target: selector }: { element: HTMLElement; target: string }) => {
	// this api allows empty or a query string
	const target_query = selector || ":scope *";
	const targets = rover.querySelectorAll<HTMLElement>(target_query);
	const startingPoint = targets[0];

	// take container out of the focus flow
	rover.tabIndex = -1;
	// and all the children
	targets.forEach((a) => (a.tabIndex = -1));
	// except the first target, that accepts focus
	startingPoint.tabIndex = 0;

	// with the roving container as the key
	// save some state and handy references
	state.set(rover, {
		targets,
		active: startingPoint,
		index: 0
	});

	// when container or children get focus
	const onFocusin = () => {
		if (state.get("last_rover") == rover) return;

		activate(rover, (state.get(rover) as RoverOptions).active);
		state.set("last_rover", rover);
	};
	rover.addEventListener("focusin", onFocusin);

	// watch for arrow keys
	const onKeydown = (e: KeyboardEvent) => {
		switch (e.code) {
			case "ArrowRight":
			case "ArrowDown":
				e.preventDefault();
				focusNextItem(rover);
				break;
			case "ArrowLeft":
			case "ArrowUp":
				e.preventDefault();
				focusPreviousItem(rover);
				break;
		}
	};
	rover.addEventListener("keydown", onKeydown);

	const cleanup = () => {
		rover.removeEventListener("focusin", onFocusin);
		rover.removeEventListener("keydown", onKeydown);
		rover.removeEventListener("DOMNodeRemoved", cleanup);

		state.delete(rover);
		targets.forEach((a) => (a.tabIndex = -1));
	};

	rover.addEventListener("DOMNodeRemovedFromDocument", cleanup);
};

const focusNextItem = (rover: HTMLElement) => {
	const rx = state.get(rover) as RoverOptions;

	// increment state index
	rx.index += 1;

	// clamp navigation to target bounds
	if (rx.index > rx.targets.length - 1) rx.index = rx.targets.length - 1;

	// use rover index state to find next
	let next = rx.targets[rx.index];

	// found something, activate it
	next && activate(rover, next);
};

const focusPreviousItem = (rover: HTMLElement) => {
	const rx = state.get(rover) as RoverOptions;

	// decrement from the state index
	rx.index -= 1;

	// clamp to 0 and above only
	if (rx.index < 1) rx.index = 0;

	// use rover index state to find next
	let prev = rx.targets[rx.index];

	// found something, activate it
	prev && activate(rover, prev);
};

const activate = (rover: HTMLElement, item: HTMLElement) => {
	const rx = state.get(rover) as RoverOptions;

	// remove old tab index item
	rx.active.tabIndex = -1;

	// set new active item and focus it
	rx.active = item;
	rx.active.tabIndex = 0;
	rx.active.focus();
};
