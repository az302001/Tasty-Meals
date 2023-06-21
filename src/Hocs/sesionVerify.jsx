import Layaout from '@/components/Layaout/Layaout';
import { getUserData } from '@/redux/actions';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';


export const PageProtection = (WrappedComponent) => {
    const PageProtectionWrapper = (props) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;
        const router = useRouter();

        const dispatch = useDispatch(); 

        if (token !=="null") {
            dispatch(getUserData(token));
        } 
        // else {
        //     router.replace('/menu');
        //     return (
        //         <Layaout>
        //         <div className="text-center mt-[20%]">
        //           <p className="text-3xl text-color1 font-bold">No existe esta pagina.</p>
        //         </div>
        //       </Layaout>
        //     );
        // }

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