const express=require('express');
const request=require('request-promise');

const app=express();

const PORT=process.env.PORT | 5000;



const generateScraperUrl=(apikey)=>
{
    `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`
}

app.use(express.json());



app.get('/',(req,res)=>{
res.send('weleome to amazon web scraper API');
})

//get product detailes
app.get('/products/:productId',async(req,res)=>{
  const {productId}=req.params;
  const {apikey}=req.query
  try {
    const response=await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.fr/dp/${productId}`);
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
})

//get product reviews
app.get('/products/:productId/reviews',async(req,res)=>{
    const {productId}=req.params;
    const {apikey}=req.query
    try {
      const response=await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.fr/product-reviews/${productId}`);
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  })

  //search product 
app.get('/search/:searchQuery',async(req,res)=>{
    const {searchQuery}=req.params;
    const {apikey}=req.query
    try {
      const response=await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.fr/s?k=${searchQuery}`);
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  })

app.listen(PORT,()=>{
   console.log( `Server is running on port : ${PORT}`);
})