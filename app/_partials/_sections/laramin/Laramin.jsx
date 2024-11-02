import useUtility from "@/app/_hooks/useUtility";

export const Laramin = () => {
    const { trans } = useUtility();

    return (
        <div className="document-wrapper">
            <div className="row g-0">
                <div className="col-lg-6">
                    <div className="document-item d-flex flex-wrap">
                        <div className="document-item__icon">
                            <i className="lab la-readme"></i>
                        </div>
                        <div className="document-item__content">
                            <h4 className="title"><a href="#0" className="text-underline base-color">{trans('Section Manager')}</a></h4>
                            <p>{trans('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta incidunt quod ipsa neque consequatur aspernatur earum quos est, totam cumque!')}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="document-item d-flex flex-wrap">
                        <div className="document-item__icon">
                            <i className="lab la-readme"></i>
                        </div>
                        <div className="document-item__content">
                            <h4 className="title"><a href="#0" className="text-underline">{trans('Payment Gateway')}</a></h4>
                            <p>{trans('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta incidunt quod ipsa neque consequatur aspernatur earum quos est, totam cumque!')}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="document-item d-flex flex-wrap">
                        <div className="document-item__icon">
                            <i className="lab la-readme"></i>
                        </div>
                        <div className="document-item__content">
                            <h4 className="title"><a href="#0" className="text-underline">{trans('Smart Code')}</a></h4>
                            <p>{trans('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta incidunt quod ipsa neque consequatur aspernatur earum quos est, totam cumque!')}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="document-item d-flex flex-wrap">
                        <div className="document-item__icon">
                            <i className="lab la-readme"></i>
                        </div>
                        <div className="document-item__content">
                            <h4 className="title"><a href="#0" className="text-underline">{trans('Smart UI/UX')}</a></h4>
                            <p>{trans('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta incidunt quod ipsa neque consequatur aspernatur earum quos est, totam cumque!')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}