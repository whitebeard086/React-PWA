import { get } from "idb-keyval";
import BaseService from "./BaseService";
import { PERSIST_STORE_NAME } from "constants/app.constant";
import store from "store";

// const ApiService = {
//     fetchData(param) {
//         const state = store.getState();
//         const signedIn = state.auth.session.signedIn;

//         if (signedIn) {
//             get(PERSIST_STORE_NAME)
//                 .then((val) => {
//                     return new Promise((resolve, reject) => {
//                         BaseService(param)
//                             .then((response) => {
//                                 resolve(response);
//                             })
//                             .catch((errors) => {
//                                 reject(errors);
//                             });
//                     });
//                 })
//                 .catch((error) => console.log(error));
//         } else {
//             return new Promise((resolve, reject) => {
//                 BaseService(param)
//                     .then((response) => {
//                         resolve(response);
//                     })
//                     .catch((errors) => {
//                         reject(errors);
//                     });
//             });
//         }
//     },
// };

const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param).then(response => {
                resolve(response)
            }).catch(errors => {
                reject(errors)
            })
        })
    }
}

export default ApiService;
