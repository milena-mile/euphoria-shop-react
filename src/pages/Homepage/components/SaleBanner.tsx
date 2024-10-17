import info from '../../../../public/data.json';
import { Link } from 'react-router-dom';

const SaleBanner = (props: {name: string}) => {
    const data = info["sale-banner"];

    return (
        <>
            {Object.entries(data).map(([key, value]) => {
                if (key === props.name) {
                    return (
                        <Link to={value.link} className="b-sale_item" key={key}>
                            <div className="b-sale_item-info">
                                <span className="b-sale_item-desc">{value.description}</span>
                                <h3 className="b-sale_item-title">{value.title}</h3>
                                <span className="b-sale_item-sale">{value.sale}</span>
                                <span className="b-sale_item-link">Explore Item</span>
                            </div>
                            <img src={`images/${value.image}`} className="b-sale_item-image" alt={value.title} loading="lazy"/>
                        </Link>
                     )
                }
            })}
        </>
    )
}

export default SaleBanner;