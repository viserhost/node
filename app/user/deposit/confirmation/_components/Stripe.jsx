import FormField from '@/app/_forms/FormField';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import ENDPOINTS from '@/lib/endpoints';
import { request } from '@/lib/helpers';
import '@/public/js/card.min.js';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Stripe({ data }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        new Card({
            form: '#payment-form',
            container: '.card-wrapper',
            formSelectors: {
                numberInput: 'input[name="cardNumber"]',
                expiryInput: 'input[name="cardExpiry"]',
                cvcInput: 'input[name="cardCVC"]',
                nameInput: 'input[name="name"]'
            }
        });
    }, []);

    const initialValues = {
        'cardNumber': '',
        'cardExpiry': '',
        'cardCVC': '',
        'name': '',
        'is_web': 1,
        'trx': data?.track
    };

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);

        try {
            const { data } = await request.post(ENDPOINTS.IPN.stripe, values);

            if (data?.status == 'success') {
                data?.message?.map(m => toast.success(m));
                localStorage.removeItem('gatewayData');
                localStorage.removeItem('deposit');
                resetForm();
                router.push('/user/deposit/history');
            } else if (data?.status == 'error') {
                data?.message?.map(e => toast.error(e));
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <div className="card custom--card">
                <div className="card-header">
                    <h5>Stripe</h5>
                </div>
                <div className="card-body">
                    <div className="card-wrapper mb-3"></div>

                    <Form className="disableSubmission appPayment" id="payment-form">

                        <div className="row">
                            <div className="col-md-6">
                                <FormField
                                    name="name"
                                    label="Name on Card"
                                    required
                                    inputGroup={true}
                                    inputGroupTextPosition="right"
                                    inputGroupText={<i className="las la-user"></i>}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormField
                                    name="cardNumber"
                                    label="Card Number"
                                    type="text"
                                    required
                                    inputGroup={true}
                                    inputGroupTextPosition="right"
                                    inputGroupText={<i className="las la-credit-card"></i>}
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <FormField
                                    name="cardExpiry"
                                    label="Expiration Date"
                                    type="tel"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <FormField
                                    name="cardCVC"
                                    label="CVC"
                                    type="tel"
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <SubmitBtn isSubmitting={loading} title="Submit" />
                    </Form>
                </div>
            </div>
        </Formik>
    );
}