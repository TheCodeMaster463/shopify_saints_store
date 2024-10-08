"use server"

export async function getProducts(query, variables = {})  {
    const response = await fetch(
        'https://shpoify-store-demo.myshopify.com/api/2024-10/graphql.json',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Acsess-Token": 'caa921d6f766a1dd3472724e5a93e6b5'
            },
            body: JSON.stringify({query, variables})
        }
    )
    return response.json()
}