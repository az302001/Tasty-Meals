import { getUserData } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';


export const PageProtection = (WrappedComponent) => {
    const PageProtectionWrapper = (props) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;

        const dispatch = useDispatch(); 

        if (!token) {
            return (
                <div>
                    <p>Cargando...</p>
                </div>
            );
        }

        if (token) {
            dispatch(getUserData(token));
        }

        return <WrappedComponent {...props} />;
    };

    PageProtectionWrapper.displayName = `PageProtection(${getDisplayName(
        WrappedComponent
    )})`;

    return PageProtectionWrapper;
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}