import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/constant';

export const appApis = createApi({
    reducerPath: 'appApis',

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),

    endpoints: builder => ({
        //products api
        getProducts: builder.query({
            query: () => '/products',
        }),

        getCategories: builder.query({
            query: () => '/products/categories',
        }),

        getProductById: builder.query({
            query: id => `/products/${id}`,
        }),

        //cart api
        getAllCarts: builder.query({
            query: () => "/carts",
        }),
        addToCart: builder.mutation({
            query: (body) => ({
                url: "/carts",
                method: "POST",
                body: body
            })

        }),
        updateCart: builder.mutation({
            query: ({ id, body }) => ({
                url: `/carts/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteCart: builder.mutation({
            query: (id) => ({
                url: `/carts/${id}`,
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    //product
    useGetProductsQuery, useGetProductByIdQuery,
    //cart
    useGetAllCartsQuery, useAddToCartMutation, useUpdateCartMutation, useDeleteCartMutation
} = appApis;