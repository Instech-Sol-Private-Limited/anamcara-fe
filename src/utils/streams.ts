import apiClient from "./apiClient";

export const getActiveStreams = async (): Promise<any> => {
    try {
        const response = await apiClient.get(`/streams`);
        return {
            success: true,
            // @ts-ignore
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            // @ts-ignore
            message: error.response?.data.message || error.response?.data.error
        };
    }
};
