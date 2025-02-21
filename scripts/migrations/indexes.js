db.stocks.createIndex({
    key: 1
})

db.deliveryproposals.createIndex({
    key: 1
})

db.deliveryproposals.createIndex({
    esEcommerce: 1,
    grupoLocalizacionDesc: 1,
}, {
    partialFilterExpression: { 
        grupoLocalizacionDesc: { $in: ['CICLO 2 GRUPO A2', 'CICLO 1 GRUPO B', 'CICLO 1 GRUPO A2'] },
        esEcommerce: 1,
    }
})