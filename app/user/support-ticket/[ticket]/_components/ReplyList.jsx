'use client';

import { useSelector } from "react-redux";
import { showDateTime } from "@/lib/helpers";
import useUtility from "@/app/_hooks/useUtility";
import Skeleton from "react-loading-skeleton";

export const ReplyList = ({ loading = false, replies = [], downloadFile }) => {
    const { data: userData } = useSelector(state => state?.user);
    const { trans } = useUtility();

    if (loading) return (
        <div>
            <Skeleton
                direction="ltr"
                duration={0.6}
                height={90}
                borderRadius={10}
                count={3}
            />
        </div>
    );
    return (
        <>
            {replies.map((reply) => (
                <div key={reply.id} className={`row border ${reply.admin ? 'border-warning reply-bg' : 'border-primary'} border-radius-3 my-3 py-3 mx-2`}>
                    <div className="col-md-3 border-end text-end">
                        <h5 className="my-3">{reply.userName}</h5>
                        {reply.admin ? <h3 className="lead text-muted">Staff</h3> : <h3>{userData?.firstname + ' ' + userData?.lastname}</h3>}
                    </div>
                    <div className="col-md-9">
                        <p className="text-muted fw-bold my-3">
                            Posted on {showDateTime(reply?.created_at)}
                        </p>
                        <p>{reply.message}</p>
                        {reply.attachments.length > 0 && (
                            <div className="mt-2">
                                {reply.attachments.map((attachment) => (
                                    <a key={attachment.id} href="#" className="me-3" onClick={() => downloadFile(attachment.encrypted_id)}>
                                        <i className="las la-file-alt"></i> {trans('attachment')}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}