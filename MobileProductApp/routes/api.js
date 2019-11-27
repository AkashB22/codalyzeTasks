let router = require('express').Router();
let _data = require('./../lib/data');


router.route('/product/:prodName')
    .get((req, res)=>{
        let prodName = req.params.prodName;
        _data.read(prodName, (err, prodData)=>{
            if(err) res.status(500).json({err});
            else{
                res.status(200).json({data : prodData});   
            }
        });
    })
    .post((req, res)=>{
        let prodName = req.params.prodName;
        let data = {
            "name": req.params.prodName,
            "pricingTier": req.body.pricingTier,
            "priceRange": req.body.priceRange,
            "weight": req.body.weight,
            "availability": req.body.availability,
            "productUrl": req.body.productUrl,
            "isEditable": req.body.isEditable
        };
        _data.create(prodName, data, (err)=>{
            if(err) res.status(500).json({err});
            else{
                res.status(200).json({data : prodName + ' New product has been successfully added'});
            }
        });
    })
    .put((req, res)=>{
        let prodName = req.params.prodName;
        let data = {
            "name": req.params.prodName,
            "pricingTier": req.body.pricingTier,
            "priceRange": req.body.priceRange,
            "weight": req.body.weight,
            "availability": req.body.availability,
            "productUrl": req.body.productUrl,
            "isEditable": req.body.isEditable
        };
        _data.update(prodName, data, (err)=>{
            if(err) res.status(500).json({err});
            else{
                res.status(200).json({data : prodName + ' product has been successfully updated'});
            }
        });
    })
    .delete((req, res)=>{
        let prodName = req.params.prodName;
        _data.delete(prodName, (err)=>{
            if(err) res.status(500).json({err});
            else{
                res.status(200).json({data : prodName + ' product has been successfully delete'});
            }
        });
    });

router.get('/products', (req, res)=>{
    let data = [];
    let filesCheck = 0;
    _data.list((err, files)=>{
        if(err) res.status(500).json({err});
        else{
            files.forEach((file)=>{
                file = file.split('.')[0];
                _data.read(file, (err, fileData)=>{
                    filesCheck++;
                    if(err) res.status(500).json({err});
                    else{
                        data.push(fileData);
                        if(filesCheck === files.length){
                            res.status(200).json({data});
                        }
                    }
                });
            })
        }
    })
})
module.exports = router;