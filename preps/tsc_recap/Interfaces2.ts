interface IServer {
	startServer(): void;
	stopServer(): void;
}

class Server implements IServer {
	public address: string;
	public port: number;

	constructor(address: string, port: number) {
		this.address = address;
		this.port = port;
	}

	async startServer() {
		const data = await this.getData();
		console.log(`Starting server at: ${this.address}:${this.port}`);
	}

	stopServer(): void {};
	async getData(): Promise<string> {
		return 'loaded';
	}
}


const myServer: IServer = new Server("www.kanykei.com", 8080);
myServer.startServer();
myServer.stopServer();