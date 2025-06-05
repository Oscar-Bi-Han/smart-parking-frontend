import { AuthUserProvider } from './AuthUserContext';

export const CentralProvider = ({ children }) => {
    return (
        <AuthUserProvider>
            {children}
        </AuthUserProvider>
    );
};