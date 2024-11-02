import Link from "next/link";
import usePolicyPages from "@/app/_partials/_hooks/usePolicyPages";
import Input from "@/app/_forms/Input";
import useUtility from "@/app/_hooks/useUtility";
export default function AgreePolicy() {
    const {policyPages} = usePolicyPages();
    const {trans} = useUtility();
    return (
        <>
            <div className="form-group">
                <Input name={'agree'} type='checkbox' className="me-2" id="agree" required />
                <label htmlFor="agree">{trans('I agree with')}</label> <span>
                    {policyPages?.data?.policies?.map((policy, index) => (
                        <span key={index}>
                            <Link href={`/policy/${policy.slug}`}>{trans(policy.data_values.title)}</Link>
                            {index < policyPages?.data?.policies?.length - 1 && ', '}
                        </span>
                    ))}
                </span>
            </div>
        </>
    )
}
