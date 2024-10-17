import { ClothesData } from "../../../slices/types";


const ProductDescription = (props: {product: ClothesData}) => {
    const {product} = props;


    return (
        <div className="b-product_desc">
            <h2 className="b-product_desc-title">Product Description</h2>
            <div className="b-product_desc-wrap">
                <div className="b-product_desc-item">
                    <p className="b-product_desc-text">{product.description}</p>
                    <div className="b-product_desc-add">
                        {Object.entries(product.additional).map(([key, value]) => (
                            <div className="b-product_additional-item" key={key}>
                                <span className="b-product_additional-key">{key}</span>
                                <span className="b-product_additional-value">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {product.video && (
                    <div className="b-product_desc-video"></div>
                )}
            </div>
        </div>
    )
}

export default ProductDescription;