import { useAuth } from '../../auth-provider/auth-provider';

export const AuthStatus = () => {
	const auth = useAuth();

	if (auth?.user === null) {
		return <p>You are not logged in</p>;
	}

	return <p>Welcome {auth?.user}!</p>;
};
