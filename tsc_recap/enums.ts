enum AuthError {
	WRONG_PERMISSION,
	SERVER_FAIL,
	SESSION_EXPIRED,
}

console.log(AuthError[AuthError.SERVER_FAIL])

enum AuthError2 {
	WRONG_PERMISSION = 'wrong permission',
	SERVER_FAIL = 'server failed',
	SESSION_EXPIRED = 'session expired',
}

function handleError(error: AuthError2) {
	switch(error) {
		case AuthError2.SERVER_FAIL:
			console.log(AuthError2.SERVER_FAIL);
			break;
		case AuthError2.SESSION_EXPIRED:
			console.log(AuthError2.SESSION_EXPIRED);
			break;
		case AuthError2.WRONG_PERMISSION:
			console.log(AuthError2.WRONG_PERMISSION);
			break;
	}
}

handleError(AuthError2.SERVER_FAIL);