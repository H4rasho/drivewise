async function get(path) {
    const res = await fetch(`/api/v1${path}`);
    const json = await res.json();
    if (!json.ok)
        throw new Error(json.error.message);
    return json.data;
}
async function post(path, body) {
    const res = await fetch(`/api/v1${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.ok)
        throw new Error(json.error.message);
    return json.data;
}
export const api = {
    parking: {
        tips: () => get("/parking/tips"),
        tipByType: (type) => get(`/parking/tips/${type}`),
    },
    maintenance: {
        schedule: () => get("/maintenance/schedule"),
    },
    care: {
        checklist: () => get("/care/checklist"),
    },
    signals: {
        list: (category) => get(category ? `/signals?category=${category}` : "/signals"),
        byId: (id) => get(`/signals/${id}`),
    },
    rules: {
        list: () => get("/rules"),
    },
    quiz: {
        generate: (limit = 10) => get(`/quiz/generate?limit=${limit}`),
        submit: (body) => post("/quiz/submit", body),
    },
    progress: {
        get: (deviceId) => get(`/progress/${deviceId}`),
        sync: (body) => post("/progress/sync", body),
    },
};
