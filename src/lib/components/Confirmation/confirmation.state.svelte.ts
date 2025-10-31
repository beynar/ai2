import type { ButtonProps } from '../Button/button.js';
import type { MaybePromise } from '../Form/Form/form.js';

type Callback = (() => MaybePromise<any>) | undefined;
export type ConfirmationDetail<CB extends Callback = Callback> = {
	id: string;
	title: string;
	description: string;
	confirm:
		| string
		| ({
				text: string;
		  } & ButtonProps);
	cancel:
		| string
		| ({
				text: string;
		  } & ButtonProps);
	onConfirm?: CB;
};
type ConfirmationAction<CB extends Callback = Callback> = {
	id: string;
	continued: boolean;
	result?: CB extends () => MaybePromise<infer R> ? R : void;
};
interface CustomEventMap {
	confirmation: CustomEvent<ConfirmationDetail>;
	confirmation_received: CustomEvent<ConfirmationAction>;
}
declare global {
	interface Document {
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
		removeEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
	}
}

export type ConfirmationState = ConfirmationDetail & {
	isOpen: boolean;
	loading: boolean;
};

export const confirmation = <CB extends Callback>(options: Omit<ConfirmationDetail<CB>, 'id'>) => {
	return new Promise<
		| {
				confirmed: true;
				result: CB extends () => MaybePromise<infer R> ? R : void;
		  }
		| {
				confirmed: false;
				result: undefined;
		  }
	>((res) => {
		const confirmationOptions = Object.assign(options, {
			id: Math.random().toString(36).substring(7)
		});
		document.dispatchEvent(new CustomEvent('confirmation', { detail: confirmationOptions }));
		const onConfirmationActioned = (event: CustomEvent<ConfirmationAction>) => {
			if (event.detail.id === confirmationOptions.id) {
				res({
					confirmed: event.detail.continued,
					result: event.detail.continued ? event.detail.result : undefined
				});
			}
			document.removeEventListener('confirmation_received', onConfirmationActioned);
		};
		document.addEventListener('confirmation_received', onConfirmationActioned);
	});
};
