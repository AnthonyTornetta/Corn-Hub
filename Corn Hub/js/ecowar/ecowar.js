"use strict"

class Dude
{
	constructor(name, age, id)
	{
		this.name = name;
		this.age = age;
		this.id = id;
	}
	
	register()
	{
		console.log('[' + this.id + '] ' + this.name + ' is now registered');
	}
}

let bob = new User('bob', 23, 0);
bob.register();