import useUtility from "@/app/_hooks/useUtility";
import { showDateTime } from "@/lib/helpers";
import { EmptyResource } from "./EmptyResource";
import Skeleton from 'react-loading-skeleton'

export const TableBody = ({ loading, columns, data }) => {
    const { showAmount } = useUtility();

    const loadingContent = (
        <tbody>
            <tr>
                <td colSpan={columns.length}>
                    <Skeleton
                        borderRadius={5}
                        direction="ltr"
                        duration={0.6}
                        height={40} 
                        count={10} 
                    />
                </td>
            </tr>
        </tbody>
    );

    if(data?.length === 0) return <EmptyResource columns={columns} />;

    if (loading || !data) return loadingContent;

    const renderContent = (column, item) => (
        column?.format == 'date' ? showDateTime(item[column.key]) :
            column?.format == 'amount' ? showAmount(item[column.key]) :
                item[column.key]
    );
    return (
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {columns.map((column, columnIndex) => {
                        const className = columnIndex === 0 ? 'text-start' : columnIndex === columns.length - 1 ? 'text-end' : 'text-center';
                        return <td key={columnIndex} className={className}>{column.render ? column.render(item) : renderContent(column, item)}</td>;
                    })}
                </tr>
            ))}
        </tbody>
    );
};
