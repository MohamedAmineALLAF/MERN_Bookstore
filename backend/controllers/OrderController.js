
const stripe = require('stripe')('sk_test_51MbqChKLf3MTi9NR41Ya4IhfxFneVOhn8r9h4dEccuYLIrn6RlHAsHu1Yzxj9x6AbZnYuP9vmUIIwVCgEjOp3oO700ESgy5oAc');


exports.payBook = async(req, res) => {

    try {
        console.log('called');
        const  products  =JSON.stringify(req.body.products);
        const uid = req.body.userId;
        const line_items = req.body.products.map((item)=>{
          return {
              price_data: {
                  currency: "USD",
                  
                  product_data: {
                    name: item.title,
                    images:[item.img],
                    metadata:{
                      id: item.id
                    },
                  },
                  unit_amount: item.price * 100,
                },
                quantity: item.quantity
          }
          
        });

        console.log(uid);

        console.log(products);

       



       

        const session = await stripe.checkout.sessions.create({
          shipping_address_collection: {allowed_countries: ['MA']},
            shipping_options: [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 0, currency: 'usd'},
                  display_name: 'Free shipping',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 5},
                    maximum: {unit: 'business_day', value: 7},
                  },
                },
              },
            ],
          payment_method_types: ["card"],
          mode: "payment",
          invoice_creation: {enabled: true},

          line_items,
          success_url: `http://localhost:3000/success`,
          cancel_url: `http://localhost:000/cancel`,
        })

        res.json({ url: session.url })


    if(session){
        /*req.body.transactionId = session.id;
        const newbooking = new Booking (req.body);
        await newbooking.save();
        const car = await Car.findOne({_id: req.body.car});
        console.log(req.body.car[0].name);
        car.bookedTimeSlots.push(req.body.bookedTimeSlots);
        await car.save();*/
        
    }else{
        res.status(400).json(error);
        console.log(error);
    }

    } catch (error) {
   
    console.log(error);
    }
}