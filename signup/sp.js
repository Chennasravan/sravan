const express=require("express");
const bodyParser=require("body-parser");
const http=require("https"); 
 const request=require("request");

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/",function(req,res){
    const fname=req.body.firstname;
    const lname=req.body.lastname;
    const ml=req.body.mail;
    const data={
        members:[
            {
                email_address:ml,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }

            }
        ]
    };
    const jsondata=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/5b6cb7d3b8";
    const option={
        method: 'POST',
        auth:"sravan:603fc477948a86987f3870324efae64a-us14"
    }
    const request=http.request(url,option,function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
           
        }
        else
        {
                res.sendFile(__dirname+"/failure.html");
        }
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsondata);
    request.end();
    
});
app.post("/failure", function(req, res){
    res.redirect("/");
});
// 603fc477948a86987f3870324efae64a-us14
// auidence_id 5b6cb7d3b8 
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signp.html");
});
app.listen(300, function(req, res) {
    console.log("signup form is running");
});