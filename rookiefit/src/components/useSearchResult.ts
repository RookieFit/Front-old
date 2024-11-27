import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UseSearchResultsOptions<T> {
    items: T[];
    filterFn: (item: T, searchTerm: string, category: string) => boolean;
}

export const useSearchResults = <T>({
    items,
    filterFn,
}: UseSearchResultsOptions<T>) => {
    const location = useLocation();
    const [filteredItems, setFilteredItems] = useState<T[]>(items);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('전체');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTermFromUrl = searchParams.get('search') || '';
        const categoryFromUrl = searchParams.get('category') || '전체';

        setSearchTerm(searchTermFromUrl);
        setCategory(categoryFromUrl);

        setLoading(true);
        try {
            const filtered = items.filter((item) =>
                filterFn(item, searchTermFromUrl, categoryFromUrl)
            );
            setFilteredItems(filtered);
        } catch (error) {
            console.error('Error during search:', error);
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, [location.search, items, filterFn]);

    return { filteredItems, loading, error, searchTerm, category };
};
