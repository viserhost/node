import 'bootstrap/dist/css/bootstrap.min.css';
import '@/public/css/global.css';
import '@/public/css/line-awesome.min.css';
import Wrapper from './Wrapper';
import { getSEO } from '@/lib/helpers'; 

export async function generateMetadata() {
    const globalSEO = await getSEO();
    return globalSEO;
}

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Wrapper>
                    {children}
                </Wrapper>
            </body>
        </html>
    );
}
