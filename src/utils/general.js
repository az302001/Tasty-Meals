
const filterByCategory = (product, filter) => {
    // console.log(filter)
    // console.log(product)


    if (filter.category==="all-categories") {
        console.log(filter)
        return product
    }
    if (filter.category) {
        console.log(filter)
        return product.Category.name === filter.category
    }

}

const filterByPrice = (product, filter) => {
    console.log(filter)
    console.log(product)

    if (filter.price==="all-prices") {
        return product
    }
    if (filter.price) {
        let [min, max] = filter?.price.split("-");
        min = parseInt(min);
        max = parseInt(max);
        return product.price >= min && product.price <= max
    }

}

const filterByDiscount = (product, filter) => {
if (filter.discount==="all-discounts") {
    console.log(filter)
    return product
}
if (filter.discount) {
    console.log(filter)
    return product.discount > 0
}

}

export const filterfoods = (products, filters) => {
    
    return products.filter(e => {
        return filters.filter(f => {
            return filterByCategory(e, f) || filterByPrice (e, f) || filterByDiscount(e, f)
        }).length === filters.length
    })
}