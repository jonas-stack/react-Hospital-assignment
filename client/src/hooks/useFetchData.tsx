import { useState, useEffect } from "react";
import { apiClient } from "../apiClient.ts";

const useFetchData = <T, >(apiCall: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall();
                setData(response);
            } catch (err) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiCall]);

    return { data, loading, error };
};

export default useFetchData;
