import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { ACCESS_TOKEN_NAME } from "../config";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MOCK_API_BASE,
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem(ACCESS_TOKEN_NAME);
        if(token)
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
    }
});

const baseQueryWithAuth = (args, api) => {
    const result = baseQuery(args,api);

    if(result.error && result.error.status !== '401'){
        // redirection to signout
    }else{
        // rejection error
    }
}

const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithAuth,
    entityTypes:['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ()=>'/api/users',
            provides:['Users']
        }),
        addUser: builder.mutation({
            query: ({username, password})=>({
                url: '/api/users',
                method: 'POST',
                body:{
                    username,
                    password
                }
            }),
            invalidates: ['Users']
        }),
        updateUser: builder.mutation({
            query: ({user, user_id})=>({
                url: `/api/users/${user_id}`,
                method: 'PUT',
                body:{
                  user  
                },
            }),
            invalidates: ['Users']
        })
    })
});

export default userAPI;