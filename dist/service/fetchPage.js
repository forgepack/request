"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchPage = void 0;
const FetchPage = async (api, endpoint, search, signal) => {
    var _a, _b, _c;
    const uri = ((_a = search === null || search === void 0 ? void 0 : search.value) === null || _a === void 0 ? void 0 : _a.trim())
        ? `/${endpoint}?value=${encodeURIComponent(search.value)}`
        : `/${endpoint}`;
    const params = {
        page: search === null || search === void 0 ? void 0 : search.page,
        size: search === null || search === void 0 ? void 0 : search.size
    };
    if (((_b = search === null || search === void 0 ? void 0 : search.sort) === null || _b === void 0 ? void 0 : _b.order) && ((_c = search === null || search === void 0 ? void 0 : search.sort) === null || _c === void 0 ? void 0 : _c.key)) {
        params.sort = `${search.sort.key},${search.sort.order}`;
    }
    const { data } = await api.get(uri, {
        params: Object.keys(params).length > 0 ? params : undefined,
        signal
    });
    return data;
};
exports.FetchPage = FetchPage;
