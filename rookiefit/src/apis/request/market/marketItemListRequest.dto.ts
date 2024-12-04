export interface Product {
    productPrice: number;
    location: string;
    productDescription: string;
    shippingMethod: string;
    productCondition: string;
    saleStatus: string;
}

export interface MarketItemListRequestDto {
    token: string;
    marketItemTitle: string;
    marketItemImageUrl: string;
    createdAt: string;
    product: Product; // product 객체를 포함
}

export interface MarketItemUpdateRequestDto {
    token: string;
    marketItemTitle: string;
    marketItemImageUrl: string;
    updatedAt: string; // 업데이트 시에만 필요
    product: Product;
}
