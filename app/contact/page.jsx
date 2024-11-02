import ContactForm from "./_components/ContactForm";
import { getMetaTitle } from "@/lib/helpers";
import ContactFormWrapper from "./_components/ContactFormWrapper";

export const metadata = getMetaTitle('Contact');

export default function Contact() {
    return (
        <>
            <ContactFormWrapper>
                <ContactForm />
            </ContactFormWrapper>

        </>
    )
}
