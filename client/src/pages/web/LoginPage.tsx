import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { LoginBtn } from '../../components/Components.tsx'
import { Google } from '../../components/Icons.tsx'
import { useAuth } from '../../context/AuthContext.tsx'

export default function LoginPage(){
    const navigate = useNavigate();
    const { loginWithGoogle, loginAsAnonymous } = useAuth();

    const onSuccess = async (credentialResponse: any) => {
        if (credentialResponse.credential) {
            try {
                await loginWithGoogle(credentialResponse.credential);
                navigate('/select');
            } catch (error) {
                console.error('Login failed', error);
            }
        }
    }

    const onFailure = () => {
        console.log('Google login failed')
    }

    const handleAnonymous = () => {
        loginAsAnonymous();
        navigate('/select');
    }

    return( <div className="flex flex-col items-center gap-10">
                <p className="text-5xl font-bold text-center p-20">Explore your <br/> cat partner</p>
                <div className="flex flex-col">
                    <p className="pb-2">For the best experience (Highly recommend!)</p>
                    <div className="relative w-[320px] h-11">
                        <div className="pointer-events-none">
                            <LoginBtn msg="Sign in with Google" icon={<Google size="22" />} onClick={() => {}} />
                        </div>
                        <div className="absolute inset-0 overflow-hidden opacity-0">
                            <GoogleLogin
                                onSuccess={onSuccess}
                                onError={onFailure}
                                width={320}
                                size="large" />
                        </div>
                    </div>
                    <div className="flex items-center my-4">
                        <div className="grow border-t border-(--text-topic)"></div>
                        <span className="shrink mx-2 text-(--text-topic) text-sm">or</span>
                        <div className="grow border-t border-(--text-topic)"></div>
                    </div>
                    <LoginBtn msg="Continue as anonymous" 
                        onClick={handleAnonymous} />
                </div>
            </div>
    );
}