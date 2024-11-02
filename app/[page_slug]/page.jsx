import { getSEO, getTitle } from "@/lib/helpers";
import UseCustomPage from "./_hooks/useCustomPage";
import PageContent from "./_components/PageContent";
import { notFound } from 'next/navigation'

const customPageData = async (slug) => {
    const { getCustomPage } = UseCustomPage();
    const page = await getCustomPage(slug);
    return page;
}


export async function generateMetadata({ params }) {
    const { page_slug } = params;
    const page = await customPageData(page_slug);
    if(page.remark == 'page_not_found'){
        return notFound();
    }
    const seo = await getSEO({
        title: getTitle(page.data.page.name),
        description: page.data.seo_content?.description,
        keywords: page.data.seo_content?.keywords,
        image: page.data.seo_image,
    });
    return seo;
}

export default function CustomPage({params}) {
    const { page_slug } = params;
    return (
        <>
            <PageContent slug={page_slug} />
        </>
    )
}
