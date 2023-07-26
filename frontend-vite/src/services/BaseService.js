import axios from "axios";
// import appConfig from "configs/app.config";
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from "@/constants/api.constant";
import deepParseJson from "@/utils/deepParseJson";
import store from "../store";
import { onSignOutSuccess } from "../store/auth/sessionSlice";
import { get } from "idb-keyval";
import { initialState, setUser } from "@/store/auth/userSlice";
import appConfig from "@/configs/app.config";
import { PERSIST_STORE_NAME } from "@/constants/app.constant";

const unauthorizedCode = [401];

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
    headers: {
        // "Accept": "application/json",
        "Content-Type": "multipart/form-data",
    },
});

get(PERSIST_STORE_NAME).then((val) => {
    BaseService.interceptors.request.use(
        (config) => {
            const persistData = deepParseJson(val);

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
}).catch((error) => console.log(error));

// BaseService.interceptors.request.use(
//     (config) => {
//         const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
//         const persistData = deepParseJson(rawPersistData);

//         const accessToken = persistData.auth.session.token;

//         if (accessToken) {
//             config.headers[
//                 REQUEST_HEADER_AUTH_KEY
//             ] = `${TOKEN_TYPE}${accessToken}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// BaseService.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const { response } = error;
        
//         if (response && unauthorizedCode.includes(response.status)) {
//             store.dispatch(onSignOutSuccess());
//             store.dispatch(setUser(initialState))
//         }

//         return Promise.reject(error);
//     }
// );

axios.defaults.withCredentials = true;

export default BaseService;
