"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAll = exports.removeComposite = exports.remove = exports.update = exports.retrieve = exports.createAll = exports.create = exports.changePassword = exports.logout = exports.reset = exports.login = void 0;
const token_1 = require("./token");
// Respostas de informação (100-199),
// Respostas de sucesso (200-299),
// Redirecionamentos (300-399)
// Erros do cliente (400-499)
// Erros do servidor (500-599).
const addError = (error) => {
    var _a, _b;
    let errorMessage = [];
    if (error.response.data.validationErrors !== undefined) {
        (_b = (_a = error.response.data) === null || _a === void 0 ? void 0 : _a.validationErrors) === null || _b === void 0 ? void 0 : _b.forEach((element) => {
            errorMessage.push({ field: element.field, message: element.message });
        });
    }
    else {
        errorMessage.push({ field: 'Error', message: 'Internal Error' });
    }
    return errorMessage;
};
const login = async (api, url, object) => {
    return await api.post(url, object)
        .then(response => {
        (0, token_1.setToken)(response.data);
        return response.data;
    })
        .catch(error => { return addError(error); });
};
exports.login = login;
const reset = async (api, url, object) => {
    return await api.put(url, object)
        .then(response => {
        (0, token_1.setToken)(response.data);
        return response.data;
    })
        .catch(error => { return addError(error); });
};
exports.reset = reset;
const logout = () => {
    (0, token_1.removeToken)();
};
exports.logout = logout;
const changePassword = async (api, data) => {
    return await api.put(`/user/changePassword`, data)
        .then(response => {
        return response.data;
    })
        .catch(error => {
        return addError(error);
    });
};
exports.changePassword = changePassword;
const create = async (api, url, object) => {
    return await api.post(`/${url}`, object)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.create = create;
const createAll = async (api, url, object) => {
    return await api.post(`/${url}/createAll`, object)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.createAll = createAll;
const retrieve = async (api, url, search, signal) => {
    var _a, _b, _c;
    if ((search === null || search === void 0 ? void 0 : search.page) === undefined && (search === null || search === void 0 ? void 0 : search.size) === undefined) {
        return await api.get(`/${url}`)
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
    else if (((_a = search === null || search === void 0 ? void 0 : search.sort) === null || _a === void 0 ? void 0 : _a.order) === undefined) {
        return await api.get(`/${url}?value=${search === null || search === void 0 ? void 0 : search.value}`, { params: { page: search === null || search === void 0 ? void 0 : search.page, size: search === null || search === void 0 ? void 0 : search.size }, signal })
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
    else {
        return await api.get(`/${url}?value=${search === null || search === void 0 ? void 0 : search.value}`, { params: { page: search === null || search === void 0 ? void 0 : search.page, size: search === null || search === void 0 ? void 0 : search.size, sort: `${(_b = search === null || search === void 0 ? void 0 : search.sort) === null || _b === void 0 ? void 0 : _b.key},${(_c = search === null || search === void 0 ? void 0 : search.sort) === null || _c === void 0 ? void 0 : _c.order}` }, signal })
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
};
exports.retrieve = retrieve;
const update = async (api, url, object) => {
    return await api.put(`/${url}`, object)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.update = update;
const remove = async (api, url, id) => {
    return await api.delete(`/${url}/${id}`)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.remove = remove;
const removeComposite = async (api, url, object, one, two, three, four) => {
    if (three !== '' && four !== '') {
        return await api.delete(`/${url}`, object)
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
    else {
        return await api.delete(`/${url}/${one}/${two}`, object)
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
};
exports.removeComposite = removeComposite;
const removeAll = async (api, url) => {
    return await api.delete(`/${url}`)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.removeAll = removeAll;
