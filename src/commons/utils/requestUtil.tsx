import { useCallback, useState } from "react";
import { SessionStorageKeys } from "../constants";

export async function requestUtil<T>({
    url,
    method = 'GET',
    body,
}: {
    url: string
    method: Request['method']
    body?: any
}) {
    const sessionToken = JSON.parse(sessionStorage.getItem(SessionStorageKeys.SESSION_TOKEN) || '{}')?.token;

    return fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
        method: method,
        body: JSON.stringify({
            ...body,
            token: sessionToken,
        }),
        // headers: {
        //     "Content-type": "application/json",
        // }
    }).then(async resp => {
        if (resp.ok) {
            return [
                await resp.json() as T,
                resp,
            ] as const
        }
    }).catch(err => {
        console.error(err);
    });
}
