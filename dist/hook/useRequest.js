"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequest = void 0;
const react_1 = require("react");
const errorMessage_1 = require("../component/errorMessage");
const response_1 = require("../component/response");
const fetchPage_1 = require("../service/fetchPage");
const useRequest = (api, endpoint, search) => {
    const [response, setResponse] = (0, react_1.useState)(response_1.initialPage);
    const [error, setError] = (0, react_1.useState)([errorMessage_1.initialErrorMessage]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const abortControllerRef = (0, react_1.useRef)(null);
    const request = (0, react_1.useCallback)(async () => {
        var _a;
        (_a = abortControllerRef.current) === null || _a === void 0 ? void 0 : _a.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;
        try {
            setLoading(true);
            setError([errorMessage_1.initialErrorMessage]);
            const data = await (0, fetchPage_1.FetchPage)(api, endpoint, search, controller.signal);
            setResponse(data);
        }
        catch (requestError) {
            setError([requestError]);
        }
        finally {
            setLoading(false);
            abortControllerRef.current = null;
        }
    }, [endpoint, search]);
    (0, react_1.useEffect)(() => {
        request();
        return () => { var _a; return (_a = abortControllerRef.current) === null || _a === void 0 ? void 0 : _a.abort(); };
    }, [request]);
    return { response, error, loading, request };
};
exports.useRequest = useRequest;
