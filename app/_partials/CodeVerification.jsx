"use client";
import '@/public/css/verification-code.css';
import Input from '@/app/_forms/Input';
import useUtility from '@/app/_hooks/useUtility';

export default function CodeVerification({verCode,setVerCode}) {
    const {trans} = useUtility();
    const handleCodeInput = (e) => {
        let codeValue = e.target.value;
        if(codeValue.length > 6){
            return;
        }
        setVerCode(codeValue);
    }
    
    return (
        <>
            <div className="mb-3">
                <label className="form-label">{trans('Verification Code')}</label>
                <div className="verification-code">
                    <Input name='code' id='verification-code' value={verCode} onChange={handleCodeInput} />
                    <div className="boxes">
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                        <span>-</span>
                    </div>
                </div>
            </div>
        </>
    )
}
