import * as types from "./types";

export const fetchPost = () => {
    return {
        types: types.FETCH_POSTS,
        payload: []
    }
}