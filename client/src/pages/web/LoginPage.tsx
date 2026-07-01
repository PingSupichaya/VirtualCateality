import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { LoginBtn } from '../../components/Components.tsx'
import { useAuth } from '../../context/AuthContext.tsx'

export default function LoginPage(){
    const navigate = useNavigate();
    const { loginWithGoogle } = useAuth();

    const onSuccess = (credentialResponse: any) => {
        if (credentialResponse.credential) {
            loginWithGoogle(credentialResponse.credential);
            navigate('/select');
        }
    }

    const onFailure = () => {
        console.log('Google login failed')
    }

    return( <div className="flex flex-col items-center gap-6">
                <p className="text-3xl font-bold text-center p-15">Explore your <br/> cat partner</p>
                <div className="flex flex-col">
                    <p>For the best experience (Highly recommend!)</p>
                    <GoogleLogin
                        onSuccess={onSuccess}
                        onError={onFailure} />
                    <div className="flex items-center my-4">
                        <div className="grow border-t border-(--text-topic)"></div>
                        <span className="shrink mx-2 text-(--text-topic) text-sm">or</span>
                        <div className="grow border-t border-(--text-topic)"></div>
                    </div>
                    <LoginBtn msg="Continue as anonymous" 
                        onClick={() => navigate(`/select`)} />
                </div>
            </div>
    );
}