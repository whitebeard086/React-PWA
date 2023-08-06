import appConfig from "@/configs/app.config";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "@/constants/api.constant";
import { PERSIST_STORE_NAME } from "@/constants/app.constant";
import store from "@/store";
import { onSignOutSuccess } from "@/store/auth/sessionSlice";
import { initialState, setUser } from "@/store/auth/userSlice";
import deepParseJson from "@/utils/deepParseJson";
import axios from "axios";

const unauthorizedCode = [401];

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
    headers: {
        // "Accept": "application/json",
        "Content-Type": "multipart/form-data",
    },
});


BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
        const persistData = deepParseJson(rawPersistData);

        const accessToken = persistData.auth.session.token;

        if (accessToken) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        
        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(onSignOutSuccess());
            store.dispatch(setUser(initialState))
        }

        return Promise.reject(error);
    }
);

axios.defaults.withCredentials = true;

export default BaseService;
