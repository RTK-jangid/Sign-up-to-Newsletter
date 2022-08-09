const express=require("express");
const parser=require("body-parser");
const app=express();
const request=require("request");
const https=require("https");
app.use(parser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");
    
});
app.post("/",function(req,res){
    var first=req.body.fname;
    var last=req.body.lname;
    var email=req.body.e;
    
    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:first,
                LNAME:last
            }

        }]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/71032fc090";
    const options={
        method:"POST",
        auth:"Ritik1:a8ea6ed903d6da1b4a4db10d74e914e9-us8"
    }
    const good=https.request(url,options,function (response) {
        if (response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function (data) {
            console.log(JSON.parse(data));
        });
    });
    good.write(jsonData);
    good.end();
});
app.post("/failure",function (req,res) {
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function () {
    console.log("Server has Started!!");
});


// a8ea6ed903d6da1b4a4db10d74e914e9-us8
//Audience id
//71032fc090