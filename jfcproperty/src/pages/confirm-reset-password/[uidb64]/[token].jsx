import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import Seo from "../../../components/common/seo";
import ConfirmResetPassword from '../../../components/confirm-reset-password'

const index = () => {
    const router = useRouter();
    const { uidb64, token } = router.query;
    console.log(uidb64)
    console.log(token)
    return (
        <>
        <Seo pageTitle="Confirm Reset Password" />
        <ConfirmResetPassword uidb64={uidb64} token={token} />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });