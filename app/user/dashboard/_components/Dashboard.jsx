"use client";
import { getUser } from "@/lib/helpers";
import PushNotificationComponent from "@/app/_partials/PushNotification";
import Link from "next/link";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Dashboard() {
    const user = getUser();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <PushNotificationComponent />
            <div className="col-md-8">
                {user.kv == 0 && user.kyc_rejection_reason && (
                    <div className="alert alert-danger" role="alert">
                        <div className="d-flex justify-content-between">
                            <h4 className="alert-heading">KYC Documents Rejected</h4>
                            <button className="btn btn-outline-secondary btn-sm" onClick={handleShow}>Show Reason</button>
                        </div>
                        <hr />
                        <p className="mb-0">Your KYC documents have been rejected. Please <Link href={'/user/kyc-verification'}>re-submit kyc documents</Link>.</p>
                        <br />
                        <Link href={'/user/kyc-verification/data'}>See KYC Data</Link>
                    </div>
                )}
                {user.kv == 0 && !user.kyc_rejection_reason && (
                    <div className="alert alert-info" role="alert">
                        <h4 className="alert-heading">KYC Verification required</h4>
                        <hr />
                        <p className="mb-0">KYC verification is required. Please <Link href={'/user/kyc-verification'}>submit documents</Link>.</p>
                    </div>
                )}
                {user.kv === 2 && (
                    <div className="alert alert-warning" role="alert">
                        <h4 className="alert-heading">KYC Verification pending</h4>
                        <hr />
                        <p className="mb-0">KYC verification is pending. Please <Link href={'/user/kyc-verification/data'}>see KYC data</Link>.</p>
                    </div>
                )}
                <div className="card custom--card">
                    <div className="card-header">
                        <h5 className="card-title">Dashboard</h5>
                    </div>
                    <div className="card-body">
                        <h1 className="text-center">Hi! {user?.firstname + ' ' + user?.lastname}</h1>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>KYC Rejection Reason</Modal.Title>
                </Modal.Header>
                <Modal.Body>{user.kyc_rejection_reason}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
