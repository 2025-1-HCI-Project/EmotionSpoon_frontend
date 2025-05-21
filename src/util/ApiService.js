import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

const ApiService = {
    //🔐회원가입 Api
    signUp: async (data) => {
        return apiInstance.post('/api/member/signup', data);
    },

    //🔐로그인 Api
    login: async (data) => {
        return apiInstance.post('/api/member/login', data);
    },

    // 📔일기 업로드 Api
    diarySave: (file, diaryDTO) => {
        const formData = new FormData();
        formData.append("dto", new Blob([JSON.stringify(diaryDTO)], { type: "application/json" }));
        if (file) {
            formData.append("file", file);
        }
        return axios.post(`${BASE_URL}/api/diary/save`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
    },

    //📈 분석 Api
    analyzeDiary: (diaryId) => {
        return axios.post(`${BASE_URL}/api/diary/analyze`, { id: diaryId }, {
            withCredentials: true,
        });
    },

    //🎶 플레이 리스트 Api
    getPlaylistByDiaryId: (diaryId) => {
        return axios.get(`${BASE_URL}/api/playlist/${diaryId}`, {
            withCredentials: true,
        });
    },
    //📅 캘린더 Api
    getAllCalendarEvents: () => {
        return apiInstance.get('/api/diary/events');
    }
};

export default ApiService;
