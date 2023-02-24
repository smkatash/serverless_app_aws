import { isVoidExpression } from "typescript"

interface Person {
	firstName: string,
	lastName: string,
	job?: job
	isVisitor?: boolean
}

type job = 'Engineer' | 'Developer' | 'Architect'

function generateEmail (input: Person, force?: boolean): string | undefined {
	if (input.isVisitor && !force) {
		return undefined;
	} else {
		return `${input.firstName}.${input.lastName}@email.com`
	}
}

const A = {
	firstName: 'John',
	lastName: 'Travolta',
	job: 'Engineer' as job
}

var B = {
	firstName: 'Sara',
	lastName: 'Garden',
	isVisitor: true,
}

console.log(A)
console.log(generateEmail(A))
console.log(B)
console.log(generateEmail(B, true))

/* Dynamic type check */

function isPerson(potentialPerson: any): boolean {
	if ('firstName' in potentialPerson && 'lastName' in potentialPerson) 
		return true;
	else
		return false;
}


var C = {
	fullName: 'Hannah Labram',
	isVisitor: false,
	job: 'Developer' as job
}

function printEmailifPerson(potentialPerson: any): string | undefined {
	if (isPerson(potentialPerson))
		return `${potentialPerson.firstName}.${potentialPerson.lastName}@email.com`
	else
		return undefined
}

console.log(printEmailifPerson(C))
console.log(printEmailifPerson(A))