abstract class BaseServer {
	protected address: string;
	protected port: number;

	constructor(address: string, port: number) {
		this.address = address;
		this.port = port;
	}

	startServer() {
		console.log(`Starting server at: ${this.address}:${this.port}`);
	}

	abstract stopServer(): void;
}

class DBServer extends BaseServer {
	constructor(address: string, port: number) {
		super(address, port);
		console.log("Calling DBServer...");
	}
	stopServer(): void {
		console.log(`Stopping server at: ${this.address}:${this.port}`);
	}
}

const myServer = new DBServer("www.kanykei.com", 8080);
myServer.startServer();
myServer.stopServer();