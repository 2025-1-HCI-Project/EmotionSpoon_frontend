import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

const ApiService = {
    diaryUpload: async (file, diaryDTO) => {
        const formData = new FormData();

        formData.append("dto", new Blob(
            [JSON.stringify(diaryDTO)],
            { type: "application/json" }
        ));

        if (file) {
            formData.append("file", file);
        }

        return axios.post(`${BASE_URL}/api/diary/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });
    }
};

export default ApiService;
