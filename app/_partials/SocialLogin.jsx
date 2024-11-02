'use client'
import Image from "next/image";
import googleImage from '@/public/images/google.svg';
import facebookImage from '@/public/images/facebook.svg';
import linkedinImage from '@/public/images/linkedin.svg';
import useUtility from "@/app/_hooks/useUtility";
import { signIn } from "next-auth/react";

export default function SocialLogin({socialCredentials}) {
    const {trans} = useUtility();

    return (
        <>
            {
                socialCredentials?.google?.status == 1
                    ? <div className="mb-3 continue-google">
                        <button className="btn w-100 social-login-btn" onClick={() => signIn('google')}>
                            <span className="google-icon"><Image src={googleImage} width={18} height={18} alt="google" /></span> {trans('Register with Google')}
                        </button>
                    </div>
                    : ''
            }

            {
                socialCredentials?.facebook?.status == 1
                    ? <div className="mb-3 continue-facebook">
                        <button className="btn w-100 social-login-btn" onClick={() => signIn('facebook')}>
                            <span className="facebook-icon"><Image src={facebookImage} width={18} height={18} alt="facebook" /></span> {trans('Register with Facebook')}
                        </button>
                    </div>
                    : ''
            }

            {
                socialCredentials?.linkedin?.status == 1
                    ? <div className="mb-3 continue-linkedin">
                        <button className="btn w-100 social-login-btn" onClick={() => signIn('linkedin')}>
                            <span className="linkedin-icon"><Image src={linkedinImage} width={18} height={18} alt="linkedin" /></span> {trans('Register with Linkedin')}
                        </button>
                    </div>
                    : ''
            }
        </>
    )
}
