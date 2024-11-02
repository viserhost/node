import useUtility from "@/app/_hooks/useUtility";


export default function SubmitBtn({isSubmitting,title}) {
    const {trans} = useUtility();
    return (
        <>
            <button type="submit" className="btn btn--base w-100" disabled={isSubmitting}>
                {isSubmitting ? <i className="las la-circle-notch la-spin"></i> : trans(title)}
            </button>
        </>
    )
}
