export interface Product {
    productPrice: number; // BigDecimal은 실제로 JavaScript에서는 number로 다룰 수 있습니다.
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
