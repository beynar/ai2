export const gettersAndSetters = <T extends Record<string, any>>(obj: T) => {
	const gettersAndSetters = Object.entries(obj).reduce((acc, [key, value]) => {
		Object.defineProperty(acc, key, {
			get: () => value,
			set: (newValue) => {
				value = newValue;
			},
			enumerable: true
		});
		return acc;
	}, {} as T);

	// Assign
};

export const getters = <T extends Record<string, any>>(obj: T) => {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		Object.defineProperty(acc, key, {
			get: () => value,
			enumerable: true
		});
		return acc;
	}, {} as T);
};

class BindableStateClass<P extends Record<string, any>> {
	private getBindableProps(props: P) {
		return Object.entries(Object.getOwnPropertyDescriptors(props))
			.filter(([_key, value]) => value.get && value.set)
			.map(([key]) => key);
	}

	private getDynamicProps(props: P) {
		return Object.entries(Object.getOwnPropertyDescriptors(props))
			.filter(([_key, value]) => value.get && !value.set)
			.map(([key]) => key);
	}

	private getStaticProps(props: P) {
		return Object.entries(Object.getOwnPropertyDescriptors(props))
			.filter(([key, value]) => !value.get && !value.set)
			.map(([key]) => key);
	}

	constructor(props: P) {
		// Define the bindable props of the class with a getter and a setter
		this.getBindableProps(props).forEach((key) => {
			Object.defineProperty(this, key, {
				get: () => props[key as keyof P],
				set: (newValue) => {
					props[key as keyof P] = newValue;
				}
			});
		});
		this.getDynamicProps(props).forEach((key) => {
			Object.defineProperty(this, key, {
				get: () => props[key as keyof P]
			});
		});

		// Only assign the static props to the class
		this.getStaticProps(props).forEach((key) => {
			Object.assign(this, {
				[key]: props[key as keyof P]
			});
		});
	}
}

// Type helper to create a properly typed bindable state class
type TypedBindableStateClass<P extends Record<string, any>> = new (
	props: P
) => BindableStateClass<P> & P;

export const createBindableStateClass = <P extends Record<string, any>>() => {
	return class extends BindableStateClass<P> {
		constructor(props: P) {
			super(props);
		}
	} as TypedBindableStateClass<P>;
};

// Goal:
// The goal of this class is to allow state encapsulation inside a class while still being able the bind the state of this class to the props of a component.
// Such as :
// When props change, the state of the class should be updated.
// When the state of the class changes, the bindable props of the component should be updated.
// This make the bindable prop the unique source of truth for the state of the class.
// The class can be extended to add more methods and properties that will update the state of the class like any other class.

// Functionalities:
// - Get the bindable props of the class (props that have a getter and a setter)
// - Get the dynamic props of the class (props that have a getter and no setter) that should trigger effect on change
// - Get the static props of the class (props that have a value)
// - Define the dynamic props of the class (props that have a getter and a setter)
// - Define the static props of the class (every other props)

// Usage

// class Test extends createBindableStateClass<{ name: string; age: number }>() {
// 	constructor(props: { name: string; age: number }) {
// 		super(props);
// 	}
// }

// let {
// 	name = $bindable(),
// 	age = $bindable()
// }: {
// 	name: string;
// 	age: number;
// } = $props();

// const test = new Test({
// 	get name() {
// 		return name;
// 	},
// 	set name(value: string) {
// 		name = value;
// 	},
// 	get age() {
// 		return age;
// 	},
// 	set age(value: number) {
// 		age = value;
// 	}
// });
