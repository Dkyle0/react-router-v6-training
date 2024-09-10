import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth-provider/auth-provider';
import { ReactNode } from 'react';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();
	const location = useLocation();

	if (auth?.user === null) {
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}

	return <>{children}</>;
};
