interface Person<T> {
	name: string,
	age: number,
	special: T,
}

const John: Person<string> = {
	name: 'John',
	age: 20,
	special: 'VIP',
}

const Sarah: Person<number> = {
	name: 'Sarah',
	age: 20,
	special: 25,
}

class Observable <T extends Person<string>> {
	subscribe(arg: T) {
		console.log(`Subscribed to ${arg.name}.`)
	}
}

class Observable2 <T extends Person<number>> {
	followers(arg: T) {
		console.log(`${arg.name} has ${arg.special} followers.`)
	}
}

new Observable<typeof John>().subscribe(John);
new Observable2<typeof Sarah>().followers(Sarah)