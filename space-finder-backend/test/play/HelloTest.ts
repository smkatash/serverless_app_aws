import { APIGatewayProxyEvent } from 'aws-lambda';
import { APIGateway } from 'aws-sdk';
import { handler} from '../../services/SpacesTable/Create';

const event: APIGatewayProxyEvent = {
	body:{
		name: 'Best Location',
		location: 'Tokyo'
	}
} as any;

const result = handler(event, {} as any ).then((apiResult) => {
	const items = JSON.parse(apiResult.body);
	console.log(123);
});