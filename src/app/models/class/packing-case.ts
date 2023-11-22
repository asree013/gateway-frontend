export class PackingCase {
    id: number;
    pc_sku: string;
    names: string;
    counts: number;
    images: string;
    create_at: Date;
    update_at: Date;
}

export class PackingCaseDetail {
    id: number;
    product_id: number;
    pc_id: number;
    count_product_pack: number;
    count_product_item: number;
    create_at: Date;
    update_at: Date;
}

export class DetailPacking {
    id: number;
    pc_sku: string;
    names: string;
    counts: number;
    images: string;   
}

export class PackingCaseCreate {
    pa_sku: string;
    names: string;
    counts: number;
    images: string;
}