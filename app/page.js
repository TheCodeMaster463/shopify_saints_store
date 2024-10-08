"use client";

// Server Action for fetching product data
async function getProducts(query, variables = {}) {
  const response = await fetch(
    'https://shpoify-store-demo.myshopify.com/api/2024-10/graphql.json',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": 'caa921d6f766a1dd3472724e5a93e6b5'
      },
      body: JSON.stringify({ query, variables })
    }
  );
  const data = await response.json();
  return data.data.products.edges;
}

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import shirt from "./images/shirt.jpeg";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const results = await getProducts(ProductsQuery);
      setProducts(results);
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="p-3">
        <Card>
          <CardContent>
            <Separator orientation="vertical" className="h-6" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {products.map(({ node }) => (
          <Card className="max-w-xs" key={node.handle}>
            <CardHeader>
              <Image src={node.media.edges[0]?.node.image.url || shirt} alt={node.title} className="w-full h-auto rounded-sm" width={300} height={550} />
            </CardHeader>
            <CardContent className="flex justify-between items-start pt-4">
              <div className="flex">
                <div>
                  <h3 className="text-lg font-semibold m-0">{node.title}</h3>
                  <p className="text-sm text-muted m-0 text-black">Cost: ${node.priceRange.minVariantPrice.amount}</p>
                </div>
                <div className="ml-10">
                  <Button className=''>Add to Cart</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const ProductsQuery = `
query Products {
  products(first: 5) {
    edges {
      node {
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
        }
        media(first: 1) {
          edges {
            node {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
