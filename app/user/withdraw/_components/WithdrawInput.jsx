import Input from "@/app/_forms/Input";
import useUtility from "@/app/_hooks/useUtility";

export default function WithdrawInput({ putAmount, amount }) {
    const {trans,gs} = useUtility();
    return (
        <>
            <div className="deposit-info">
                <div className="deposit-info__title">
                    <p className="text mb-0">{trans('Amount')}</p>
                </div>
                <div className="deposit-info__input">
                    <div className="deposit-info__input-group input-group">
                        <span className="deposit-info__input-group-text">{gs('cur_sym')}</span>
                        <Input name='amount' className="form-control form--control amount" value={amount} placeholder='00.00' onChange={putAmount} required />
                    </div>
                </div>
            </div>
        </>
    )
}
